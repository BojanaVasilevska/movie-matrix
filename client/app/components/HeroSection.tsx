"use client";
import { useState } from 'react';
import { Search, Play, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import Link from 'next/link';

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-main opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/20 to-background" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-accent rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-accent/30 rounded-full blur-2xl opacity-50" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-glass backdrop-blur-xl rounded-3xl opacity-20 rotate-12 border border-white/10" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-glass backdrop-blur-xl rounded-2xl opacity-15 -rotate-12 border border-white/10" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="space-y-12">
          {/* Title */}
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight text-white drop-shadow-[0_3px_15px_rgba(0,0,0,0.6)]">
              <span className="block animate-slide-in-right">MOVIE</span>
              <span className="block bg-gradient-main bg-clip-text text-transparent font-extrabold drop-shadow-glow animate-scale-in transition-transform duration-300">
                MATRIX
              </span>
            </h1>
          </div>

          {/* Search */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-main rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500" />
                <div className="relative bg-card/90 backdrop-blur-2xl rounded-3xl border-2 border-white/30 p-3 shadow-glass group-focus-within:border-primary/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-main rounded-2xl shadow-neon">
                      <Search className="h-6 w-6 text-white" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search movies, directors, actors, genres..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent border-none text-lg text-white placeholder:text-muted-foreground focus:ring-0 focus:outline-none px-0 py-4 font-medium"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-main hover:bg-gradient-hover text-white border-none rounded-2xl px-8 py-4 font-semibold shadow-neon hover:shadow-glow transition-all duration-300 hover:scale-105"
                    >
                      Search Now
                    </Button>
                  </div>
                </div>
              </div>
            </form>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mt-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-800 rounded-full animate-pulse" />
                <span><span className="text-purple-800 font-bold">50,000+</span> Movies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-fuchsia-800 rounded-full animate-pulse" />
                <span><span className="text-fuchsia-800 font-bold">Real-time</span> Search</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-800 rounded-full animate-pulse" />
                <span><span className="text-purple-800 font-bold">AI-powered</span> Results</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/panel">
              <Button 
                size="lg" 
                className="bg-gradient-main hover:shadow-neon text-white shadow-card px-10 py-6 text-lg rounded-2xl transition-all duration-300 border border-white/20"
              >
                <Star className="h-5 w-5 mr-3" />
                My Collection
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg" 
              className="bg-card/90 backdrop-blur-lg hover:bg-gradient-hover text-white border-white/20 px-10 py-6 text-lg rounded-2xl transition-all duration-300"
            >
              <Play className="h-5 w-5 mr-3" />
              Watch Trailer
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            {[
              { value: '50K+', label: 'Movies Available', icon: '🎬', color: 'text-purple-800' },
              { value: '∞', label: 'Endless Discovery', icon: '🚀', color: 'text-fuchsia-800' },
              { value: '8K', label: 'Ultra HD Quality', icon: '✨', color: 'text-purple-800' },
            ].map((stat, idx) => (
              <div className="group" key={idx}>
                <div className="bg-gradient-glass backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-glass hover:shadow-neon transition-all duration-300 text-center text-white">
                  <div className={`text-5xl font-bold mb-3 ${stat.color}`}>{stat.value}</div>
                  <div className="text-white/90 text-lg">{stat.label}</div>
                  <div className="mt-4 text-5xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
