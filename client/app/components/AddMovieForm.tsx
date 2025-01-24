'use client';

import { useState } from 'react';
import { addMovie } from '../services/movieService';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!title || !director || !year || !genre) {
      setError('All fields are required');
      return;
    }

    try {
      const newMovie = { title, director, year: parseInt(year), genre };
      await addMovie(newMovie);
      setSuccessMessage('Movie added successfully');
      setTitle('');
      setDirector('');
      setYear('');
      setGenre('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to add movie');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 to-indigo-600">
      <div className="space-y-8 w-full max-w- p-10">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow-lg">Add a New Movie</h2>

        {error && <div className="bg-red-600 text-white text-center py-2 px-4 rounded-lg shadow-md">{error}</div>}
        {successMessage && <div className="bg-green-600 text-white text-center py-2 px-4 rounded-lg shadow-md">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-white text-lg font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-5 bg-transparent border-2 border-white text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-white shadow-lg transition-all"
              placeholder="Enter movie title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg font-semibold">Director</label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              className="w-full p-5 bg-transparent border-2 border-white text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-white shadow-lg transition-all"
              placeholder="Enter director's name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg font-semibold">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-5 bg-transparent border-2 border-white text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-white shadow-lg transition-all"
              placeholder="Enter year of release"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white text-lg font-semibold">Genre</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-5 bg-transparent border-2 border-white text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-white shadow-lg transition-all"
              placeholder="Enter movie genre"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
