import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  Clock, 
  ExternalLink,
  Code2,
  Cpu,
  BarChart3,
  Globe2
} from 'lucide-react';

export const BentoGridDemo: React.FC = () => {
  const [metricTimeframe, setMetricTimeframe] = useState<'30d' | '90d' | '12m'>('30d');
  const [activeTab, setActiveTab] = useState<'architecture' | 'ai' | 'performance'>('architecture');
  const [selectedReview, setSelectedReview] = useState(0);

  const metricData = {
    '30d': { visitors: '+184%', conversion: '4.82%', retention: '92.4%', latency: '68ms' },
    '90d': { visitors: '+340%', conversion: '5.14%', retention: '94.8%', latency: '64ms' },
    '12m': { visitors: '+620%', conversion: '5.89%', retention: '96.2%', latency: '59ms' },
  };

  const reviews = [
    {
      author: "Elena Rostova",
      role: "VP of Product at HyperScale",
      text: "The bento modular design completely re-architected how our enterprise buyers evaluate our platform. Inquiries surged within 48 hours of rollout.",
      rating: 5,
    },
    {
      author: "Marcus Chen",
      role: "Founder, Synthetix AI",
      text: "Nexora's Bento Grid system created a dashboard-grade feel for our public website. It communicates dense technical value without overwhelming visitors.",
      rating: 5,
    },
    {
      author: "Sarah Lindqvist",
      role: "Design Lead, Nordic FinTech",
      text: "Exceptional visual hierarchy. The asymmetric cards and micro-animations deliver a truly bespoke software feel that ordinary templates cannot match.",
      rating: 5,
    },
  ];

  return (
    <DemoViewerShell
      demoId="bento-grid"
      demoTitle="Kinetic Bento Labs"
      category="Digital Agency & High-Tech Product"
      styleBadge="Bento Grid System"
    >
      <div className="bg-[#08090E] text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white font-sans antialiased pb-20">
        
        {/* Sub-Header Navigation for Demo */}
        <div className="border-b border-white/5 bg-[#0D0F18]/80 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-display font-black tracking-wider text-xs sm:text-sm text-white truncate">
              KINETIC // LABS
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              Demo Preview
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs shrink-0">
            <span className="text-slate-400 hidden md:inline">
              Need this layout for your SaaS or Agency?
            </span>
            <Link
              to="/request?style=bento-grid"
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1 shadow-sm transition-all text-xs whitespace-nowrap"
            >
              <span>Build This Style</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Demo Notification Banner */}
        <div className="bg-gradient-to-r from-indigo-900/30 via-cyan-900/20 to-indigo-900/30 border-b border-indigo-500/20 py-2 px-4 text-center text-xs text-indigo-200">
          <span>✨ <strong>Live Interactive Demo:</strong> Toggle timeframes, metrics, and cards below to inspect dynamic state behavior.</span>
        </div>

        {/* Main Bento Grid Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          
          {/* Main Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[auto]">
            
            {/* Card 1: Large Hero Bento Card (Span 2 cols on md, Span 3 on lg) */}
            <div className="md:col-span-2 lg:col-span-3 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#121524] to-[#0E101D] border border-white/10 p-5 sm:p-8 lg:p-10 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-3 sm:space-y-4 relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] sm:text-xs font-mono max-w-full">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">MODULAR DIGITAL ARCHITECTURE • BENTO SPEC 2.0</span>
                </div>

                <h1 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
                  Websites Engineered for <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">Conversion & Impact</span>
                </h1>

                <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal pt-1 sm:pt-2">
                  We dismantle traditional linear websites and assemble modular bento interfaces that command attention, clarify complex software value, and turn visitors into pipeline.
                </p>
              </div>

              {/* Bottom Hero Action Bar */}
              <div className="pt-6 sm:pt-8 relative z-10 flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-4">
                <Link
                  to="/request?style=bento-grid"
                  className="px-5 sm:px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-glow-primary transition-all flex items-center justify-center gap-2 group/btn text-center"
                >
                  <span>Commission This Experience</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span>Production Ready • 10-14 Day Turnaround</span>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Business Metrics Card (Span 1 col) */}
            <div className="rounded-3xl bg-[#111322] border border-white/10 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Metrics Model</span>
                </div>

                {/* Timeframe switch */}
                <div className="flex bg-[#191D30] rounded-lg p-0.5 text-[10px] font-mono">
                  {(['30d', '90d', '12m'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMetricTimeframe(t)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        metricTimeframe === t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-4 space-y-4">
                <div>
                  <div className="text-3xl font-display font-extrabold text-white">
                    {metricData[metricTimeframe].visitors}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                    <span>↑ Inbound Pipeline Surge</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#181B2E] p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono">Conv. Rate</div>
                    <div className="text-base font-bold text-cyan-300 font-mono">{metricData[metricTimeframe].conversion}</div>
                  </div>
                  <div className="bg-[#181B2E] p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono">TTFB Latency</div>
                    <div className="text-base font-bold text-indigo-300 font-mono">{metricData[metricTimeframe].latency}</div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono border-t border-white/5 pt-3">
                *Simulated live client metrics model
              </div>
            </div>

            {/* Card 3: Interactive Tabbed Architecture Module (Span 2 cols) */}
            <div className="md:col-span-2 rounded-3xl bg-[#111322] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Engineered Capabilities</span>
                  </div>
                  <span className="text-[11px] text-indigo-400 font-mono">High Precision</span>
                </div>

                {/* Tab Switcher */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pb-4">
                  {[
                    { id: 'architecture', label: 'Modular Grid', icon: Layers },
                    { id: 'ai', label: 'Dynamic Micro-UI', icon: Cpu },
                    { id: 'performance', label: 'Speed Score', icon: Zap },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                          : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Details */}
                <div className="bg-[#16192A] rounded-2xl p-5 border border-white/5 space-y-2">
                  {activeTab === 'architecture' && (
                    <>
                      <h4 className="text-white font-semibold text-sm">Adaptive Asymmetric CSS Grid</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Cards dynamically rearrange according to content priority and screen dimensions without breaking visual balance or leaving jagged whitespace.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-cyan-300">
                        <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">CSS Grid v2</span>
                        <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Zero Reflow</span>
                        <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Fluid Spacing</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'ai' && (
                    <>
                      <h4 className="text-white font-semibold text-sm">Contextual Micro-Interactions</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Tactile hover states, subtle magnetic borders, and reactive data filters transform passive reading into an exploratory product experience.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-purple-300">
                        <span className="bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Smooth Springs</span>
                        <span className="bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">60 FPS Render</span>
                      </div>
                    </>
                  )}

                  {activeTab === 'performance' && (
                    <>
                      <h4 className="text-white font-semibold text-sm">99/100 Core Web Vitals Guarantee</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Static asset pre-compilation, zero bloated runtime dependencies, and strict bundle hygiene yield sub-100ms load times globally.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-emerald-300">
                        <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">0.02 CLS</span>
                        <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">0.8s LCP</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Tailored for High-Conversion Tech Startups</span>
                <span className="text-indigo-400 font-mono">Live Interactive Mode</span>
              </div>
            </div>

            {/* Card 4: Interactive Client Testimonials Card (Span 2 cols on lg, 1 on md) */}
            <div className="md:col-span-1 lg:col-span-2 rounded-3xl bg-[#111322] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Review selector dots */}
                  <div className="flex gap-1.5">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedReview(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          selectedReview === idx ? 'w-6 bg-indigo-500' : 'bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`View review ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic">
                  "{(reviews[selectedReview] || reviews[0]).text}"
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    {(reviews[selectedReview] || reviews[0]).author}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {(reviews[selectedReview] || reviews[0]).role}
                  </div>
                </div>

                <div className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/5 text-slate-400">
                  Verified Client
                </div>
              </div>
            </div>

            {/* Card 5: Live Interactive Tech Stack Bento Card (Span 1 col) */}
            <div className="rounded-3xl bg-[#111322] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 pb-3">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Tech Foundation</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">Modern Production Stack</h4>
                <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                  Clean, maintainable components with zero legacy baggage.
                </p>

                <div className="pt-4 space-y-2">
                  {[
                    { name: 'React 18 & TypeScript', tag: 'Type-Safe' },
                    { name: 'Tailwind CSS Grid', tag: 'Utility-First' },
                    { name: 'Vite Native Bundling', tag: 'Instant HMR' },
                  ].map((tech) => (
                    <div key={tech.name} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
                      <span className="text-slate-300 font-medium">{tech.name}</span>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">{tech.tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 text-[11px] text-slate-500 font-mono">
                ✓ Fully SEO & Accessibility ready
              </div>
            </div>

            {/* Card 6: Website Preview Card (Span 2 cols on lg) */}
            <div className="lg:col-span-2 rounded-3xl bg-[#111322] border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Live Website Preview Mockup</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    Active Viewport
                  </span>
                </div>

                <div className="bg-[#090A0F] rounded-2xl border border-white/10 overflow-hidden shadow-inner">
                  <div className="bg-[#181B2B] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[10px] font-mono text-slate-400 ml-2">preview.kineticlabs.io</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400">● 60 FPS</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-1/3 bg-indigo-500/40 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/20 rounded-full" />
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
                      <div className="h-12 bg-white/5 rounded-lg border border-white/5" />
                      <div className="h-12 bg-indigo-500/20 rounded-lg border border-indigo-500/30" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Adaptive Cross-Device Preview</span>
                <span className="text-cyan-400">Zero Cumulative Layout Shift</span>
              </div>
            </div>

            {/* Card 7: Portfolio Showcase Card (Span 1 col) */}
            <div className="rounded-3xl bg-[#111322] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Portfolio Showcase</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">Recent Case Studies</h4>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Velox AI Logistics</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">+64% Inquiries</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block">Enterprise AI Platform</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Symphony Audio</span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">4.2m Avg Dwell</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block">Spatial Sound Studio</span>
                  </div>
                </div>
              </div>

              <Link
                to="/explore"
                className="pt-2 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                <span>View Complete Portfolio Case Studies</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Card 8: Pricing Bento Card (Span 1 col) */}
            <div className="rounded-3xl bg-[#111322] border border-white/10 p-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-300 uppercase tracking-wider">Sprint Package</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    Sample Rate
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white font-display">Growth Bento Build</h4>
                  <div className="text-2xl font-black text-cyan-300 font-mono mt-1">$2,950</div>
                  <span className="text-[10px] text-slate-400 font-mono">10-14 Day Turnaround</span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Modular Asymmetric Grid</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp & Form Flow</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Core Web Vitals & SEO</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/request?style=bento-grid"
                className="mt-4 w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center block shadow-sm transition-all"
              >
                Book Bento Sprint
              </Link>
            </div>

            {/* Card 6: Interactive CTA Bento Card (Span 3 cols on lg, 2 on md) */}
            <div className="md:col-span-2 lg:col-span-3 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-indigo-950 to-[#111322] border border-indigo-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2 max-w-xl text-center sm:text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Custom Bento Execution
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Want this exact Bento Grid style customized for your company?
                </h3>
                <p className="text-sm text-slate-300">
                  We adapt this layout with your custom brand tokens, typography, and industry-specific business components.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/request?style=bento-grid"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-sm shadow-glow-primary text-center transition-all"
                >
                  Request Bento Website
                </Link>
                <Link
                  to="/explore"
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm text-center transition-colors"
                >
                  View Other Styles
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </DemoViewerShell>
  );
};
