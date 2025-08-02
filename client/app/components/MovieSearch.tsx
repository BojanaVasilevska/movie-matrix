"use client";
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/Select';
import { Movie } from './MovieCard';

interface MovieSearchProps {
  onSearch: (query: string) => void;
  onGenreFilter: (genre: string | null) => void;
  onSortChange: (sort: string) => void;
  selectedGenre: string | null;
  currentSort: string;
  searchQuery: string;
  movies: Movie[];
}

export const MovieSearch = ({
  onSearch,
  onGenreFilter,
  onSortChange,
  selectedGenre,
  currentSort,
  searchQuery,
  movies
}: MovieSearchProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Extract unique genres from movies
  const genres = Array.from(
    new Set(movies.flatMap(movie => movie.genre))
  ).sort();

  const handleSearch = (value: string) => {
    setLocalQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  const clearGenreFilter = () => {
    onGenreFilter(null);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
        <Input
          type="text"
          placeholder="Search movies..."
          value={localQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 bg-gradient-form text-white placeholder-white/60 border-white/20 focus:border-white/40 shadow-form"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-white/60" />
          <span className="text-sm text-white/80 font-medium">Filters:</span>
        </div>
        
        {/* Genre Filter */}
        <Select value={selectedGenre || ""} onValueChange={(value) => onGenreFilter(value || null)}>
          <SelectTrigger className="w-40 bg-gradient-form text-white border-white/20 focus:border-white/40 shadow-form">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground border-white/20 shadow-form">
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort Options */}
        <Select value={currentSort} onValueChange={onSortChange}>
          <SelectTrigger className="w-40 bg-gradient-form text-white border-white/20 focus:border-white/40 shadow-form">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground border-white/20 shadow-form">
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>

        {/* Active Filters */}
        {(selectedGenre || localQuery) && (
          <div className="flex items-center gap-2 ml-2">
            <span className="text-xs text-white/60">Active:</span>
            {selectedGenre && (
              <Badge 
                variant="secondary" 
                className="bg-accent/20 text-accent border-accent/30 cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={clearGenreFilter}
              >
                {selectedGenre}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
            {localQuery && (
              <Badge 
                variant="secondary" 
                className="bg-accent/20 text-accent border-accent/30 cursor-pointer hover:bg-accent/30 transition-colors"
                onClick={clearSearch}
              >
                &quot;{localQuery}&quot;
                <X className="h-3 w-3 ml-1" />
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
