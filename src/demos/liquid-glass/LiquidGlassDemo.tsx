import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Search, 
  Heart, 
  Sparkles, 
  Radio, 
  Compass, 
  Disc, 
  Sliders, 
  Music, 
  Check, 
  ArrowRight,
  Headphones,
  Flame,
  Clock
} from 'lucide-react';
import { MusicTrack } from '../../types';

export const LiquidGlassDemo: React.FC = () => {
  // Track list
  const initialTracks: MusicTrack[] = [
    {
      id: '1',
      title: 'Aurora Borealis (Spatial Ambient)',
      artist: 'Kroma Soundworks',
      album: 'Resonance Void',
      duration: '4:18',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80',
      genre: 'Ambient',
      plays: '1.4M',
    },
    {
      id: '2',
      title: 'Neon Drift (2084 Sunset)',
      artist: 'Vektor Pulse',
      album: 'Cyber Horizon',
      duration: '3:45',
      cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80',
      genre: 'Synthwave',
      plays: '2.8M',
    },
    {
      id: '3',
      title: 'Submerged Echoes',
      artist: 'Aethelgard',
      album: 'Liquid Depths',
      duration: '5:12',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80',
      genre: 'Neo-Classical',
      plays: '890K',
    },
    {
      id: '4',
      title: 'Velvet Horizon (Deep Groove)',
      artist: 'Solaia & The Moon',
      album: 'Midnight Mirage',
      duration: '3:58',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80',
      genre: 'Deep House',
      plays: '3.1M',
    },
    {
      id: '5',
      title: 'Chrono Bloom',
      artist: 'Stellar Drift',
      album: 'Constellation EP',
      duration: '4:30',
      cover: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&q=80',
      genre: 'Lo-Fi',
      plays: '740K',
    },
  ];

  const [tracks] = useState<MusicTrack[]>(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [progress, setProgress] = useState(38); // percentage
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(['1', '4']);

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const toggleLike = (id: string) => {
    setLikedTrackIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredTracks = tracks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.album.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || t.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const genres = ['All', 'Ambient', 'Synthwave', 'Deep House', 'Neo-Classical', 'Lo-Fi'];

  return (
    <DemoViewerShell
      demoId="liquid-glass"
      demoTitle="Lumen Liquid Glass"
      category="Spatial Audio & Premium Streaming"
      styleBadge="Liquid Glass Architecture"
    >
      <div className="relative min-h-screen bg-[#07050E] text-slate-100 font-sans antialiased overflow-hidden pb-32">
        
        {/* Soft Ambient Floating Glow Orbs (Liquid Glass Foundation) */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-fuchsia-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />

        {/* Demo Sub-Bar */}
        <div className="relative z-30 border-b border-white/10 bg-[#0E0B1A]/60 backdrop-blur-2xl px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-fuchsia-400 p-[1px] shadow-lg shadow-purple-500/20 shrink-0">
              <div className="w-full h-full bg-[#0E0B1A] rounded-[11px] flex items-center justify-center">
                <Music className="w-3.5 h-3.5 text-fuchsia-300" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-display font-black text-xs sm:text-sm tracking-wide text-white truncate block">
                LUMEN // AUDIO
              </span>
              <span className="text-[9px] sm:text-[10px] text-purple-300 font-mono block -mt-0.5 truncate">
                Spatial Sound Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline text-xs text-purple-200/70">
              Frosted Panels & Specular Highlights
            </span>
            <Link
              to="/request?style=liquid-glass"
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-400 text-white text-[11px] sm:text-xs font-semibold shadow-lg shadow-purple-500/25 transition-all whitespace-nowrap"
            >
              Commission Style
            </Link>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
          
          {/* Glass Hero Banner */}
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-glass-card">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-[10px] sm:text-xs font-mono max-w-full">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">LOSSLESS 24-BIT / 192KHZ SPATIAL IMMERSION</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
                Music Heard in <br />
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                  Luminous Dimension
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                Experience high-fidelity audio streams wrapped in dynamic frosted glass, fluid acoustic waveforms, and ethereal spatial staging.
              </p>

              <div className="pt-2 sm:pt-4 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="px-5 sm:px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:bg-slate-200 transition-all active:scale-95"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'Pause Experience' : 'Stream Resonance EP'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-purple-200 font-mono bg-purple-900/30 px-3.5 py-2.5 rounded-full border border-purple-500/20">
                  <Headphones className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                  <span>Dolby Atmos Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tracks, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Genre Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedGenre === genre
                      ? 'bg-purple-600/40 text-purple-200 border border-purple-400/40 shadow-sm'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Tracks & Audio Discovery Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-fuchsia-400" />
                <h2 className="text-xl font-display font-bold text-white">Curated Spatial Tracks</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredTracks.length} tracks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTracks.map((track, idx) => {
                const isCurrent = track.id === currentTrack.id;
                const isLiked = likedTrackIds.includes(track.id);

                return (
                  <div
                    key={track.id}
                    className={`group rounded-2xl p-4 transition-all duration-300 relative overflow-hidden backdrop-blur-xl border ${
                      isCurrent
                        ? 'bg-white/[0.09] border-purple-400/40 shadow-lg shadow-purple-500/10 ring-1 ring-purple-400/30'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Album Cover Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => {
                            setCurrentTrackIndex(idx);
                            setIsPlaying(true);
                          }}
                          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                            isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {isCurrent && isPlaying ? (
                            <Pause className="w-6 h-6 text-white fill-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white fill-white" />
                          )}
                        </button>
                      </div>

                      {/* Track Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-purple-300' : 'text-white'}`}>
                          {track.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">{track.artist}</p>
                        <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                          <span>{track.genre}</span>
                          <span>•</span>
                          <span>{track.plays} plays</span>
                        </div>
                      </div>

                      {/* Like Action */}
                      <button
                        onClick={() => toggleLike(track.id)}
                        className={`p-2 rounded-full transition-colors ${
                          isLiked ? 'text-fuchsia-400' : 'text-slate-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Subscription Tier Preview Card */}
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-purple-950/40 via-fuchsia-950/30 to-purple-950/40 backdrop-blur-2xl border border-purple-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-fuchsia-400">
                Lumen Studio Membership
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Audiophile Studio Tier • 96kHz Master FLAC
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Deploy this Liquid Glass aesthetic to give your luxury lifestyle, music, or high-end entertainment brand an unforgettable digital presence.
              </p>
            </div>

            <Link
              to="/request?style=liquid-glass"
              className="px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-bold text-sm shadow-xl transition-all whitespace-nowrap"
            >
              Order Liquid Glass Build
            </Link>
          </div>

        </div>

        {/* Persistent Floating Interactive Music Player Bar (Section 5 Requirement) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0C0917]/95 backdrop-blur-2xl border-t border-white/15 px-3 sm:px-8 py-2.5 sm:py-3 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            
            {/* Top row on mobile / Left on desktop: Active Track & Mobile Play Controls */}
            <div className="flex items-center justify-between w-full sm:w-1/3 gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover border border-white/15 shadow-md shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-white truncate flex items-center gap-1.5">
                    <span className="truncate">{currentTrack.title}</span>
                    {isPlaying && (
                      <span className="hidden xs:flex gap-0.5 items-end h-3 shrink-0">
                        <span className="w-0.5 h-2.5 bg-fuchsia-400 animate-pulse" />
                        <span className="w-0.5 h-3.5 bg-purple-400 animate-pulse" />
                        <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs text-purple-200/70 truncate">
                    {currentTrack.artist}
                  </div>
                </div>
              </div>

              {/* Mobile Quick Play Toggle Button */}
              <div className="flex sm:hidden items-center gap-1 shrink-0">
                <button
                  onClick={prevTrack}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={nextTrack}
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Desktop Center: Controls & Interactive Scrubber */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 w-full sm:w-1/3">
              <div className="hidden sm:flex items-center gap-4">
                <button
                  onClick={prevTrack}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar Scrubber */}
              <div className="w-full flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span>1:24</span>
                <div 
                  className="flex-1 h-1.5 sm:h-1 bg-white/10 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    if (rect.width > 0) {
                      const clickX = e.clientX - rect.left;
                      const calculated = Math.round((clickX / rect.width) * 100);
                      setProgress(Math.min(100, Math.max(0, calculated)));
                    }
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Right: Volume & Action Controls */}
            <div className="hidden sm:flex items-center justify-end gap-3 w-1/3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <div className="w-20 h-1 bg-white/10 rounded-full relative">
                <div 
                  className={`h-full rounded-full ${isMuted ? 'bg-slate-600' : 'bg-white'}`}
                  style={{ width: isMuted ? '0%' : '75%' }}
                />
              </div>

              <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                Hi-Res FLAC
              </div>
            </div>

          </div>
        </div>

      </div>
    </DemoViewerShell>
  );
};
