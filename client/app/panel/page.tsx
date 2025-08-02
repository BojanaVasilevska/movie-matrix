'use client';
import { useState, useMemo } from 'react';
import Link from "next/link";
import { Heart,  Plus, Star, Clock, Grid, List } from 'lucide-react';
import { MovieCard, Movie } from '../components/MovieCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/Dialog';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { sampleMovies } from '../data/movies';
import { useToast } from '../hooks/UseToast';

const UserPanel = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '2'])); 
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: new Date().getFullYear(),
    genre: '',
    director: '',
    description: '',
    poster: '',
    rating: 5,
    duration: 120,
    cast: ''
  });
  const { toast } = useToast();

  const toggleFavorite = (movieId: string) => {
    const newFavorites = new Set(favorites);
    const movie = sampleMovies.find(m => m.id === movieId);
    
    if (newFavorites.has(movieId)) {
      newFavorites.delete(movieId);
      toast({
        title: "Removed from Favorites",
        description: `${movie?.title} has been removed from your favorites.`,
        variant: "destructive"
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

  const favoriteMovies = sampleMovies.filter(movie => favorites.has(movie.id));

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally add to a user's custom movie list
    toast({
      title: "Movie Added",
      description: `${newMovie.title} has been added to your collection.`,
    });
    setNewMovie({
      title: '',
      year: new Date().getFullYear(),
      genre: '',
      director: '',
      description: '',
      poster: '',
      rating: 5,
      duration: 120,
      cast: ''
    });
    setIsAddMovieOpen(false);
  };

  const stats = useMemo(() => ({
    totalFavorites: favorites.size,
    avgRating: favoriteMovies.length > 0 
      ? (favoriteMovies.reduce((acc, movie) => acc + movie.rating, 0) / favoriteMovies.length).toFixed(1)
      : 0,
    totalWatchTime: favoriteMovies.reduce((acc, movie) => acc + movie.duration, 0),
    topGenres: favoriteMovies.reduce((acc, movie) => {
      movie.genre.forEach(g => {
        acc[g] = (acc[g] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>)
  }), [favorites, favoriteMovies]);

  const topGenre = Object.entries(stats.topGenres).sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';

  const MovieGrid = ({ movies }: { movies: Movie[] }) => (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            👤 My Movie Panel
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Manage your favorite movies and build your personal collection.
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{stats.totalFavorites}</div>
            <div className="text-white/70">Favorites</div>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{stats.avgRating}</div>
            <div className="text-white/70">Avg Rating</div>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{Math.round(stats.totalWatchTime / 60)}h</div>
            <div className="text-white/70">Watch Time</div>
          </div>
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 text-center border border-white/10">
            <div className="text-2xl mb-2">🎭</div>
            <div className="text-lg font-bold text-white">{topGenre}</div>
            <div className="text-white/70">Top Genre</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">My Favorites</h2>
            <Badge variant="secondary" className="bg-gradient-form text-white border-none">
              {favoriteMovies.length} movies
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {/* Add Movie Dialog */}
            <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-form hover:bg-gradient-hover text-white shadow-form">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Movie
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-popover text-popover-foreground border-white/20 shadow-form max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Custom Movie</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddMovie} className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white/80">Title</Label>
                    <Input
                      id="title"
                      value={newMovie.title}
                      onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                      className="bg-gradient-form text-white placeholder-white/60 border-white/20"
                      placeholder="Movie title"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year" className="text-white/80">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={newMovie.year}
                        onChange={(e) => setNewMovie({...newMovie, year: parseInt(e.target.value)})}
                        className="bg-gradient-form text-white placeholder-white/60 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating" className="text-white/80">Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="10"
                        step="0.1"
                        value={newMovie.rating}
                        onChange={(e) => setNewMovie({...newMovie, rating: parseFloat(e.target.value)})}
                        className="bg-gradient-form text-white placeholder-white/60 border-white/20"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="director" className="text-white/80">Director</Label>
                    <Input
                      id="director"
                      value={newMovie.director}
                      onChange={(e) => setNewMovie({...newMovie, director: e.target.value})}
                      className="bg-gradient-form text-white placeholder-white/60 border-white/20"
                      placeholder="Director name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white/80">Description</Label>
                    <Textarea
                      id="description"
                      value={newMovie.description}
                      onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                      className="bg-gradient-form text-white placeholder-white/60 border-white/20"
                      placeholder="Movie description"
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-form hover:bg-gradient-hover text-white">
                    Add Movie
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* View Mode Toggle */}
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

        {/* Favorites Collection */}
        {favoriteMovies.length > 0 ? (
          <MovieGrid movies={favoriteMovies} />
        ) : (
          <div className="text-center py-16 text-white/60">
            <div className="text-8xl mb-6">💝</div>
            <h3 className="text-2xl font-semibold mb-4">Your collection is empty</h3>
            <p className="text-lg mb-8">Start building your movie collection by adding favorites!</p>
            <Button asChild className="bg-gradient-form hover:bg-gradient-hover text-white shadow-form">
              <Link href="/movies" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                    Browse Movies
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
