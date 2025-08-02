"use client";
import { useState } from 'react';
import { Heart, Star, Calendar, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  duration: number;
  poster: string;
  description: string;
  director: string;
  cast: string[];
}

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: string) => void;
}

export const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-gradient-glass backdrop-blur-xl rounded-3xl overflow-hidden shadow-glass hover:shadow-neon transition-all duration-500 hover:scale-105 border border-white/20">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted/20">
        {!imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-form flex items-center justify-center">
            <div className="text-center text-white/80">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Favorite Button */}
        <Button
          variant="secondary"
          size="sm"
          className={cn(
            "absolute top-4 right-4 p-3 bg-gradient-glass backdrop-blur-lg shadow-glass transition-all duration-300 rounded-xl border border-white/20",
            isFavorite ? "text-red-400 shadow-neon" : "text-muted-foreground hover:text-red-400"
          )}
          onClick={() => onToggleFavorite(movie.id)}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
        </Button>

        {/* Rating Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-4 left-4 bg-gradient-main text-primary-foreground border-none shadow-neon px-3 py-2 rounded-xl"
        >
          <Star className="h-4 w-4 mr-2 fill-current text-yellow-300" />
          {movie.rating.toFixed(1)}
        </Badge>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Movie Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {movie.description}
          </p>
        </div>

        {/* Movie Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {movie.year}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {movie.duration}m
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {movie.genre.slice(0, 2).map((genre) => (
            <Badge 
              key={genre} 
              variant="outline" 
              className="text-xs bg-gradient-glass backdrop-blur-lg text-foreground border-white/20 hover:bg-gradient-accent transition-all duration-300 px-3 py-1 rounded-xl"
            >
              {genre}
            </Badge>
          ))}
          {movie.genre.length > 2 && (
            <Badge 
              variant="outline" 
              className="text-xs bg-gradient-glass backdrop-blur-lg text-muted-foreground border-white/20 px-3 py-1 rounded-xl"
            >
              +{movie.genre.length - 2}
            </Badge>
          )}
        </div>

        {/* Director & Cast Info */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="line-clamp-1">
            <span className="font-medium text-foreground">Director:</span> {movie.director}
          </p>
          <p className="line-clamp-1">
            <span className="font-medium text-foreground">Cast:</span> {movie.cast.slice(0, 2).join(', ')}
            {movie.cast.length > 2 && '...'}
          </p>
        </div>
      </div>
    </div>
  );
};
