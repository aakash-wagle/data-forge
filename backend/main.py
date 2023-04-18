from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.crud import user
from routes.login import userlogin
from routes.fileupload import file
from routes.preprocess import pre
from routes.pipeline import pipe
from routes.delete import rem
from routes.download import down
import os
# from decouple import config

# os.environ["MONGODB_URI"] = config("MONGODB_URI")
# os.environ["SECRET_KEY"] = config("SECRET_KEY")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(user)
app.include_router(userlogin)
app.include_router(file)
app.include_router(pre)
app.include_router(pipe)
app.include_router(rem)
app.include_router(down)

@app.get("/")
async def home():
    return {"message": "Hello World"}