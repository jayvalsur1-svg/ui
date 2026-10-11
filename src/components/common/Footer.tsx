import React from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG } from '../../config/agency';
import { 
  ArrowUpRight, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06070B] border-t border-white/10 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#090A0F] rounded-[11px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-base bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                    NX
                  </span>
                </div>
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                {AGENCY_CONFIG.brand.name}
              </span>
            </Link>
            
            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              {AGENCY_CONFIG.brand.subheadline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${AGENCY_CONFIG.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {AGENCY_CONFIG.contact.displayPhone}</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>{AGENCY_CONFIG.contact.responseGuarantee}</span>
            </p>
          </div>

          {/* Demos Column */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">
              Website Demos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/demos/bento-grid" className="hover:text-indigo-400 transition-colors flex items-center gap-1 group">
                  <span>Bento Grid Studio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/liquid-glass" className="hover:text-purple-400 transition-colors flex items-center gap-1 group">
                  <span>Liquid Glass Music</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/brutalism" className="hover:text-amber-400 transition-colors flex items-center gap-1 group">
                  <span>RAW Neo-Brutalism</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/demos/glassmorphism" className="hover:text-emerald-400 transition-colors flex items-center gap-1 group">
                  <span>PulseFit Wellness</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 pt-1">
                  <span>All 7 Styles & Shell</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Agency Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">
              Agency
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Web Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Sample Packages
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Our Studio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Direct Inquiries
                </Link>
              </li>
              <li>
                <Link to="/request" className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Request Custom Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase font-mono">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs">
              <a 
                href={`mailto:${AGENCY_CONFIG.contact.email}`} 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{AGENCY_CONFIG.contact.email}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{AGENCY_CONFIG.contact.displayPhone}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{AGENCY_CONFIG.contact.location}</span>
              </div>
              <div className="pt-2 text-slate-500 text-[11px] leading-relaxed">
                {AGENCY_CONFIG.contact.workingHours}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {AGENCY_CONFIG.brand.name}. Crafted with precision for high-converting businesses.
          </p>

          <p className="text-center md:text-right max-w-md text-[11px] text-slate-500">
            *Notice: Packages & prices displayed are sample illustrative pricing. Website demos feature demonstration data and curated brand identities.
          </p>
        </div>

      </div>
    </footer>
  );
};
