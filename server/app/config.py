import os

class Config:
    # MongoDB URI
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/movie_matrix")

