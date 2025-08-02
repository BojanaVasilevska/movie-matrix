'use client';
import { useState, useMemo } from 'react';
import { Grid, List } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { MovieCard, Movie } from './components/MovieCard';
import { MovieSearch } from './components/MovieSearch';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { sampleMovies } from './data/movies';
import { useToast } from './hooks/UseToast';

const Home = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const toggleFavorite = (movieId: string) => {
    const newFavorites = new Set(favorites);
    const movie = sampleMovies.find(m => m.id === movieId);
    
    if (newFavorites.has(movieId)) {
      newFavorites.delete(movieId);
      toast({
        title: "Removed from Favorites",
        description: `${movie?.title} has been removed from your favorites.`,
      });
    } else {
      newFavorites.add(movieId);
      toast({
        title: "Added to Favorites",
        description: `${movie?.title} has been added to your favorites.`,
      });
    }
    setFavorites(newFavorites);
  };

  const filteredAndSortedMovies = useMemo(() => {
    let movies = [...sampleMovies];

    // Filter by search query
    if (searchQuery) {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by genre
    if (selectedGenre) {
      movies = movies.filter(movie => movie.genre.includes(selectedGenre));
    }

    // Sort movies
    movies.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return b.year - a.year;
        case 'rating':
          return b.rating - a.rating;
        case 'duration':
          return b.duration - a.duration;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return movies;
  }, [searchQuery, selectedGenre, sortBy]);

  const MovieGrid = ({ movies }: { movies: Movie[] }) => (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }`}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.has(movie.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-main">
      <HeroSection />
      
      {/* Movie Collection Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🎬 Movie Collection
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore our curated collection of movies from every genre and era.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-3xl font-bold text-white">{sampleMovies.length}</div>
            <div className="text-white/70">Total Movies</div>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-3xl font-bold text-white">{favorites.size}</div>
            <div className="text-white/70">Your Favorites</div>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-3xl font-bold text-white">
              {Math.round(sampleMovies.reduce((acc, movie) => acc + movie.rating, 0) / sampleMovies.length * 10) / 10}
            </div>
            <div className="text-white/70">Avg Rating</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/10">
          <MovieSearch
            onSearch={setSearchQuery}
            onGenreFilter={setSelectedGenre}
            onSortChange={setSortBy}
            selectedGenre={selectedGenre}
            currentSort={sortBy}
            searchQuery={searchQuery}
            movies={sampleMovies}
          />
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Showing</span>
            <Badge variant="secondary" className="bg-gradient-form text-white border-none">
              {filteredAndSortedMovies.length} movies
            </Badge>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="bg-gradient-form border-white/20 text-white hover:bg-gradient-hover"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="bg-gradient-form border-white/20 text-white hover:bg-gradient-hover"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredAndSortedMovies.length > 0 ? (
          <MovieGrid movies={filteredAndSortedMovies} />
        ) : (
          <div className="text-center py-12 text-white/60">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
