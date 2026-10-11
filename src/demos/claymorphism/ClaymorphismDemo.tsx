import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  Sparkles, 
  Star, 
  Award, 
  Zap, 
  Volume2, 
  VolumeX, 
  Check, 
  ArrowRight, 
  Trophy, 
  Compass, 
  BookOpen, 
  Smile, 
  Play,
  RotateCcw
} from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
  category: string;
}

export const ClaymorphismDemo: React.FC = () => {
  const [level, setLevel] = useState(4);
  const [xp, setXp] = useState(680);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'logic' | 'design' | 'code'>('all');

  const [quests, setQuests] = useState<Quest[]>([
    { id: 'q1', title: 'Assemble 3D Clay Polyhedra', xp: 120, completed: true, category: 'design' },
    { id: 'q2', title: 'Solve Recursive Logic Puzzle', xp: 180, completed: true, category: 'logic' },
    { id: 'q3', title: 'Build Tactile Physics Engine', xp: 250, completed: false, category: 'code' },
    { id: 'q4', title: 'Gamified Micro-Animations Sprint', xp: 200, completed: false, category: 'design' },
  ]);

  const avatars = ['🚀', '🦊', '👾', '🎨', '⚡'];

  const completeQuest = (id: string, questXp: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: true } : q))
    );
    const newXp = xp + questXp;
    setXp(newXp);
    if (newXp >= 800 && level === 4) {
      setLevel(5);
      setRewardModalOpen(true);
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#818CF8', '#34D399', '#FB7185', '#FBBF24']
        });
      } catch (err) {}
    }
  };

  const resetProgress = () => {
    setLevel(4);
    setXp(680);
    setQuests([
      { id: 'q1', title: 'Assemble 3D Clay Polyhedra', xp: 120, completed: true, category: 'design' },
      { id: 'q2', title: 'Solve Recursive Logic Puzzle', xp: 180, completed: true, category: 'logic' },
      { id: 'q3', title: 'Build Tactile Physics Engine', xp: 250, completed: false, category: 'code' },
      { id: 'q4', title: 'Gamified Micro-Animations Sprint', xp: 200, completed: false, category: 'design' },
    ]);
  };

  const filteredQuests = activeTab === 'all' 
    ? quests 
    : quests.filter(q => q.category === activeTab);

  return (
    <DemoViewerShell
      demoId="claymorphism"
      demoTitle="Lumina // 3D PlayLab"
      category="EdTech & Gamified 3D Learning"
      styleBadge="Claymorphism Architecture"
    >
      <div className="min-h-screen bg-[#0C0E1A] text-slate-100 font-sans antialiased overflow-x-hidden pb-24 selection:bg-indigo-400 selection:text-white">
        
        {/* Ambient Playful Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-pink-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Sub-Header Brand Bar */}
        <div className="relative z-30 border-b border-indigo-500/20 bg-[#101326]/80 backdrop-blur-2xl px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-indigo-500 flex items-center justify-center text-lg shadow-md shrink-0 clay-btn">
              <span>{avatars[avatarIndex]}</span>
            </div>
            <div className="min-w-0">
              <span className="font-display font-black text-xs sm:text-sm tracking-wide text-white truncate block">
                LUMINA // PLAYLAB
              </span>
              <span className="text-[9px] sm:text-[10px] text-indigo-300 font-mono block -mt-0.5 truncate">
                3D Tactile Learning OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Level & XP Capsule */}
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-white">Lvl {level}</span>
              <span className="text-slate-400">({xp}/800 XP)</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors"
              title="Toggle tactile sound effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            <Link
              to="/request?style=claymorphism"
              className="px-3 sm:px-4 py-1.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] sm:text-xs font-bold clay-btn transition-all whitespace-nowrap"
            >
              Order Clay Style
            </Link>
          </div>
        </div>

        {/* Main Page Layout */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-12">
          
          {/* 3D Pillowy Hero Card */}
          <div className="clay-card p-6 sm:p-12 text-white relative overflow-hidden">
            <div className="max-w-2xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[11px] font-mono shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INFLATED 3D SOFT UI FOR EDTECH & CREATIVE APPS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight">
                Pillowy Surfaces. <br />
                <span className="text-amber-200">Irresistible Touch.</span>
              </h1>

              <p className="text-indigo-100 text-xs sm:text-base leading-relaxed max-w-xl">
                Elevate educational software, gamified learning platforms, and modern creative apps with rounded tactile clay physics that feel tangible on any screen.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => completeQuest('q3', 250)}
                  className="px-6 py-3 rounded-2xl bg-white text-indigo-900 font-extrabold text-xs sm:text-sm clay-btn flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current text-amber-500" />
                  <span>Claim Next Quest (+250 XP)</span>
                </button>

                <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-indigo-900/40 border border-white/20 text-xs font-mono">
                  <span>Switch Avatar:</span>
                  <div className="flex gap-1 ml-1">
                    {avatars.map((av, idx) => (
                      <button
                        key={av}
                        onClick={() => setAvatarIndex(idx)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-transform ${
                          avatarIndex === idx ? 'scale-125 bg-white/20 shadow-sm' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative 3D Clay Spheres */}
            <div className="hidden md:block absolute -right-6 -bottom-6 w-56 h-56 rounded-full bg-gradient-to-tr from-indigo-300 to-white/40 shadow-2xl opacity-40 blur-xs pointer-events-none" />
          </div>

          {/* Interactive Gamified Quest Hub */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Active Quest Sprint</span>
                </h2>
                <p className="text-xs text-slate-400">Complete interactive missions to unlock Level 5 mastery badge</p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {(['all', 'design', 'logic', 'code'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}

                <button
                  onClick={resetProgress}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 text-xs flex items-center gap-1 ml-1"
                  title="Reset demo progress"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden xs:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Quests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuests.map((q) => (
                <div
                  key={q.id}
                  className={`rounded-3xl p-5 border transition-all duration-300 flex items-center justify-between gap-4 ${
                    q.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-[#141728] border-white/10 hover:border-indigo-500/40 shadow-lg'
                  }`}
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                        q.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        {q.category}
                      </span>
                      <span className="text-xs text-amber-300 font-mono font-bold">+{q.xp} XP</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-white truncate">
                      {q.title}
                    </h4>
                  </div>

                  {q.completed ? (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      <span>Earned</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => completeQuest(q.id, q.xp)}
                      className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold text-xs clay-btn shrink-0"
                    >
                      Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3 Interactive Claymorphic Showcase Modules */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white">
              Tactile Component Showcase
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Lavender Squishy Module */}
              <div className="clay-card p-6 text-white space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl mb-3 shadow-inner">
                    🎨
                  </div>
                  <h4 className="text-lg font-bold">3D Visual Palette</h4>
                  <p className="text-xs text-indigo-100 leading-relaxed pt-1">
                    Warm inflated cards engineered with dual inner shadows and soft pastel illumination.
                  </p>
                </div>

                <div className="pt-2">
                  <div className="bg-white/10 rounded-2xl p-3 text-center font-mono text-xs font-bold">
                    Inner + Outer Shadow Physics
                  </div>
                </div>
              </div>

              {/* Card 2: Mint Interactive Counter */}
              <div className="clay-card-mint p-6 text-emerald-950 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-900/10 flex items-center justify-center text-xl mb-3 shadow-inner">
                    🌱
                  </div>
                  <h4 className="text-lg font-bold">Gamified Mastery</h4>
                  <p className="text-xs text-emerald-900 leading-relaxed pt-1">
                    Delightful bouncy buttons and cheerful feedback stimulate sustained student engagement.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between bg-emerald-900/10 p-2.5 rounded-2xl">
                  <span className="text-xs font-bold font-mono">Engagement Rate</span>
                  <span className="text-sm font-black font-mono">+84% Lift</span>
                </div>
              </div>

              {/* Card 3: Coral Tactile Rewards */}
              <div className="clay-card-coral p-6 text-white space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl mb-3 shadow-inner">
                    ⭐
                  </div>
                  <h4 className="text-lg font-bold">Reward Badges</h4>
                  <p className="text-xs text-rose-100 leading-relaxed pt-1">
                    Physical micro-interactions that trigger delightful tactile animations upon task completion.
                  </p>
                </div>

                <button
                  onClick={() => setRewardModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-white text-rose-950 font-black text-xs clay-btn text-center"
                >
                  Inspect Level Badge Modal
                </button>
              </div>

            </div>
          </div>

          {/* Pricing & Custom Commission Callout */}
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/40 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold">
                EdTech & Gamified Solutions
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Ready to build your product with Claymorphism?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We design and engineer bespoke 3D tactile educational platforms, children's mobile interfaces, and gamified apps that turn routine tasks into joy.
              </p>
            </div>

            <Link
              to="/request?style=claymorphism"
              className="px-6 py-3 rounded-full bg-white text-indigo-950 hover:bg-slate-200 font-extrabold text-xs sm:text-sm shadow-xl transition-all whitespace-nowrap clay-btn"
            >
              Request Claymorphic Build
            </Link>
          </div>

        </div>

        {/* Level Up Reward Modal */}
        {rewardModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="clay-card p-6 sm:p-8 max-w-md w-full text-white text-center space-y-4 relative shadow-2xl">
              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl mx-auto shadow-inner">
                🏆
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-200 font-bold">
                  MILESTONE ACHIEVED
                </span>
                <h3 className="text-2xl font-display font-black">
                  Level {level} Tactile Master!
                </h3>
                <p className="text-xs text-indigo-100 leading-relaxed max-w-xs mx-auto">
                  You successfully reached {xp} XP in the Claymorphic PlayLab! All interactive tokens and bouncy physics are active.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setRewardModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs"
                >
                  Continue Exploring
                </button>
                <Link
                  to="/request?style=claymorphism"
                  onClick={() => setRewardModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white text-indigo-900 font-black text-xs clay-btn"
                >
                  Order This Style
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </DemoViewerShell>
  );
};
