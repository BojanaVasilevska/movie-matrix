from http.client import InvalidURL
from bson import ObjectId
from flask import Blueprint, current_app, request, jsonify
from .models import Movie

# Blueprint for the main routes
main = Blueprint('main', __name__)

# Route to add a new movie
@main.route('/movies', methods=['POST'])
def add_movie():
    data = request.get_json()
    movie = Movie(data["title"], data["director"], data["year"], data["genre"])
    movie_id = movie.save()
    return jsonify({"message": "Movie added", "id": movie_id}), 201

# Route to get all movies
@main.route('/movies', methods=['GET'])
def get_movies():
    return Movie.get_all()

# Route to get a movie by ID
@main.route('/movies/<string:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    return Movie.get_by_id(movie_id)

# Route to update a movie by ID
@main.route('/movies/<movie_id>', methods=['PUT'])
def update_movie(movie_id):
    try:
        movie_id = ObjectId(movie_id)
    except Exception as e:
        return jsonify({"error": "Invalid movie ID"}), 400

    updated_data = request.get_json()

    if not updated_data:
        return jsonify({"error": "No data provided"}), 400

    mongo = current_app.extensions['mongo']
    movies_collection = mongo["movies"]

    result = movies_collection.update_one(
        {"_id": movie_id},
        {"$set": updated_data}
    )

    if result.matched_count == 0:
        return jsonify({"error": "Movie not found"}), 404

    return jsonify({"message": "Movie updated successfully"}), 200


# Route to delete a movie by ID
@main.route('/movies/<string:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    try:
        # Validate ObjectId
        ObjectId(movie_id)
    except InvalidURL:
        return jsonify({"error": "Invalid movie ID format"}), 400

    return Movie.delete(movie_id)

# Route to search for movies based on query parameters
@main.route('/movies/search', methods=['GET'])
def search_movies():
    query_params = request.args
    return Movie.search(query_params)
