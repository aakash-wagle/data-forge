from fastapi import FastAPI, File, UploadFile
from fastapi import APIRouter
from models.pipelineModel import PipelineModel
from bson import ObjectId
import pandas as pd
from config.db import db,users
import json

pipe = APIRouter()

@pipe.post("/upload-pipeline/{user_id}")
async def upload_csv(user_id:str, pipeline:PipelineModel):
    # Verify the user exists in the database
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}
    
    pipeLine = db["pipelines"].find_one({"pipeline_name":pipeline.pipeline_name})
    if pipeLine:
        return {"message": "Pipeline name already exists"}

    # Read the CSV file using pandas
    try:
        # data = df.to_dict(orient='records')
        obj= {
                "id":user_id, 
                "pipeline_name":pipeline.pipeline_name,
                "pipeline":pipeline.pipeline
            }
        collection = db["pipelines"]
        collection.insert_one(obj)    
        
    except Exception as e:
         return {"message": "Error saving pipeline", "error": str(e)}

    return {"message": "Pipeline saved"}

@pipe.get("/get-pipeline/{user_id}")
async def get_pipeline(user_id:str):
    # Verify the user exists in the database
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}
    
    pipeLine = db["pipelines"].find({"id":user_id})
    if not pipeLine:
        return {"message": "Pipelines not found"}
    
    return {"message": "Pipelines fetched successfully", "data":pipeLine}