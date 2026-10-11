import React from 'react';
import { Link } from 'react-router-dom';
import { AGENCY_CONFIG } from '../config/agency';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  MessageSquare,
  Zap,
  Info
} from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="bg-[#090A0F] text-slate-100 min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Predictable Investment. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Enterprise-Grade Execution.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose a foundation aligned with your growth stage. Every build receives custom design system tokens, clean type-safe code, and mobile performance optimization.
          </p>

          {/* Sample Pricing Notice (Section 11 Requirement) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-left max-w-xl mx-auto">
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              <strong>Sample Illustrative Rates:</strong> All figures shown below represent sample starting rates. Exact quotes depend on specific custom integration scopes.
            </span>
          </div>
        </div>

        {/* 3 Pricing Packages Grid (Section 11 Requirement) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {AGENCY_CONFIG.pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#181B30] to-[#111322] border-2 border-indigo-500/60 shadow-2xl shadow-indigo-500/10 scale-100 lg:-translate-y-2'
                  : 'bg-[#12141F] border border-white/10 shadow-xl'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-mono font-bold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {pkg.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-white">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-indigo-300 font-mono pt-1">
                    {pkg.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[3rem]">
                  {pkg.description}
                </p>

                {/* Price block */}
                <div className="py-4 border-y border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                      {pkg.priceSample}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / {pkg.billingPeriod}
                    </span>
                  </div>
                  <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Estimated Timeline: {pkg.timeline}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                    Included Capabilities:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 space-y-3">
                <Link
                  to={`/request?budget=${encodeURIComponent(pkg.priceSample)}&pkg=${pkg.id}`}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-400 hover:to-cyan-300 text-white shadow-glow-primary'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                  }`}
                >
                  <span>Request a Quote for {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <p className="text-[10px] text-center text-slate-500 font-mono">
                  Ideal for: {pkg.idealFor}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Commitment Statement (Section 11 Ethical Compliance) */}
        <div className="mt-16 bg-[#12141F] rounded-2xl border border-white/10 p-6 sm:p-8 max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-white font-display font-bold text-base">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span>Our Transparent Professional Philosophy</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            At Nexora Digital, we focus on engineering integrity. We do not make unrealistic claims such as "guaranteed #1 Google ranking in 7 days" or "10x sales guarantee overnight." Instead, we build clean semantic markup, fast-loading responsive assets, and intentional conversion funnels that give your business the best competitive advantage online.
          </p>
        </div>

        {/* Pricing FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-display font-bold text-white text-center">
            Frequently Asked Pricing Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How does the payment structure work?",
                a: "Typically 50% upon project kickoff and design system approval, and 50% upon final staging sign-off prior to production DNS deployment.",
              },
              {
                q: "Can I choose one of your 4 demo designs for my package?",
                a: "Yes! Any of the 4 demos (Bento Grid, Liquid Glass, Neo-Brutalism, or Glassmorphism) can be adapted as the baseline visual identity for your website at no extra charge.",
              },
              {
                q: "What if I need custom backend features like databases or auth?",
                a: "Our Premium package accommodates custom Python / FastAPI or serverless backends and database schemas. We provide a clear statement of work for specialized logic.",
              },
              {
                q: "Do you provide hosting and domain assistance?",
                a: "Yes, we help set up domain DNS records, automated SSL certificates, and lightning-fast global CDN deployments.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-[#12141F] border border-white/5 rounded-2xl p-5 space-y-2">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="text-indigo-400 font-mono">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <p className="text-xs text-slate-400 mb-3">Have a unique scope or custom inquiry?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
            >
              <span>Speak directly with our technical director</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
