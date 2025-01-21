from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from .config import Config
from .routes import main

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # MongoDB client and register 
    client = MongoClient(app.config["MONGO_URI"])
    app.extensions['mongo'] = client["movie_matrix"]

    # Blueprint for routes
    app.register_blueprint(main)

    return app


