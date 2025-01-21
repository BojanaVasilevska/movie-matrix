from bson import ObjectId
from bson.json_util import dumps
from flask import jsonify, current_app

class Movie:
    def __init__(self, title, director, year, genre):
        self.title = title
        self.director = director
        self.year = year
        self.genre = genre

    def save(self):
        """
        Save a new movie to the database
        """
        movie_data = {
            "title": self.title,
            "director": self.director,
            "year": self.year,
            "genre": self.genre
        }
        # Access mongo 
        mongo = current_app.extensions['mongo']
        movies_collection = mongo["movies"]
        movie_id = movies_collection.insert_one(movie_data).inserted_id
        return str(movie_id)

    @staticmethod
    def get_all():
        """
        Get all movies from the database
        """
        mongo = current_app.extensions['mongo']
        movies_collection = mongo["movies"]
        movies = list(movies_collection.find())
        return dumps(movies), 200 

    @staticmethod
    def get_by_id(movie_id):
        """
        Get a single movie by ID
        """
        mongo = current_app.extensions['mongo']
        movies_collection = mongo["movies"]
        movie = movies_collection.find_one({"_id": ObjectId(movie_id)})
        if not movie:
            return jsonify({"error": "Movie not found"}), 404
        return dumps(movie), 200  

    @staticmethod
    def update(movie_id, data):
        """
        Update a movie by its ID
        """
        mongo = current_app.extensions['mongo']
        movies_collection = mongo["movies"]
        result = movies_collection.update_one({"_id": ObjectId(movie_id)}, {"$set": data})
        if result.modified_count == 0:
            return jsonify({"error": "Movie not found or no change made"}), 404
        return jsonify({"message": "Movie updated"}), 200

    @staticmethod
    def delete(movie_id):
        """
        Delete a movie by its ID
        """
        mongo = current_app.extensions['mongo']
        movies_collection = mongo["movies"]
        result = movies_collection.delete_one({"_id": ObjectId(movie_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Movie not found"}), 404
        return jsonify({"message": "Movie deleted"}), 200

    @staticmethod
    def search(query_params):
        """
        Search for movies based on various criteria.
        """
        mongo = current_app.extensions['mongo']
        movies_collection = mongo["movies"]
        search_criteria = {}

        # Search criteria dynamically
        if "title" in query_params:
            search_criteria["title"] = {"$regex": query_params["title"], "$options": "i"} 
        if "director" in query_params:
            search_criteria["director"] = {"$regex": query_params["director"], "$options": "i"}
        if "year" in query_params:
            try:
                search_criteria["year"] = int(query_params["year"])
            except ValueError:
                return jsonify({"error": "Year must be a valid integer"}), 400
        if "genre" in query_params:
            search_criteria["genre"] = {"$regex": query_params["genre"], "$options": "i"}

        # Execute the search query
        movies = list(movies_collection.find(search_criteria))
        if not movies:
            return jsonify({"message": "No movies found matching the criteria"}), 404
        return dumps(movies), 200
