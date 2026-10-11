import React, { useState } from 'react';
import { AGENCY_CONFIG } from '../config/agency';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { sanitizeInput, isValidEmail, isValidPhone, checkRateLimit } from '../utils/security';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Website Inquiry',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Honeypot check
    if (honeypot) {
      console.warn('Bot injection detected in contact form.');
      return;
    }

    // Rate limiter
    const rateCheck = checkRateLimit('contact_form', 3);
    if (!rateCheck.allowed) {
      setError(`Too many requests. Please wait ${rateCheck.remainingSeconds}s before sending again.`);
      return;
    }

    const cleanName = sanitizeInput(formData.name);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanPhone = sanitizeInput(formData.phone);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setError('Please provide your name, a valid email address, and your message.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError('Please provide a valid email address format.');
      return;
    }

    if (cleanPhone && !isValidPhone(cleanPhone)) {
      setError('Please provide a valid phone number or leave blank.');
      return;
    }

    setFormData({
      ...formData,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
    });

    setSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/${AGENCY_CONFIG.contact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Hello Nexora Digital! My name is ${sanitizeInput(formData.name) || 'a visitor'} and I would like to inquire about your website design services.`
  )}`;

  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT STUDIO INQUIRIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Talk About Your <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Next Digital Evolution
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions about our website demos, timelines, or custom features? Reach out directly via our contact form or chat instantly on WhatsApp.
          </p>
        </div>

        {/* Contact Layout: Info cards on left, Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Priority Card */}
            <div className="bg-gradient-to-br from-emerald-950/40 to-[#12141F] rounded-3xl border border-emerald-500/30 p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">Direct WhatsApp Support</h3>
                  <span className="text-[11px] font-mono text-emerald-300">Fastest response channel</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our design leadership for quick questions, availability checks, or scope estimates.
              </p>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Now: {AGENCY_CONFIG.contact.displayPhone}</span>
              </a>
            </div>

            {/* Studio Details */}
            <div className="bg-[#12141F] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="font-display font-bold text-white text-base">Studio Contact Points</h3>

              <div className="space-y-4 text-xs">
                <a
                  href={`mailto:${AGENCY_CONFIG.contact.email}`}
                  className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-slate-500 uppercase font-mono">Email Us</span>
                    <span className="font-medium group-hover:text-indigo-300">{AGENCY_CONFIG.contact.email}</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-slate-500 uppercase font-mono">Direct Line</span>
                    <span className="font-medium">{AGENCY_CONFIG.contact.displayPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-slate-500 uppercase font-mono">Headquarters</span>
                    <span className="font-medium">{AGENCY_CONFIG.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <Clock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] text-slate-500 uppercase font-mono">Operating Hours</span>
                    <span className="font-medium">{AGENCY_CONFIG.contact.workingHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{AGENCY_CONFIG.contact.responseGuarantee}</span>
              </div>
            </div>

          </div>

          {/* Right: Direct Form */}
          <div className="lg:col-span-7 bg-[#12141F] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our senior lead will review your message and reply to <strong>{formData.email}</strong> within 24 business hours.
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Follow up on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Website Inquiry', message: '' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-400 pt-1">
                    Fill in your details below and we will get back to you promptly.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Anti-bot honeypot invisible to legitimate users */}
                <input
                  type="text"
                  name="user_verification_auth_token"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="General Website Inquiry">General Website Inquiry</option>
                      <option value="Bento Grid Demo Question">Bento Grid Demo Question</option>
                      <option value="Liquid Glass Architecture">Liquid Glass Architecture</option>
                      <option value="Neo-Brutalism E-Commerce Store">Neo-Brutalism E-Commerce Store</option>
                      <option value="Glassmorphism Fitness Platform">Glassmorphism Fitness Platform</option>
                      <option value="Custom Enterprise Scope">Custom Enterprise Scope</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    How Can We Help You? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand, goals, target audience, and any questions you have..."
                    className="w-full bg-[#181B2B] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-glow-primary transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
