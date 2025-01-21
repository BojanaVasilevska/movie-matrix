from flask import Blueprint, request, jsonify
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
@main.route('/movies/<string:movie_id>', methods=['PUT'])
def update_movie(movie_id):
    data = request.get_json()
    return Movie.update(movie_id, data)

# Route to delete a movie by ID
@main.route('/movies/<string:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    return Movie.delete(movie_id)

# Route to search for movies based on query parameters
@main.route('/movies/search', methods=['GET'])
def search_movies():
    query_params = request.args
    return Movie.search(query_params)
