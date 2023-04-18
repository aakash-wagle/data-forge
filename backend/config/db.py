from pymongo import MongoClient
import os
os.environ["MONGODB_URI"] ="mongodb+srv://akashshetgar:NWWIT5sB2F3vtr2U@dataforgecluster1.v5fwvnn.mongodb.net/test"
os.environ["SECRET_KEY"] ="secret"

db_connection = MongoClient(os.environ['MONGODB_URI'])
db = db_connection.dataforge
users = db["users"]