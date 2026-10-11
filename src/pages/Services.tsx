import React from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG } from '../config/agency';
import { 
  Sparkles, 
  Layout, 
  ShoppingBag, 
  Zap, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Terminal, 
  TrendingUp,
  Cpu
} from 'lucide-react';

export const Services: React.FC = () => {
  const serviceList = [
    {
      icon: Layout,
      title: "Bespoke UI/UX Design & Brand Systems",
      tagline: "Tailored visual identity that elevates perceived brand value",
      description: "We don't buy generic theme templates. Every screen is thoughtfully architected with bespoke typography hierarchies, custom palette tokens, and fluid interactions.",
      deliverables: [
        "Interactive wireframes & visual concepts",
        "Design tokens (colors, typography, grid, radii)",
        "Responsive component library",
        "Mobile viewport optimization",
      ],
      idealStyle: "Bento Grid or Liquid Glass",
    },
    {
      icon: TrendingUp,
      title: "Conversion-Rate Optimization (CRO)",
      tagline: "Funnel layouts designed to convert clicks into paying leads",
      description: "A beautiful site is useless if it doesn't generate revenue. We construct strategic CTAs, intuitive form flows, social proof triggers, and persuasive visual storytelling.",
      deliverables: [
        "Conversion funnel UX audit",
        "WhatsApp & click-to-action routing",
        "Lead capture & multi-step forms",
        "Frictionless client onboarding UX",
      ],
      idealStyle: "Bento Grid or Glassmorphism",
    },
    {
      icon: ShoppingBag,
      title: "High-Impact Modern E-Commerce",
      tagline: "Unforgettable storefronts built for modern retail brands",
      description: "From streetwear drops to artisanal local goods, we craft storefronts that captivate shoppers. Includes working interactive bags, product drawers, and size selectors.",
      deliverables: [
        "Product catalogs & variant selectors",
        "Interactive sliding shopping cart drawer",
        "Mobile-first checkout experience",
        "Inventory badge & promotion tickers",
      ],
      idealStyle: "Neo-Brutalism or Bento Grid",
    },
    {
      icon: Zap,
      title: "Core Web Vitals & Speed Optimization",
      tagline: "Sub-second load times that keep visitors on your page",
      description: "Speed directly impacts conversion rates and search crawlability. We eliminate bloated scripts, optimize images into modern formats, and build clean CSS.",
      deliverables: [
        "Sub-100ms server response optimization",
        "Zero layout shifts (CLS < 0.05)",
        "Responsive next-gen image serving",
        "Clean, semantic HTML markup",
      ],
      idealStyle: "All Architectures",
    },
    {
      icon: Cpu,
      title: "Full-Stack Web App Engineering",
      tagline: "Scalable frontend interfaces backed by robust APIs",
      description: "When your business requires dynamic dashboards, customer authentication, or booking portals, our senior full-stack developers engineer resilient solutions.",
      deliverables: [
        "React + TypeScript frontends",
        "Python / FastAPI backend services",
        "Database modeling & schema design",
        "Staging environments & automated CI/CD",
      ],
      idealStyle: "Bento Grid & Glassmorphism",
    },
    {
      icon: ShieldCheck,
      title: "Post-Launch Hypercare & Concierge Support",
      tagline: "Guaranteed peace of mind as your business scales",
      description: "We don't disappear after deployment. Every client receives dedicated hypercare support, minor content adjustments, and ongoing performance monitoring.",
      deliverables: [
        "14 to 60 days dedicated support",
        "Domain & SSL certificate setup",
        "Video walkthroughs for your team",
        "Monthly security & uptime checks",
      ],
      idealStyle: "Included in all packages",
    },
  ];

  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPECIALIZED AGENCY SERVICES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Comprehensive Digital Capabilities for <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Ambitious Modern Brands
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From single-page high-converting launchpads to complete multi-page design systems and e-commerce stores, we deliver the complete end-to-end stack.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((srv, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#12141F] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-indigo-500/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600/20 transition-all">
                  <srv.icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-indigo-300 font-mono pt-1">
                    {srv.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {srv.description}
                </p>

                {/* Deliverables List */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {srv.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Recommended: <strong className="text-slate-300">{srv.idealStyle}</strong>
                </span>

                <Link
                  to="/request"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/link"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-950/60 via-[#12141F] to-cyan-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-display font-extrabold text-white">
              Not sure which service or design style matches your business?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We provide a complimentary 20-minute visual roadmap consultation. We'll assess your industry, competitors, and growth objectives.
            </p>
          </div>

          <Link
            to="/request"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white font-bold text-xs shadow-glow-primary whitespace-nowrap transition-all"
          >
            Schedule Free Strategy Call
          </Link>
        </div>

      </div>
    </div>
  );
};
