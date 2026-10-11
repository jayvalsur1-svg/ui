import React from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG } from '../config/agency';
import { 
  Sparkles, 
  Target, 
  Code2, 
  Eye, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Award,
  HeartHandshake
} from 'lucide-react';

export const About: React.FC = () => {
  const values = [
    {
      icon: Target,
      title: "Conversion-Led Aesthetics",
      description: "Visual elegance without conversion is merely art. Every margin, font pairing, and color gradient we implement is engineered to direct user attention toward trust and action.",
    },
    {
      icon: Code2,
      title: "Zero Template Bloat",
      description: "We don't use heavy, slow multi-purpose themes loaded with 50 unused plugins. We build modular, type-safe components in React, TypeScript, and modern CSS that load instantly.",
    },
    {
      icon: Eye,
      title: "Distinct Design Personalities",
      description: "A gym shouldn't look like an accounting firm, and a luxury audio brand shouldn't look like a generic tech SaaS. We craft distinct visual systems that reinforce your brand's unique character.",
    },
    {
      icon: HeartHandshake,
      title: "Transparent Collaboration",
      description: "Direct access to lead designers and engineers without layers of account management bureaucracy. Clear milestone deliverables, fixed timelines, and no surprise invoices.",
    },
  ];

  const teamMembers = [
    {
      name: "Marcus Sterling",
      role: "Creative Director & Design Lead",
      bio: "12+ years directing interactive design systems for premium brands. Passionate about typography, modular bento grids, and sensory UI.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    },
    {
      name: "Kai Chen",
      role: "Senior Full-Stack Architect",
      bio: "Specialist in high-concurrency web apps, React, TypeScript, and Python. Obsessed with sub-second page performance and zero layout shifts.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    },
    {
      name: "Amara Patel",
      role: "Lead CRO & Funnel Strategist",
      bio: "Former growth marketer with over $40M in validated e-commerce and SaaS conversions. Analyzes user behavior and micro-copy psychology.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    },
    {
      name: "Soren Lind",
      role: "Motion & UI Engineer",
      bio: "Crafts fluid micro-interactions, spring physics, and accessible motion systems that make digital interfaces feel alive and tactile.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
  ];

  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDIO MANIFESTO & PHILOSOPHY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            We Believe Websites Should Be <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Your Most Powerful Sales Asset.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded with a singular mission: to eliminate generic, slow, cookie-cutter websites and equip modern businesses with bespoke digital experiences that convert visitors into loyal clients.
          </p>
        </div>

        {/* Agency Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {AGENCY_CONFIG.metrics.map((m, idx) => (
            <div key={idx} className="bg-[#12141F] rounded-2xl border border-white/10 p-5 sm:p-6 text-center space-y-1 shadow-lg">
              <div className="text-2xl sm:text-4xl font-display font-black bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">
                {m.label}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {m.helper}
              </div>
            </div>
          ))}
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              How We Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              The Standards Behind Every Nexora Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-[#12141F] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-3 shadow-xl hover:border-indigo-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-display font-bold text-white">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              The Craft Collective
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Senior Talent on Every Project
            </h2>
            <p className="text-xs text-slate-400">
              No junior offshore handoffs. Your project is led directly by experienced designers and senior full-stack developers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="bg-[#12141F] rounded-2xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-indigo-500/40 transition-all"
              >
                <div>
                  <div className="aspect-square relative overflow-hidden bg-slate-800">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-1">
                    <h4 className="text-sm font-display font-bold text-white">{member.name}</h4>
                    <p className="text-xs text-indigo-300 font-mono">{member.role}</p>
                    <p className="text-xs text-slate-400 pt-2 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion CTA */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-900/40 via-[#12141F] to-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-display font-extrabold text-white">
              Ready to collaborate with a studio that cares about your bottom line?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Explore our design demos or submit your project requirements to receive a detailed visual and technical proposal within 24 business hours.
            </p>
          </div>

          <Link
            to="/request"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-xs shadow-glow-primary whitespace-nowrap transition-all"
          >
            Request a Custom Quote
          </Link>
        </div>

      </div>
    </div>
  );
};
