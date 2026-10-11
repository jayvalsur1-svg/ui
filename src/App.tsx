import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Dynamic Code-Splitting: Lazy load all routes to maximize scalability & reduce initial payload
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const ExploreDesigns = lazy(() => import('./pages/ExploreDesigns').then(m => ({ default: m.ExploreDesigns })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const RequestWebsite = lazy(() => import('./pages/RequestWebsite').then(m => ({ default: m.RequestWebsite })));

// Lazy-loaded Demos
const BentoGridDemo = lazy(() => import('./demos/bento-grid/BentoGridDemo').then(m => ({ default: m.BentoGridDemo })));
const LiquidGlassDemo = lazy(() => import('./demos/liquid-glass/LiquidGlassDemo').then(m => ({ default: m.LiquidGlassDemo })));
const BrutalismDemo = lazy(() => import('./demos/brutalism/BrutalismDemo').then(m => ({ default: m.BrutalismDemo })));
const GlassmorphismDemo = lazy(() => import('./demos/glassmorphism/GlassmorphismDemo').then(m => ({ default: m.GlassmorphismDemo })));
const ClaymorphismDemo = lazy(() => import('./demos/claymorphism/ClaymorphismDemo').then(m => ({ default: m.ClaymorphismDemo })));
const NeumorphismDemo = lazy(() => import('./demos/neumorphism/NeumorphismDemo').then(m => ({ default: m.NeumorphismDemo })));
const SkeuomorphismDemo = lazy(() => import('./demos/skeuomorphism/SkeuomorphismDemo').then(m => ({ default: m.SkeuomorphismDemo })));
const SaasDashboardDemo = lazy(() => import('./demos/saas-dashboard/SaasDashboardDemo').then(m => ({ default: m.SaasDashboardDemo })));
const SocialDemo = lazy(() => import('./demos/social/SocialDemo').then(m => ({ default: m.SocialDemo })));
const FintechWalletDemo = lazy(() => import('./demos/fintech-wallet/FintechWalletDemo').then(m => ({ default: m.FintechWalletDemo })));

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Minimal, elegant route fallback loader
function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
      <span className="text-xs font-mono text-slate-400">Loading experience...</span>
    </div>
  );
}

// Layout wrapper for standard agency pages
function AgencyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#090A0F]">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            {/* Main Agency Pages with Standard Global Navigation & Footer */}
            <Route path="/" element={<AgencyLayout><Home /></AgencyLayout>} />
            <Route path="/explore" element={<AgencyLayout><ExploreDesigns /></AgencyLayout>} />
            <Route path="/services" element={<AgencyLayout><Services /></AgencyLayout>} />
            <Route path="/pricing" element={<AgencyLayout><Pricing /></AgencyLayout>} />
            <Route path="/about" element={<AgencyLayout><About /></AgencyLayout>} />
            <Route path="/contact" element={<AgencyLayout><Contact /></AgencyLayout>} />
            <Route path="/request" element={<AgencyLayout><RequestWebsite /></AgencyLayout>} />

            {/* 10 Dedicated Navigable Demo Websites & Product UIs */}
            <Route path="/demos/bento-grid" element={<BentoGridDemo />} />
            <Route path="/demos/liquid-glass" element={<LiquidGlassDemo />} />
            <Route path="/demos/brutalism" element={<BrutalismDemo />} />
            <Route path="/demos/glassmorphism" element={<GlassmorphismDemo />} />
            <Route path="/demos/claymorphism" element={<ClaymorphismDemo />} />
            <Route path="/demos/neumorphism" element={<NeumorphismDemo />} />
            <Route path="/demos/skeuomorphism" element={<SkeuomorphismDemo />} />
            <Route path="/demos/saas-dashboard" element={<SaasDashboardDemo />} />
            <Route path="/demos/social" element={<SocialDemo />} />
            <Route path="/demos/fintech-wallet" element={<FintechWalletDemo />} />

            {/* Fallback route */}
            <Route path="*" element={<AgencyLayout><Home /></AgencyLayout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
