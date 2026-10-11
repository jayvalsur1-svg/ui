import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG } from '../config/agency';
import { 
  Search, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  Eye, 
  Sliders, 
  Volume2, 
  Power, 
  Check, 
  SlidersHorizontal,
  LayoutGrid,
  Filter,
  LayoutDashboard,
  Users,
  Wallet
} from 'lucide-react';

export const ExploreDesigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');

  // Interactive states for secondary style demos
  // Claymorphism
  const [clayCount, setClayCount] = useState(3);
  // Neumorphism
  const [neuToggle, setNeuToggle] = useState(true);
  const [neuSlider, setNeuSlider] = useState(65);
  // Skeuomorphism
  const [skeuoPower, setSkeuoPower] = useState(true);
  const [skeuoDialAngle, setSkeuoDialAngle] = useState(45);

  const industries = ['All', ...AGENCY_CONFIG.targetIndustries];
  const styles = [
    'All',
    'Bento Grid',
    'Liquid Glass',
    'Neo-Brutalism',
    'Glassmorphism',
    'Claymorphism',
    'Neumorphism',
    'Skeuomorphism',
    'SaaS Dashboard',
    'Social Profile',
    'Digital Wallet',
  ];

  const mainDemos = AGENCY_CONFIG.demos.filter((d) => d.isMainDemo);

  const filteredDemos = mainDemos.filter((demo) => {
    const matchesSearch =
      demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demo.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'All' ||
      demo.suitableIndustries.some((ind) =>
        ind.toLowerCase().includes(selectedIndustry.toLowerCase().split(' ')[0])
      );

    const matchesStyle = selectedStyle === 'All' || demo.visualStyle === selectedStyle;

    return matchesSearch && matchesIndustry && matchesStyle;
  });

  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE DESIGN & APPLICATION SHOWROOM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Explore 10 Distinct <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Design Systems & Apps</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every business and application demands a distinct personality. Browse our 10 fully navigable website and software demos, test device viewport simulations, and choose the visual system tailored to your domain.
          </p>
        </div>

        {/* Filter & Search Bar (Section 9 Requirement) */}
        <div className="mt-12 bg-[#12141F] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search styles by keyword (e.g., audio, fitness, bento, shop)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#181B2B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter by Industry */}
            <div className="md:col-span-3">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Industries</option>
                {industries.filter((i) => i !== 'All').map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Visual Style */}
            <div className="md:col-span-3">
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Visual Styles</option>
                {styles.filter((s) => s !== 'All').map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
            <span>Showing {filteredDemos.length} primary design architectures</span>
            {(searchTerm || selectedIndustry !== 'All' || selectedStyle !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('All');
                  setSelectedStyle('All');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* 4 Main Demos Grid (Section 9 Requirement: Detailed Cards) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDemos.map((demo) => (
            <div
              key={demo.id}
              className="bg-[#12141F] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300"
            >
              <div>
                {/* Visual Preview Header Banner */}
                <div className={`h-48 bg-gradient-to-tr ${demo.previewGradient} p-6 relative overflow-hidden flex flex-col justify-between`}>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
                      {demo.visualStyle}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-white backdrop-blur-md">
                      {demo.category}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-extrabold text-white">
                      {demo.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1">
                      {demo.tagline}
                    </p>
                  </div>

                  {/* Decorative glow */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 space-y-5">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {demo.description}
                  </p>

                  {/* Suitable Industries */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Ideal For Industries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {demo.suitableIndustries.map((ind) => (
                        <span
                          key={ind}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#181B2B] text-slate-300 border border-white/5"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                      Interactive Feature Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {demo.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Open Demo & Request Similar Website */}
              <div className="p-4 sm:p-8 pt-0 border-t border-white/5 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
                <Link
                  to={demo.slug}
                  className="w-full sm:w-1/2 py-2.5 sm:py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-glow-primary transition-all active:scale-95 text-center"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Full Demo</span>
                </Link>

                <Link
                  to={`/request?style=${encodeURIComponent(demo.id)}`}
                  className="w-full sm:w-1/2 py-2.5 sm:py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-95 text-center"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Request Similar Style</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section 8: Three Additional Secondary Style Previews (Claymorphism, Neumorphism, Skeuomorphism) */}
        <div className="mt-24 pt-12 border-t border-white/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Experimental Aesthetics
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Secondary Style Previews & Tactile Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Beyond our 4 core demos, explore interactive components built with specialized tactile design philosophies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Style A: Claymorphism */}
            <div id="claymorphism" className="rounded-3xl p-6 bg-[#161828] border border-indigo-500/20 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                  Style A
                </span>
                <span className="text-xs text-slate-400 font-mono">Soft 3D Pillows</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">Claymorphism</h3>
                <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                  Friendly, rounded tactile surfaces with dual inner and drop shadows. Exceptional for educational apps and child-friendly platforms.
                </p>
              </div>

              {/* Interactive Claymorphic Playground */}
              <div className="p-6 rounded-2xl bg-[#0D0E17] border border-white/5 flex flex-col items-center justify-center space-y-4">
                <div className="clay-card w-40 h-28 flex flex-col items-center justify-center text-white cursor-pointer select-none transition-transform active:scale-95">
                  <span className="text-xs font-bold uppercase tracking-wider">Squishy Card</span>
                  <span className="text-2xl font-black mt-1">Level {clayCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setClayCount((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-md active:scale-90 transition-transform"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono text-slate-300">Test Counter</span>
                  <button
                    onClick={() => setClayCount((prev) => prev + 1)}
                    className="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-md active:scale-90 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/demos/claymorphism"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold block text-center shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Launch Full Lumina 3D Demo</span>
                </Link>
                <Link
                  to="/request?style=claymorphism"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 text-xs font-medium border border-white/10 block text-center transition-colors"
                >
                  Request Claymorphic Project →
                </Link>
              </div>
            </div>

            {/* Style B: Neumorphism */}
            <div id="neumorphism" className="rounded-3xl p-6 bg-[#141724] border border-white/10 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-500/20 text-slate-300">
                  Style B
                </span>
                <span className="text-xs text-slate-400 font-mono">Soft Extrusions</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">Neumorphism</h3>
                <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                  Extruded, seamless tone-on-tone shadows emerging from the background plane. Tailored for specialized IoT dashboards and smart hardware.
                </p>
              </div>

              {/* Interactive Neumorphic Playground */}
              <div className="p-6 rounded-2xl bg-[#141724] flex flex-col items-center justify-center space-y-4">
                {/* Neumorphic Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono">Sensor State:</span>
                  <button
                    onClick={() => setNeuToggle(!neuToggle)}
                    className={`w-14 h-8 rounded-full p-1 transition-all ${
                      neuToggle ? 'neumorphic-inset' : 'neumorphic-raised'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full transition-transform ${
                        neuToggle
                          ? 'translate-x-6 bg-cyan-400 shadow-glow-cyan'
                          : 'translate-x-0 bg-slate-500'
                      }`}
                    />
                  </button>
                </div>

                {/* Neumorphic Tactile Slider */}
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Gain Pressure</span>
                    <span>{neuSlider}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={neuSlider}
                    onChange={(e) => setNeuSlider(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/demos/neumorphism"
                  className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold block text-center shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Launch Full Aura IoT Demo</span>
                </Link>
                <Link
                  to="/request?style=neumorphism"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 text-xs font-medium border border-white/10 block text-center transition-colors"
                >
                  Request Neumorphic UI →
                </Link>
              </div>
            </div>

            {/* Style C: Skeuomorphism */}
            <div id="skeuomorphism" className="rounded-3xl p-6 bg-[#0E0F14] border border-white/10 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  Style C
                </span>
                <span className="text-xs text-slate-400 font-mono">Physical Realism</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">Skeuomorphism</h3>
                <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                  Realistic material surfaces, brushed metallic finishes, tactile mechanical switches, and analog dials for luxury instruments.
                </p>
              </div>

              {/* Interactive Skeuomorphic Playground */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#2A2B32] to-[#17181D] border-2 border-[#3A3B45] shadow-2xl flex flex-col items-center justify-center space-y-4">
                
                {/* Mechanical Switch & Indicator Lamp */}
                <div className="flex items-center gap-4">
                  {/* Realistic LED Lamp */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-slate-700 transition-all ${
                      skeuoPower
                        ? 'bg-red-500 shadow-[0_0_12px_#EF4444]'
                        : 'bg-red-950'
                    }`}
                  />

                  {/* Mechanical Toggle Lever */}
                  <button
                    onClick={() => setSkeuoPower(!skeuoPower)}
                    className="px-3 py-1.5 rounded bg-gradient-to-t from-slate-400 via-slate-200 to-slate-400 text-black font-mono font-bold text-xs shadow-md border border-slate-500 active:scale-95"
                  >
                    {skeuoPower ? 'PWR: ON' : 'PWR: OFF'}
                  </button>
                </div>

                {/* Rotating Analog Dial Knob */}
                <div className="space-y-1 text-center">
                  <div
                    onClick={() => setSkeuoDialAngle((prev) => (prev + 30) % 360)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-300 via-slate-500 to-slate-800 border-2 border-slate-900 shadow-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform mx-auto"
                    style={{ transform: `rotate(${skeuoDialAngle}deg)` }}
                    title="Click to rotate analog potentiometer"
                  >
                    <div className="w-1 h-4 bg-white rounded-full -translate-y-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block pt-1">
                    Analog Potentiometer ({skeuoDialAngle}°)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/demos/skeuomorphism"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-black text-xs block text-center shadow-md transition-all flex items-center justify-center gap-1.5 uppercase"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Launch Full Valve 1976 Demo</span>
                </Link>
                <Link
                  to="/request?style=skeuomorphism"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 text-xs font-medium border border-white/10 block text-center transition-colors"
                >
                  Request Skeuomorphic Platform →
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION: PRODUCT & APPLICATION UI SYSTEMS SPOTLIGHT */}
        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Interactive Web Applications & Products
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Dedicated Product UI Architectures
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Beyond marketing websites, Nexora Digital engineers complex, multi-state interactive web applications with fluid state machines and responsive layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* App 1: SaaS Dashboard */}
            <div className="rounded-3xl p-6 bg-[#0E1322] border border-white/10 hover:border-indigo-500/40 shadow-xl flex flex-col justify-between space-y-6 transition-all group">
              <div className="space-y-4">
                <div className="h-40 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#0E1322] p-5 border border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      SaaS Dashboard
                    </span>
                    <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-white">Nexus Metrics</h3>
                    <p className="text-[11px] text-slate-400 font-mono">B2B SaaS Analytics & BI Suite</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Collapsible multi-state sidebar, interactive MRR trajectory charts, searchable customer account tables with filters, and role-based team management.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Collapsible Sidebar', 'Live MRR Sparklines', 'Data Filters', 'Light/Dark Modes'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <Link
                  to="/demos/saas-dashboard"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Launch SaaS Dashboard</span>
                </Link>
                <Link
                  to="/request?style=saas-dashboard"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-indigo-300 text-xs font-medium border border-white/10 block text-center transition-colors"
                >
                  Request Similar SaaS App →
                </Link>
              </div>
            </div>

            {/* App 2: Social Profile & Community */}
            <div className="rounded-3xl p-6 bg-[#10131D] border border-white/10 hover:border-purple-500/40 shadow-xl flex flex-col justify-between space-y-6 transition-all group">
              <div className="space-y-4">
                <div className="h-40 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-[#10131D] p-5 border border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Social Platform
                    </span>
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-white">Synapse Network</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Creator & Developer Graph</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Custom cover banners, dynamic follow/unfollow counters, live post composer, code snippet syntax blocks, media gallery, and instant direct messaging chat drawer.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Follow Counter State', 'Live Chat Drawer', 'Post Composer', 'Syntax Snippets'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <Link
                  to="/demos/social"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Launch Social Network</span>
                </Link>
                <Link
                  to="/request?style=social"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-purple-300 text-xs font-medium border border-white/10 block text-center transition-colors"
                >
                  Request Similar Community →
                </Link>
              </div>
            </div>

            {/* App 3: FinTech Treasury Wallet */}
            <div className="rounded-3xl p-6 bg-[#0B0E18] border border-white/10 hover:border-emerald-500/40 shadow-xl flex flex-col justify-between space-y-6 transition-all group">
              <div className="space-y-4">
                <div className="h-40 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#07090E] to-[#0B0E18] p-5 border border-white/5 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FinTech & Treasury
                    </span>
                    <Wallet className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-white">Aura Pay</h3>
                    <p className="text-[11px] text-slate-400 font-mono">Global Digital Wealth Wallet</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Mask balances with privacy toggles, multi-currency accounts (USD, EUR, BTC), titanium virtual card with security lock, live filtered ledger, and simulated money transfer modal.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Simulated Transfers', 'Balance Privacy', 'Virtual Titanium Card', 'Audit Ledger'].map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <Link
                  to="/demos/fintech-wallet"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all uppercase"
                >
                  <Eye className="w-3.5 h-3.5 text-black" />
                  <span>Launch FinTech Wallet</span>
                </Link>
                <Link
                  to="/request?style=fintech-wallet"
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-300 text-xs font-medium border border-white/10 block text-center transition-colors"
                >
                  Request Similar FinTech UI →
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
