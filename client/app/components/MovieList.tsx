'use client';

import { useEffect, useState } from 'react';
import { getMovies, deleteMovie, updateMovie, searchMovies } from '../services/movieService';
import { EditingMovie, Movie } from '../types/movie';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<{ title: string; director: string; year: string; genre: string }>({
    title: '',
    director: '',
    year: '',
    genre: '',
  });
  const [editingMovie, setEditingMovie] = useState<EditingMovie | null>(null);
  const [updatedMovie, setUpdatedMovie] = useState<{ title: string; director: string; year: string; genre: string }>({
    title: '',
    director: '',
    year: '',
    genre: '',
  });

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        console.log('Movies:', data);

        const uniqueMovies = data.filter(
          (movie, index, self) =>
            index === self.findIndex((t) => t._id === movie._id) 
        );

        setMovies(uniqueMovies);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch movies');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch search results');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (id: string | { $oid: string }) => {
    try {
      const movieId = typeof id === 'string' ? id : id.$oid;

      if (!/^[0-9a-fA-F]{24}$/.test(movieId)) {
        throw new Error('Invalid movie ID format');
      }

      const response = await deleteMovie(movieId);
      console.log('Delete Response:', response);

      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
    } catch (err) {
      console.error('Error deleting movie:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete movie');
      }
    }
  };

  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie);
    setUpdatedMovie({
      title: movie.title,
      director: movie.director,
      year: movie.year ? movie.year.toString() : '',
      genre: movie.genre || '',
    });
  };

  const handleUpdateMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMovie) return;

    const updatedWithNumberYear = {
      ...updatedMovie,
      year: updatedMovie.year ? parseInt(updatedMovie.year, 10) : 0,
    };

    try {
      let movieId: string | undefined;

      if (typeof editingMovie._id === 'string') {
        movieId = editingMovie._id;
      } else if ('$oid' in editingMovie._id) {
        movieId = editingMovie._id.$oid;
      }

      if (!movieId || !/^[0-9a-fA-F]{24}$/.test(movieId)) {
        throw new Error('Invalid movie ID format');
      }

      const updated = await updateMovie(movieId, updatedWithNumberYear);
      console.log('Updated Movie:', updated);

      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie._id === updated._id ? { ...movie, ...updated } : movie
        )
      );
      setEditingMovie(null);
    } catch (err) {
      console.error('Error updating movie:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update movie');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl font-semibold text-teal-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-[80%] mx-auto p-6">
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            name="title"
            value={searchQuery.title}
            onChange={handleSearchChange}
            placeholder="Search by title"
            className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
          />
          <input
            type="text"
            name="director"
            value={searchQuery.director}
            onChange={handleSearchChange}
            placeholder="Search by director"
            className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
          />
          <input
            type="text"
            name="year"
            value={searchQuery.year}
            onChange={handleSearchChange}
            placeholder="Search by year"
            className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
          />
          <input
            type="text"
            name="genre"
            value={searchQuery.genre}
            onChange={handleSearchChange}
            placeholder="Search by genre"
            className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
          />
          <button
            type="submit"
            className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={typeof movie._id === 'string' ? movie._id : movie._id?.$oid} className="bg-gradient-to-r from-purple-700 via-indigo-500 to-indigo-600 text-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-sm mt-2">Director: {movie.director}</p>
            <p className="text-sm">Year: {movie.year}</p>
            <p className="text-sm">Genre: {movie.genre}</p>
            <div className="mt-4 flex justify-between">
            <button
              className="text-teal-400 hover:text-teal-600 transition-colors"
              onClick={() => handleEditMovie(movie)}
            >
              <FaPen size={20} />
            </button>
            <button
              className="text-red-500 hover:text-red-600 transition-colors"
              onClick={() => handleDeleteMovie(movie._id)}
            >
              <FaTrashAlt size={20} />
            </button>
            </div>
          </div>
        ))}
      </div>

      {editingMovie && (
        <div className="mt-6">
          <h3 className="text-3xl text-white font-semibold mb-4">Edit Movie</h3>
          <form onSubmit={handleUpdateMovie} className="space-y-4">
            <input
              type="text"
              value={updatedMovie.title}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, title: e.target.value })}
              placeholder="Title"
              className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
            />
            <input
              type="text"
              value={updatedMovie.director}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, director: e.target.value })}
              placeholder="Director"
              className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
            />
            <input
              type="text"
              value={updatedMovie.year}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, year: e.target.value })}
              placeholder="Year"
              className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
            />
            <input
              type="text"
              value={updatedMovie.genre}
              onChange={(e) => setUpdatedMovie({ ...updatedMovie, genre: e.target.value })}
              placeholder="Genre"
              className="p-3 w-full border border-transparent bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md placeholder-opacity-75 hover:shadow-xl transition-all"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Update Movie
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieList;
