from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi import APIRouter
from models.pipelineModel import PipelineModel
from bson import ObjectId
import pandas as pd
from config.db import db,users
import json
import copy

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
    # print("User",user)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        # return {"message": "User not found"}
    
    resPipelines = []
    resPipelineTemplate = {
        "name":"",
        "operations":[],
    }
    operationTemplate = {
        "opName": "",
        "values": [],
    }
    mongoPipeLines = db["pipelines"].find({"id":user_id}, {'_id': 0})
    # print("pipeLine",mongoPipeLines)
    if not mongoPipeLines:
        raise HTTPException(status_code=404, detail="Pipelines not found")
        # return {"message": "Pipelines not found"}
    for obj in mongoPipeLines:
        # print("Doc: ", obj)
        # print("pipeline_name: ", obj["pipeline_name"])
        resPipeline = copy.deepcopy(resPipelineTemplate)
        # print("resPipeline after clear: ", resPipeline)
        resPipeline["name"] = obj["pipeline_name"]
        for operation in obj["pipeline"]:
            op = copy.deepcopy(operationTemplate)
            op["opName"] = operation[0]
            op["values"] = operation[1:]
            resPipeline["operations"].append(op)
        # print("operations: ", resPipeline["operations"])
        # print("resPipeline: ", resPipeline)
        resPipelines.append(resPipeline)
    return {"message": "Pipelines fetched successfully", "pipelines": resPipelines}