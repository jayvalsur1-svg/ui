import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  Sparkles, 
  Share2, 
  Check 
} from 'lucide-react';

interface DemoViewerShellProps {
  demoId: string;
  demoTitle: string;
  category: string;
  styleBadge: string;
  children: React.ReactNode;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const DemoViewerShell: React.FC<DemoViewerShellProps> = ({
  demoId,
  demoTitle,
  category,
  styleBadge,
  children,
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullScreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080D] flex flex-col font-sans">
      
      {/* Top Demo Toolbar: Sleek Single Row on Mobile, Full Simulator on Desktop */}
      <header className="sticky top-0 z-50 bg-[#0C0E17]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2 sm:py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Back Link & Demo Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors shrink-0"
              title="Back to showroom"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Showroom</span>
            </Link>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block shrink-0" />

            <div className="min-w-0 flex items-center gap-1.5 sm:gap-2">
              <span className="font-display font-bold text-white text-xs sm:text-sm truncate">
                {demoTitle}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                {styleBadge}
              </span>
            </div>
          </div>

          {/* Center: Device Viewport Controls (Shown on Desktop/Tablet screens where simulation is needed) */}
          <div className="hidden md:flex items-center justify-center bg-[#141724] border border-white/10 rounded-lg p-0.5 shadow-inner">
            <button
              onClick={() => setViewport('desktop')}
              className={`flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewport === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (100% width)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setViewport('tablet')}
              className={`flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewport === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (768px width)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>

            <button
              onClick={() => setViewport('mobile')}
              className={`flex items-center justify-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                viewport === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (390px width)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Right Actions: Share, Fullscreen & Request CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors"
              title="Copy link to this demo"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={toggleFullScreen}
              className="hidden md:inline-flex p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <Link
              to={`/request?style=${encodeURIComponent(demoId)}`}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-[11px] sm:text-xs shadow-glow-primary transition-all active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-200" />
              <span className="hidden xs:inline">Request Similar</span>
              <span className="xs:hidden">Request</span>
            </Link>
          </div>

        </div>
      </header>

      {/* Main Demo Viewport Container */}
      <main className="flex-1 flex justify-center items-start w-full bg-[#05060A] overflow-x-hidden">
        
        {/* If user is on an actual mobile device (<768px), ALWAYS render native edge-to-edge 100% layout */}
        {(isMobileScreen || viewport === 'desktop') && (
          <div className="w-full min-h-screen">
            {children}
          </div>
        )}

        {!isMobileScreen && viewport === 'tablet' && (
          <div className="py-4 sm:py-8 px-2 sm:px-4 w-full flex justify-center overflow-x-hidden">
            <div className="w-[768px] max-w-[96vw] bg-slate-900 rounded-[28px] sm:rounded-[36px] p-2 sm:p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10">
              <div className="h-5 sm:h-6 w-full flex items-center justify-between px-4 sm:px-6 text-slate-500 text-[9px] sm:text-[10px] font-mono select-none">
                <span>9:41</span>
                <div className="w-12 sm:w-16 h-1.5 bg-slate-700 rounded-full mx-auto" />
                <span>100% 🔋</span>
              </div>
              <div className="rounded-[20px] sm:rounded-[26px] overflow-hidden bg-[#090A0F] max-h-[82vh] overflow-y-auto relative [transform:translate3d(0,0,0)] isolate">
                {children}
              </div>
            </div>
          </div>
        )}

        {!isMobileScreen && viewport === 'mobile' && (
          <div className="py-4 sm:py-8 px-2 sm:px-4 w-full flex justify-center overflow-x-hidden">
            <div className="w-[390px] max-w-[94vw] bg-slate-900 rounded-[38px] sm:rounded-[44px] p-2 sm:p-2.5 shadow-2xl border-4 border-slate-700 ring-1 ring-white/10">
              <div className="h-6 sm:h-7 w-full flex items-center justify-between px-4 sm:px-6 text-slate-500 text-[9px] sm:text-[10px] font-mono select-none">
                <span>9:41</span>
                <div className="w-20 sm:w-24 h-3.5 sm:h-4 bg-black rounded-full mx-auto flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                <span>5G 🔋</span>
              </div>
              <div className="rounded-[28px] sm:rounded-[34px] overflow-hidden bg-[#090A0F] max-h-[80vh] overflow-y-auto relative [transform:translate3d(0,0,0)] isolate">
                {children}
              </div>
              <div className="h-3 sm:h-4 w-full flex items-center justify-center pt-1.5 sm:pt-2">
                <div className="w-24 sm:w-32 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
