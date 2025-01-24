import AddMovieForm from './components/AddMovieForm';
import MovieList from './components/MovieList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-500 to-blue-500 p-8 space-y-16">
      <h1 className="text-6xl font-extrabold text-center text-white mb-12 drop-shadow-lg">
        Movie Matrix
      </h1>

      {/* Movie List Section */}
      <div className="space-y-12">
        <MovieList />
      </div>

      {/* Add Movie Form Section */}
      <div className="flex justify-center">
        <div className="w-[78%] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 p-8 rounded-2xl shadow-2xl">
          <AddMovieForm />
        </div>
      </div>
    </div>
  );
};

export default Home;

