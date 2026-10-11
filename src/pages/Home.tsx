import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG } from '../config/agency';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Eye, 
  Star, 
  Monitor, 
  Smartphone, 
  ChevronRight, 
  Play, 
  HelpCircle,
  Clock,
  Compass,
  Check
} from 'lucide-react';

export const Home: React.FC = () => {
  // Active demo in hero preview mockup
  const [activeHeroDemo, setActiveHeroDemo] = useState<'bento' | 'liquid' | 'brutal' | 'glass'>('bento');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);

  const mainDemos = AGENCY_CONFIG.demos.filter((d) => d.isMainDemo);

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Style Selection",
      description: "We analyze your business model, customer psychology, and competitive landscape, then align on one of our 4 proven design architectures.",
    },
    {
      number: "02",
      title: "Interactive Prototype & Tokens",
      description: "We configure your custom brand palette, typography scales, spacing tokens, and interactive micro-animations in a responsive sandbox.",
    },
    {
      number: "03",
      title: "Rapid Full-Stack Engineering",
      description: "Our senior developers craft semantic, type-safe React & modern CSS code engineered for sub-second speeds and zero cumulative layout shifts.",
    },
    {
      number: "04",
      title: "Audit, Launch & Hypercare",
      description: "Rigorous cross-device testing, SEO verification, and DNS deployment, followed by 14–30 days of dedicated concierge post-launch support.",
    },
  ];

  const portfolioItems = [
    {
      title: "Velox Autonomous Logistics",
      industry: "Enterprise AI & Robotics",
      style: "Bento Grid System",
      result: "+64% Qualified Demo Inquiries",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    },
    {
      title: "Symphony Spatial Audio",
      industry: "Consumer Electronics",
      style: "Liquid Glass Experience",
      result: "4.2 Min Avg Time-On-Page",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80",
    },
    {
      title: "KOR // Heavy Apparel",
      industry: "Streetwear E-Commerce",
      style: "Neo-Brutalism Storefront",
      result: "3.8% Direct Conversion Rate",
      image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&q=80",
    },
    {
      title: "Aura Peak Longevity",
      industry: "Boutique Wellness Studio",
      style: "Glassmorphism Ecosystem",
      result: "+88 New Memberships in 30 Days",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
    },
  ];

  const testimonials = [
    {
      quote: "Before Nexora, we had a generic template that made us look like every other competitor. Their Bento Grid architecture completely transformed how enterprise clients perceive our tech capability.",
      author: "Julian Vance",
      company: "CEO, Synthetix AI",
      metric: "+148% Inbound Pipeline",
    },
    {
      quote: "Our streetwear drop needed something aggressive and unapologetic. The Neo-Brutalist store they built sold out our entire 500-unit limited run in under 3 hours. The interactive cart is flawless.",
      author: "Roxanne Cross",
      company: "Creative Director, Concrete Lab",
      metric: "Sold Out in 3 Hours",
    },
    {
      quote: "The glassmorphic dashboard interface gives our fitness members a high-end luxury feel that matches our physical studio. Working with their senior team was the smoothest agency experience we've had.",
      author: "Dr. Marcus Wei",
      company: "Founder, Vitality Peak Studio",
      metric: "94% Member Retention",
    },
  ];

  const faqs = [
    {
      q: "Why are your 7 demo designs built as separate complete websites?",
      a: "Unlike low-tier agencies that simply change button colors on a single generic template, we believe distinct industries require genuinely different visual personalities, interaction physics, and content hierarchies.",
    },
    {
      q: "Can I test the demos on my phone or tablet?",
      a: "Yes! Every demo page includes an interactive device preview toolbar that lets you toggle between Desktop (100%), Tablet (768px), and Mobile (390px) responsive viewports directly in real time.",
    },
    {
      q: "How long does a custom website build usually take?",
      a: "Our Starter landing platforms take 5–7 business days. Comprehensive multi-page Growth websites typically launch in 10–14 business days, and complex Premium platforms with custom logic in 2–3 weeks.",
    },
    {
      q: "Do you build on WordPress or modern custom code?",
      a: "We engineer with modern, clean architectures: React, TypeScript, Vite, Tailwind CSS, and Python/FastAPI. This yields 10x faster load speeds, unbreakable security, and zero bloated plugin maintenance.",
    },
    {
      q: "How do we get started?",
      a: "Explore our designs, select the aesthetic that resonates with your brand, and use our 'Request a Website' form or WhatsApp link. We will provide a tailored scope within 24 business hours.",
    },
  ];

  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
            
            {/* Dynamic Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs text-indigo-300 font-mono shadow-inner max-w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">{AGENCY_CONFIG.brand.positioning || "Beautiful Websites. Smarter Business."}</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline">4 Live Navigable Demos</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.12]">
              {AGENCY_CONFIG.brand.heroTitlePrefix}{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                {AGENCY_CONFIG.brand.heroTitleHighlight}
              </span>{' '}
              <br className="hidden sm:inline" />
              {AGENCY_CONFIG.brand.heroTitleSuffix}
            </h1>

            {/* Supporting Subheadline */}
            <p className="text-xs sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal px-2">
              {AGENCY_CONFIG.brand.subheadline}
            </p>

            {/* 4 & 5. Primary and Secondary CTAs */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
              <Link
                to="/explore"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-glow-primary transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Explore Designs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/request"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm border border-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Build My Website</span>
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 sm:pt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-8 text-[10px] sm:text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>Zero Generic Templates</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>Sub-Second Performance</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>Mobile Device Simulator</span>
              </div>
            </div>

          </div>

          {/* 3. Animated Website Preview Mockups */}
          <div className="mt-16 max-w-5xl mx-auto">
            {/* Mockup Frame Header */}
            <div className="bg-[#12141F] rounded-t-2xl border border-white/10 p-3 sm:px-6 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="hidden sm:inline-block ml-3 text-xs font-mono text-slate-400 bg-[#181B2B] px-3 py-1 rounded-full border border-white/5">
                  https://nexoradigital.studio/demos/{activeHeroDemo}
                </span>
              </div>

              {/* Demo Quick Switcher inside hero mockup */}
              <div className="flex items-center gap-1 bg-[#181B2B] p-1 rounded-xl text-xs font-medium overflow-x-auto scrollbar-none">
                {[
                  { id: 'bento', label: 'Bento Grid', short: 'Bento' },
                  { id: 'liquid', label: 'Liquid Glass', short: 'Liquid' },
                  { id: 'brutal', label: 'Brutalism', short: 'Brutal' },
                  { id: 'glass', label: 'Glassmorphism', short: 'Glass' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveHeroDemo(d.id as any)}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] whitespace-nowrap transition-all ${
                      activeHeroDemo === d.id
                        ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="hidden xs:inline">{d.label}</span>
                    <span className="xs:hidden">{d.short}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mockup Screen Window */}
            <div className="bg-[#0D0F18] border-x border-b border-white/10 rounded-b-2xl p-6 sm:p-10 shadow-2xl min-h-[360px] flex flex-col justify-between relative overflow-hidden group">
              
              {activeHeroDemo === 'bento' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-bold">
                      Kinetic Bento Labs // Agency Architecture
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                      Modular CSS Grid
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 p-5 rounded-2xl bg-[#141727] border border-white/10 space-y-2">
                      <h4 className="text-xl font-bold text-white font-display">Asymmetric High-Tech Bento Cards</h4>
                      <p className="text-xs text-slate-300">Crafted for SaaS platforms and creative consultancies needing to communicate complex multi-tier value quickly.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#141727] border border-white/10 flex flex-col justify-center text-center">
                      <div className="text-3xl font-black text-cyan-300 font-mono">+184%</div>
                      <div className="text-[11px] text-slate-400 font-mono">Conversion Lift</div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/demos/bento-grid"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      <span>Open Bento Grid Experience</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeHeroDemo === 'liquid' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-fuchsia-400 uppercase tracking-widest font-bold">
                      Lumen Audio // Spatial Streaming
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/10 text-fuchsia-300">
                      Frosted Glass & Ambient Orbs
                    </span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/20 space-y-3">
                    <h4 className="text-xl font-bold text-white font-display">Translucent Surfaces with Working Player Bar</h4>
                    <p className="text-xs text-slate-300">Subtle specular highlights, ambient glow, and an active audio player with track progress scrubbing.</p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/demos/liquid-glass"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300"
                    >
                      <span>Open Liquid Glass Experience</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeHeroDemo === 'brutal' && (
                <div className="space-y-6 bg-white text-black p-6 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#FAFF00]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black bg-black text-[#FAFF00] px-2 py-0.5">
                      RAW // CONCRETE STREETWEAR
                    </span>
                    <span className="font-mono text-xs font-bold text-black">
                      WORKING CART DRAWER ACTIVE
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black font-display uppercase tracking-tight">HIGH-CONTRAST NEO-BRUTALISM STOREFRONT</h4>
                    <p className="font-mono text-xs text-zinc-700">Thick 4px borders, hard offset shadows, size selectors, and an actual functional shopping bag.</p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/demos/brutalism"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-black bg-black text-white px-3 py-1.5 shadow-[2px_2px_0px_#FAFF00]"
                    >
                      <span>LAUNCH BRUTALIST STORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {activeHeroDemo === 'glass' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      PulseFit Wellness // Health & Longevity
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                      Soft Mesh Gradients & Floating UI
                    </span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-emerald-500/30 space-y-3">
                    <h4 className="text-xl font-bold text-white font-display">Interactive Daily Streaks & Calorie Trackers</h4>
                    <p className="text-xs text-slate-300">Frosted translucent cards, water logging buttons, trainer credentials, and billing toggles.</p>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/demos/glassmorphism"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Open Glassmorphism Experience</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. Featured Design Styles & Interactive Website Demo Gallery */}
      <section className="py-14 sm:py-24 border-t border-white/5 bg-[#0A0C13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                Seven Distinct Visual Systems
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Interactive Website Demo Gallery
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Click into any demo to explore complete multi-section pages, device preview simulators, and functional interactive components.
              </p>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase font-mono tracking-wider"
            >
              <span>View All 10 Styles & Applications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Demo Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainDemos.map((demo) => (
              <div
                key={demo.id}
                className="bg-[#12141F] rounded-3xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <div className={`h-44 bg-gradient-to-tr ${demo.previewGradient} p-6 relative flex flex-col justify-between`}>
                    <div className="flex justify-between items-center relative z-10">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20">
                        {demo.visualStyle}
                      </span>
                      <span className="text-xs text-white/90 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {demo.category}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-display font-black text-white">{demo.title}</h3>
                      <p className="text-xs text-white/80">{demo.tagline}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {demo.description}
                    </p>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                        Key Capabilities:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {demo.features.slice(0, 3).map((f) => (
                          <span key={f} className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/5 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={demo.slug}
                      className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview Demo</span>
                    </Link>

                    <Link
                      to="/explore"
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 border border-white/10 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Explore Design</span>
                    </Link>
                  </div>

                  <Link
                    to={`/request?style=${encodeURIComponent(demo.id)}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 text-cyan-300 hover:text-cyan-200 text-xs font-semibold flex items-center justify-center gap-1 border border-cyan-500/30 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Request Similar Website</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Services Overview */}
      <section className="py-14 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Agency Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              End-to-End Digital Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Every package is backed by rigorous technical execution and conversion strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Bespoke UI/UX Design Systems",
                desc: "Tailored brand tokens, custom typography hierarchy, and fluid micro-interactions designed to elevate perceived value.",
              },
              {
                title: "Conversion Funnels & Instant Chat",
                desc: "Direct WhatsApp routing, validated multi-step inquiry forms, and frictionless customer pathways.",
              },
              {
                title: "Sub-Second Performance & SEO",
                desc: "Type-safe clean React, zero layout shifts, semantic HTML, and Google Core Web Vitals optimization.",
              },
            ].map((s, idx) => (
              <div key={idx} className="bg-[#12141F] rounded-2xl border border-white/10 p-6 space-y-3 shadow-lg">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-white font-display">{s.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>Explore all agency services & deliverables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. How The Process Works */}
      <section className="py-14 sm:py-24 border-t border-white/5 bg-[#0C0E17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              How We Build Your Website
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              A transparent, 4-step agile timeline with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="bg-[#12141F] rounded-2xl border border-white/10 p-6 space-y-3 relative shadow-xl">
                <span className="font-mono text-2xl font-black text-indigo-500/40">
                  {step.number}
                </span>
                <h3 className="text-base font-bold text-white font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing Packages (Home Section Preview) */}
      <section className="py-14 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Sample Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Transparent Investment Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Illustrative starting prices clearly marked. Adaptable to your exact business specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AGENCY_CONFIG.pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between ${
                  pkg.popular
                    ? 'bg-[#16182B] border-2 border-indigo-500/50 shadow-2xl'
                    : 'bg-[#12141F] border border-white/10 shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">{pkg.name}</h3>
                    <p className="text-xs text-indigo-300 font-mono">{pkg.tagline}</p>
                  </div>

                  <div className="text-3xl font-extrabold text-white font-display">
                    {pkg.priceSample}
                    <span className="text-xs text-slate-400 font-normal font-mono block">/ sample rate</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-white/5">
                    {pkg.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <Link
                    to={`/pricing`}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center block transition-colors"
                  >
                    View Package Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Portfolio Showcase */}
      <section className="py-14 sm:py-24 border-t border-white/5 bg-[#090B11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Recent Deployments
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                Portfolio Showcase
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Explore live demo interactive counterparts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, idx) => (
              <div key={idx} className="bg-[#12141F] rounded-2xl border border-white/10 overflow-hidden shadow-xl group">
                <div className="aspect-video relative overflow-hidden bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                    {item.style}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="text-sm font-bold text-white font-display">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.industry}</p>
                  <div className="pt-2 text-xs font-mono font-bold text-emerald-400">
                    {item.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Customer Testimonials */}
      <section className="py-14 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Trusted by Discerning Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-[#12141F] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                  <div>
                    <div className="text-xs font-bold text-white font-display">{t.author}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{t.company}</div>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ Section */}
      <section className="py-14 sm:py-24 border-t border-white/5 bg-[#0C0E17]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#12141F] border border-white/10 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-indigo-400 font-mono text-lg ml-4">
                    {faqOpenIndex === idx ? '−' : '+'}
                  </span>
                </button>

                {faqOpenIndex === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Final Conversion-Focused CTA */}
      <section className="py-14 sm:py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-cyan-900/20 to-indigo-900/30 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMISSION YOUR CUSTOM BUILD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight">
            Stop Losing Customers to Outdated Templates. <br />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              Elevate to Nexora Digital Today.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose your preferred design style from our showroom, configure your scope, and receive a dedicated production proposal within 24 business hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/request"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-primary transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Request a Custom Website</span>
            </Link>

            <a
              href={`https://wa.me/${AGENCY_CONFIG.contact.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp: {AGENCY_CONFIG.contact.displayPhone}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
