from pydantic import BaseModel, Field
from fastapi import FastAPI, File, UploadFile
from typing import Optional
from bson.objectid import ObjectId

class FileModel(BaseModel):
    id: str
    file: UploadFile