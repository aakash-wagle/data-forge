from fastapi import FastAPI, File, UploadFile
from fastapi import APIRouter
from models.fileModel import FileModel
from bson import ObjectId
import pandas as pd
from config.db import db,users
import json

file = APIRouter()

@file.post("/upload-csv/{user_id}")
async def upload_csv(user_id, file: UploadFile = File(...)):
    # Verify the user exists in the database
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}

    # Read the CSV file using pandas
    try:
        df = pd.read_csv(file.file,encoding='ISO-8859-1')    
        
    except Exception as e:
        try:
            df = pd.read_csv(file.file,encoding='utf-8')
            
        except Exception as e:
            try:
                df = pd.read_csv(file.file,encoding='cp1252')
            except Exception as e:
                return {"message": "Error reading the CSV file", "error": str(e)}
            


    #deleting the previous data
    if db["datasets"].find_one({"id":user_id}): 
        db["datasets"].delete_one({"id":user_id})

    # Save the data to MongoDB
    dataHead = df.head()
    res = dataHead.to_json(orient="records")
    parsed = json.loads(res)

    data = df.to_dict(orient='records')
    obj= {
            "id":user_id, 
            "file":data
        }
    collection = db["datasets"]
    collection.insert_one(obj)

    return {"message": f"{len(data)} records saved to datasets collection", "data": parsed}

@file.get("/get_csv_head/{user_id}")
async def get_csv_head(user_id):
    # Verify the user exists in the database
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}

    # Read the CSV file using pandas
    try:
        file_object = db["datasets"].find_one({"id": user_id})
        head = file_object["file"]
        head = pd.DataFrame.from_dict(head).head()
        res = head.to_json(orient="records")
        parsed = json.loads(res)
        return {"message": "success","head": parsed}
        
    except Exception as e:
        
        return {"message": "Error getting the CSV file", "error": str(e)}
    
@file.get("/get_csv/{user_id}")
async def get_csv(user_id):
    # Verify the user exists in the database
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}

    # Read the CSV file using pandas
    try:
        file_object = db["datasets"].find_one({"id": user_id})
        head = file_object["file"]
        head = pd.DataFrame.from_dict(head)
        res = head.to_json(orient="records")
        parsed = json.loads(res)
        return {"message": "success","head": parsed}

        
    except Exception as e:
        
        return {"message": "Error getting the CSV file", "error": str(e)}