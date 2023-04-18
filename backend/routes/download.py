from fastapi import  Response
from fastapi.responses import StreamingResponse, FileResponse
from fastapi import APIRouter
from models.pipelineModel import PipelineModel
from bson import ObjectId
import pandas as pd
from config.db import db,users
import csv
from io import StringIO

down = APIRouter()


@down.get("/download_data/{user_id}")
async def download_user_data(user_id: str, response: Response):
   
    
    # Verify the user exists in the database
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return {"message": "User not found"}
    
    # Retrieve the data for the user from the MongoDB collection
    data = db["datasets"].find_one({"id": user_id})
    dict_file = data["file"]
    df = pd.DataFrame.from_dict(dict_file)
    
    # Set the CSV response headers
    # response.headers["Content-Disposition"] = f"attachment; filename={user_id}_data.csv"
    # response.headers["Content-Type"] = "text/csv"
    
    # # Write the data to a StringIO buffer as CSV
    # output = StringIO()
    # writer = csv.writer(output)
    # writer.writerow(df.columns)
    # for row in df.itertuples(index=False):
    #     writer.writerow(row)
    
    # # Set the response body to the CSV data
    # response.body = output.getvalue()

    return StreamingResponse(
        iter([df.to_csv(index=False)]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=data.csv"})
    
    # return FileResponse(df.to_csv(index=False), media_type='text/csv',filename="data.csv")
    return response