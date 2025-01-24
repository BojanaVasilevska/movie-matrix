import { Movie } from '../types/movie';

const API_URL = 'http://localhost:5000/movies';

// Function to fetch all movies
export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};

// Function to add a new movie
export const addMovie = async (movie: Omit<Movie, '_id'>): Promise<Movie> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error(`Failed to add movie: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
    throw new Error('Failed to add movie');
  }
};

// Function to update a movie
export const updateMovie = async (id: string, movie: Partial<Movie>): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) {
      throw new Error(`Failed to update movie: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating movie:', error);
    throw new Error('Failed to update movie');
  }
};

// Function to delete a movie
export const deleteMovie = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete movie: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw new Error('Failed to delete movie');
  }
};

// Function to search movies based on query parameters
export const searchMovies = async (searchParams: { [key: string]: string }): Promise<Movie[]> => {
  try {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${API_URL}/search?${query}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to fetch search results');
  }
};
