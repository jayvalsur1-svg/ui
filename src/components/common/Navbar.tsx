import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AGENCY_CONFIG } from '../../config/agency';
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight, 
  Layers, 
  MessageSquare
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Explore Demos', href: '/explore', icon: Layers },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#090A0F]/95 backdrop-blur-md border-b border-white/10 shadow-lg py-2 sm:py-3' 
          : 'bg-[#090A0F]/60 backdrop-blur-sm sm:bg-transparent py-2.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Text-based Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-0.5 sm:p-1 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-glow-primary group-hover:shadow-glow-cyan transition-all shrink-0">
              <div className="w-full h-full bg-[#090A0F] rounded-[11px] flex items-center justify-center">
                <span className="font-display font-extrabold text-xs sm:text-lg tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                  NX
                </span>
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-black text-xs sm:text-lg lg:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">
                {AGENCY_CONFIG.brand.name}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1 hidden sm:block">
                Digital Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#12141F]/80 border border-white/10 rounded-full px-4 py-1.5 shadow-sm">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    active 
                      ? 'bg-indigo-600/30 text-white border border-indigo-500/40 shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon && <link.icon className="w-3.5 h-3.5 text-indigo-400" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/request"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-indigo-500 to-cyan-400 group-hover:from-indigo-600 group-hover:to-cyan-500 hover:text-white text-white shadow-glow-primary hover:shadow-cyan-500/30 transition-all active:scale-95"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-150 bg-[#090A0F] rounded-full group-hover:bg-opacity-0 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                <span>Request a Website</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              to="/request"
              className="text-[11px] bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1.5 rounded-full font-semibold shadow-sm"
            >
              Request
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090A0F]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2">
            <Link
              to="/request"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              Request a Custom Website
            </Link>
            <a
              href={`https://wa.me/${AGENCY_CONFIG.contact.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-medium text-sm hover:bg-emerald-600/30"
            >
              <MessageSquare className="w-4 h-4" />
              Quick WhatsApp Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
