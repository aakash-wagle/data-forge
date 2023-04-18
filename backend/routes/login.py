from fastapi import APIRouter
from models.userModel import User, UserLogin
from config.db import users
import os 
import json

from typing import Optional
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import jwt
from passlib.hash import bcrypt

userlogin = APIRouter()

# Define a function to create a JWT token for a user
def create_jwt_token(user_id: str) -> str:
    payload = {
        "user_id": str(user_id),
        "exp": datetime.utcnow() + timedelta(minutes=30)
    }
    token = jwt.encode(payload, os.environ['SECRET_KEY'], algorithm="HS256")
    return token

# Define a function to get a Pydantic model for a user from the database
def get_user_by_email(email: str) -> Optional[User]:
    user_data = users.find_one({"email": email})
    if user_data:
        user = User(**user_data)
        return user
    return None

# Define a route for user registration
@userlogin.post("/register")
async def register(user_data: User):
    # Check if the email is already in use
    if users.find_one({"email": user_data.email}):
        return JSONResponse(content={"message": "Email is already in use"}, status_code=400)

    # Hash the password
    hashed_password = bcrypt.hash(user_data.password)

    # If a profile picture was included, save it to disk and get the file path
    profile_picture_path = None
    if user_data.profileImage:
        file_extension = user_data.profileImage.filename.split('.')[-1]
        file_name = f"{user_data.username}_profileImage.{file_extension}"
        with open(file_name, 'wb') as f:
            f.write(await user_data.profileImage.read())
        profile_picture_path = file_name

    # Insert the new user into the database
    user_id = users.insert_one({
        "username": user_data.username,
        "email": user_data.email,
        "password": hashed_password,
        "profileImage": profile_picture_path
    }).inserted_id

    # Create a JWT token for the user
    token = create_jwt_token(user_id)

    userObj = {
        "id":str(user_id),
        "username": user_data.username,
        "email": user_data.email,
        "profileImage": profile_picture_path
    }

    return {"message": "User registered successfully", "token": token,"user":userObj}

    # Define a route for user login
@userlogin.post("/login")
async def login(user_data: UserLogin):
    # Get the user from the database by email
    user = get_user_by_email(user_data.email)

    # Check if the user exists and the password is correct
    if user and bcrypt.verify(user_data.password, user.password):
        # Create a JWT token for the user
        token = create_jwt_token(user.id)
        # user = json.dumps(user)
        # user = jsonable_encoder(user)
        userObj = {
            "id": str(user.id),
            "username": user.username,
            "email": user.email,
            "profileImage":user.profileImage
        }
        # userObj = json.dumps(userObj)
        # userObj = json.loads(str(userObj))

        return JSONResponse(content={"message": "Logged in successfully", "token": token, "user": userObj},status_code=200)

    return JSONResponse(content={"message": "Invalid email or password"}, status_code=401)