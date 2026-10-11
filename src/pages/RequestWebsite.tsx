import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { AGENCY_CONFIG, buildWhatsAppUrl } from '../config/agency';
import { WebsiteRequestFormData } from '../types';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  ShieldAlert
} from 'lucide-react';
import { sanitizeInput, isValidEmail, isValidPhone, checkRateLimit } from '../utils/security';

export const RequestWebsite: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStyleParam = searchParams.get('style') || '';
  const [honeypot, setHoneypot] = useState('');
  const [rateLimitError, setRateLimitError] = useState('');

  // Match style id or name
  const getInitialStyle = (param: string) => {
    if (param.includes('bento')) return 'Bento Grid System';
    if (param.includes('liquid')) return 'Liquid Glass Architecture';
    if (param.includes('brutal')) return 'Neo-Brutalism Design';
    if (param.includes('glass')) return 'Glassmorphism System';
    if (param.includes('clay')) return 'Claymorphism (3D Soft UI)';
    if (param.includes('neu')) return 'Neumorphism (Tactile Extrusion)';
    if (param.includes('skeuo')) return 'Skeuomorphism (Physical Realism)';
    if (param.includes('saas') || param.includes('dashboard')) return 'SaaS Analytics Dashboard';
    if (param.includes('social')) return 'Social Profile & Community';
    if (param.includes('fintech') || param.includes('wallet')) return 'FinTech Digital Wallet';
    return 'Bespoke / Custom Architecture';
  };

  const [formData, setFormData] = useState<WebsiteRequestFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    businessCategory: 'Restaurants & Cafes',
    preferredDesignStyle: getInitialStyle(initialStyleParam),
    requiredPages: ['Homepage', 'About / Story', 'Services / Catalog', 'Contact'],
    requiredFeatures: ['Responsive Mobile Layout', 'WhatsApp Direct Integration', 'SEO Fundamentals'],
    budgetRange: '$2,500 – $5,000',
    expectedDeadline: '2 – 3 Weeks',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof WebsiteRequestFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    const pkg = searchParams.get('pkg');
    const budget = searchParams.get('budget');
    setFormData((prev) => {
      const updated = { ...prev };
      if (initialStyleParam) {
        updated.preferredDesignStyle = getInitialStyle(initialStyleParam);
      }
      if (pkg === 'starter' || (budget && budget.includes('1,450'))) {
        updated.budgetRange = '$1,000 – $2,500 (Starter Scope)';
      } else if (pkg === 'growth' || (budget && budget.includes('2,950'))) {
        updated.budgetRange = '$2,500 – $5,000 (Growth Scope)';
      } else if (pkg === 'premium' || (budget && budget.includes('4,850'))) {
        updated.budgetRange = '$5,000 – $10,000+ (Custom Enterprise)';
      }
      return updated;
    });
  }, [searchParams, initialStyleParam]);

  const pageOptions = [
    'Homepage',
    'About / Story',
    'Services / Catalog',
    'Online Store / Products',
    'Interactive Demos',
    'Pricing Tables',
    'Client Reviews / Case Studies',
    'Blog / Articles',
    'Contact & Booking',
  ];

  const featureOptions = [
    'Responsive Mobile Layout',
    'WhatsApp Direct Integration',
    'SEO Fundamentals',
    'Interactive Demos & Animations',
    'Shopping Cart & Checkout',
    'Lead Capture & Form Validation',
    'Booking / Scheduling Widget',
    'Dark / Light Mode Toggle',
    'Analytics & Event Tracking',
  ];

  const budgetOptions = [
    '$1,000 – $2,500 (Starter Scope)',
    '$2,500 – $5,000 (Growth Scope)',
    '$5,000 – $10,000+ (Custom Enterprise)',
    'Flexible / Seeking Consultation',
  ];

  const deadlineOptions = [
    'Urgent (Under 10 Days)',
    '2 – 3 Weeks',
    '1 Month',
    'Flexible / Milestone Driven',
  ];

  const togglePage = (page: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredPages: prev.requiredPages.includes(page)
        ? prev.requiredPages.filter((p) => p !== page)
        : [...prev.requiredPages, page],
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredFeatures: prev.requiredFeatures.includes(feature)
        ? prev.requiredFeatures.filter((f) => f !== feature)
        : [...prev.requiredFeatures, feature],
    }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof WebsiteRequestFormData, string>> = {};
    const sanitizedName = sanitizeInput(formData.fullName);
    const sanitizedBusiness = sanitizeInput(formData.businessName);
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedPhone = sanitizeInput(formData.phone);

    if (!sanitizedName) errs.fullName = 'Full name is required';
    if (!sanitizedBusiness) errs.businessName = 'Business or project name is required';
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      errs.email = 'Valid corporate or personal email address is required';
    }
    if (!sanitizedPhone || !isValidPhone(sanitizedPhone)) {
      errs.phone = 'Valid phone number with country/area code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError('');

    // Anti-bot trap: If bot populated hidden honeypot input, discard silently
    if (honeypot) {
      console.warn('Bot injection detected and discarded.');
      return;
    }

    // Rate limiter: Prevent rapid form bombing attacks
    const rateCheck = checkRateLimit('request_quote_form', 3);
    if (!rateCheck.allowed) {
      setRateLimitError(`Anti-abuse protection active. Please wait ${rateCheck.remainingSeconds}s before resubmitting.`);
      return;
    }

    if (!validate()) return;

    // Sanitize in state
    setFormData((prev) => ({
      ...prev,
      fullName: sanitizeInput(prev.fullName),
      businessName: sanitizeInput(prev.businessName),
      email: sanitizeInput(prev.email),
      phone: sanitizeInput(prev.phone),
      additionalRequirements: sanitizeInput(prev.additionalRequirements),
    }));

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    setSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Formatted project summary text for clipboard
  const generateSummaryText = () => {
    return `=== NEXORA DIGITAL - CUSTOM WEBSITE BRIEF ===
Client Name: ${formData.fullName}
Business: ${formData.businessName}
Category: ${formData.businessCategory}
Email: ${formData.email}
Phone: ${formData.phone}
Preferred Design: ${formData.preferredDesignStyle}
Pages Required (${formData.requiredPages.length}): ${formData.requiredPages.join(', ')}
Key Features (${formData.requiredFeatures.length}): ${formData.requiredFeatures.join(', ')}
Budget Range: ${formData.budgetRange}
Deadline Target: ${formData.expectedDeadline}
Additional Notes: ${formData.additionalRequirements || 'None'}
=============================================`;
  };

  const copyRequirementsToClipboard = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const whatsAppUrl = buildWhatsAppUrl({
    fullName: formData.fullName,
    businessName: formData.businessName,
    selectedDesign: formData.preferredDesignStyle,
    requestedFeatures: formData.requiredFeatures,
    budgetRange: formData.budgetRange,
  });

  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen pt-24 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 pb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT CLIENT CONVERSION PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Commission Your Custom <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">Digital Presence</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Tell us about your business, select your favorite design demo architecture, and let's craft a website that builds trust and delivers conversions.
          </p>
        </div>

        {/* Success Confirmation State (Honest & Transparent as required in Section 10) */}
        {submitted ? (
          <div className="max-w-3xl mx-auto bg-[#12141F] rounded-3xl border border-indigo-500/40 p-8 sm:p-12 shadow-2xl space-y-8 animate-fadeIn">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
                Project Brief Packaged Successfully!
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your custom requirements for <strong>{formData.businessName}</strong> are formatted and ready for our senior design leads.
              </p>
            </div>

            {/* Direct Instant Channels */}
            <div className="p-6 rounded-2xl bg-[#181B2B] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Immediate Next Step: Dispatch Via WhatsApp</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Click below to immediately initiate a WhatsApp conversation with our studio. Your project scope, preferred design style, and budget will automatically pre-populate in your chat window.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Brief to WhatsApp ({AGENCY_CONFIG.contact.displayPhone})</span>
                </a>

                <button
                  onClick={copyRequirementsToClipboard}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSummary ? 'Copied to Clipboard!' : 'Copy Brief Details'}</span>
                </button>
              </div>
            </div>

            {/* Formatted Project Summary Receipt */}
            <div className="rounded-2xl bg-[#090A0F] p-6 border border-white/5 space-y-3 font-mono text-xs">
              <div className="text-indigo-400 font-bold uppercase tracking-wider">
                Confirmed Specifications:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>• Style: <span className="text-white font-semibold">{formData.preferredDesignStyle}</span></div>
                <div>• Category: <span className="text-white">{formData.businessCategory}</span></div>
                <div>• Budget: <span className="text-cyan-300 font-bold">{formData.budgetRange}</span></div>
                <div>• Target: <span className="text-white">{formData.expectedDeadline}</span></div>
                <div className="sm:col-span-2">
                  • Pages ({formData.requiredPages.length}): <span className="text-slate-400">{formData.requiredPages.join(', ')}</span>
                </div>
                <div className="sm:col-span-2">
                  • Features ({formData.requiredFeatures.length}): <span className="text-slate-400">{formData.requiredFeatures.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-400 hover:text-white underline font-mono"
              >
                ← Edit requirements or submit another inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Two Column Layout: Comprehensive Form on Left, Live Summary on Right */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-[#12141F] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                {rateLimitError && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{rateLimitError}</span>
                  </div>
                )}

                {/* Anti-bot honeypot invisible to legitimate users */}
                <input
                  type="text"
                  name="system_verification_token"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  aria-hidden="true"
                />
                
                {/* Section A: Contact Essentials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-bold text-white border-b border-white/10 pb-2">
                    1. Client & Business Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full bg-[#181B2B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 ${
                          errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-white/10 focus:ring-indigo-500'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Business or Brand Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Apex Performance Labs"
                        className={`w-full bg-[#181B2B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 ${
                          errors.businessName ? 'border-rose-500 focus:ring-rose-500' : 'border-white/10 focus:ring-indigo-500'
                        }`}
                      />
                      {errors.businessName && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@apexperformance.com"
                        className={`w-full bg-[#181B2B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 ${
                          errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-white/10 focus:ring-indigo-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone Number (WhatsApp Ready) *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full bg-[#181B2B] border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 ${
                          errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-white/10 focus:ring-indigo-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Business Category
                      </label>
                      <select
                        value={formData.businessCategory}
                        onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                        className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {AGENCY_CONFIG.targetIndustries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section B: Design Style Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-bold text-white border-b border-white/10 pb-2">
                    2. Preferred Visual Architecture Style
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Bento Grid System',
                      'Liquid Glass Architecture',
                      'Neo-Brutalism Design',
                      'Glassmorphism System',
                      'Claymorphism (3D Soft UI)',
                      'Neumorphism (Tactile Extrusion)',
                      'Skeuomorphism (Physical Realism)',
                      'SaaS Analytics Dashboard',
                      'Social Profile & Community',
                      'FinTech Digital Wallet',
                      'Bespoke / Custom Architecture',
                    ].map((style) => (
                      <div
                        key={style}
                        onClick={() => setFormData({ ...formData, preferredDesignStyle: style })}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          formData.preferredDesignStyle === style
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                            : 'bg-[#181B2B] border-white/5 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span className="text-xs font-semibold">{style}</span>
                        {formData.preferredDesignStyle === style && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section C: Pages Required */}
                <div className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-white border-b border-white/10 pb-2">
                    3. Required Pages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pageOptions.map((page) => {
                      const selected = formData.requiredPages.includes(page);
                      return (
                        <button
                          type="button"
                          key={page}
                          onClick={() => togglePage(page)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            selected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-[#181B2B] text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {page}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section D: Key Features */}
                <div className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-white border-b border-white/10 pb-2">
                    4. Required Interactive Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {featureOptions.map((feat) => {
                      const selected = formData.requiredFeatures.includes(feat);
                      return (
                        <button
                          type="button"
                          key={feat}
                          onClick={() => toggleFeature(feat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            selected
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'bg-[#181B2B] text-slate-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '}
                          {feat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section E: Budget & Timeline */}
                <div className="space-y-4">
                  <h3 className="text-lg font-display font-bold text-white border-b border-white/10 pb-2">
                    5. Budget & Timeline Targets
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Target Launch Deadline
                      </label>
                      <select
                        value={formData.expectedDeadline}
                        onChange={(e) => setFormData({ ...formData, expectedDeadline: e.target.value })}
                        className="w-full bg-[#181B2B] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {deadlineOptions.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Additional Requirements, Competitor References, or Goals
                      </label>
                      <textarea
                        rows={3}
                        value={formData.additionalRequirements}
                        onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                        placeholder="Share any specific websites you like, branding guidelines, target audience nuances, or technical integrations..."
                        className="w-full bg-[#181B2B] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm shadow-glow-primary transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Review & Finalize Project Brief</span>
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Direct WhatsApp Chat</span>
                  </a>
                </div>

              </form>
            </div>

            {/* Live Interactive Project Summary Card (Section 10 Requirement) */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="bg-[#12141F] rounded-3xl border border-white/10 p-6 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="font-display font-bold text-sm text-white">Live Scope Summary</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Auto-Updates
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Client / Entity:</span>
                    <span className="text-white font-semibold">
                      {formData.fullName || '—'} {formData.businessName ? `(${formData.businessName})` : ''}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Selected Architecture:</span>
                    <span className="text-indigo-300 font-semibold font-mono">
                      {formData.preferredDesignStyle}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Target Industry:</span>
                    <span className="text-slate-200">
                      {formData.businessCategory}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Selected Pages ({formData.requiredPages.length}):</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {formData.requiredPages.slice(0, 4).map((p) => (
                        <span key={p} className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-300 border border-white/5">
                          {p}
                        </span>
                      ))}
                      {formData.requiredPages.length > 4 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/5 rounded text-slate-400">
                          +{formData.requiredPages.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Budget Target:</span>
                      <span className="text-emerald-400 font-bold font-mono">{formData.budgetRange.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Timeline:</span>
                      <span className="text-cyan-300 font-semibold font-mono">{formData.expectedDeadline}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Includes 14–30 day post-launch hypercare</span>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-white block">Prefer Instant Messaging?</span>
                  <p className="text-emerald-200/80 leading-relaxed">
                    Message us directly on WhatsApp at <strong>{AGENCY_CONFIG.contact.displayPhone}</strong> for priority scheduling.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
