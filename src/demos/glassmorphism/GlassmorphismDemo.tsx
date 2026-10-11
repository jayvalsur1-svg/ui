import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  Activity, 
  Flame, 
  Heart, 
  Droplets, 
  Plus, 
  Check, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Zap, 
  Award, 
  Users, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { FitnessProgram } from '../../types';

export const GlassmorphismDemo: React.FC = () => {
  // Interactive Dashboard States
  const [waterGlasses, setWaterGlasses] = useState(5);
  const [activeStreakDay, setActiveStreakDay] = useState(4); // Thursday
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'HIIT' | 'Hypertrophy' | 'Mobility'>('ALL');
  const [selectedTrainer, setSelectedTrainer] = useState<any | null>(null);

  const programs: FitnessProgram[] = [
    {
      id: 'fp1',
      title: 'Hyper-Metabolic HIIT Matrix',
      category: 'HIIT',
      durationWeeks: 6,
      level: 'Intermediate',
      instructor: 'Coach Maya Thorne',
      caloriesBurnedAvg: 540,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
      highlight: 'High EPOC afterburn and cardiovascular vo2 max conditioning.',
    },
    {
      id: 'fp2',
      title: 'Structural Hypertrophy & Density',
      category: 'Hypertrophy',
      durationWeeks: 10,
      level: 'Advanced',
      instructor: 'David Vance, CSCS',
      caloriesBurnedAvg: 480,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
      highlight: 'Progressive overload periodization for lean muscular hypertrophy.',
    },
    {
      id: 'fp3',
      title: 'Spinal Mobility & Fascial Release',
      category: 'Mobility',
      durationWeeks: 4,
      level: 'Beginner',
      instructor: 'Dr. Selene Park, DPT',
      caloriesBurnedAvg: 260,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
      highlight: 'Joint de-compression, posture restoration, and functional flexibility.',
    },
    {
      id: 'fp4',
      title: 'Sprint Capacity & Athletic Power',
      category: 'HIIT',
      durationWeeks: 8,
      level: 'Advanced',
      instructor: 'Coach Maya Thorne',
      caloriesBurnedAvg: 620,
      image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80',
      highlight: 'Explosive plyometrics and fast-twitch nervous recruitment.',
    },
  ];

  const trainers = [
    {
      name: 'Maya Thorne',
      role: 'Head of High-Performance Conditioning',
      bio: 'Former Olympic track coach specializing in metabolic conditioning and biomechanical efficiency. 12+ years elite coaching experience.',
      credentials: 'MS Exercise Science, CSCS, USAW Level 2',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    },
    {
      name: 'David Vance',
      role: 'Strength & Periodization Specialist',
      bio: 'Published author in neuromuscular adaptation and progressive loading mechanics. Mentored 40+ professional athletes.',
      credentials: 'CSCS, FMS certified, NASM Master Trainer',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80',
    },
    {
      name: 'Dr. Selene Park',
      role: 'Director of Mobility & Physical Therapy',
      bio: 'Doctor of Physical Therapy focused on injury prevention, kinetic chain alignment, and restorative longevity protocols.',
      credentials: 'Doctor of Physical Therapy (DPT), OCS certified',
      image: 'https://images.unsplash.com/photo-1594824813593-54876b5d9282?w=400&q=80',
    },
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const filteredPrograms = selectedCategory === 'ALL'
    ? programs
    : programs.filter((p) => p.category === selectedCategory);

  return (
    <DemoViewerShell
      demoId="glassmorphism"
      demoTitle="PulseFit Wellness"
      category="Health, Longevity & Studio Fitness"
      styleBadge="Glassmorphism System"
    >
      <div className="relative min-h-screen bg-[#061214] text-slate-100 font-sans antialiased overflow-hidden pb-24">
        
        {/* Soft Ambient Mesh Gradients (Glassmorphic Backdrop) */}
        <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-[550px] h-[550px] bg-teal-500/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Demo Sub-Bar */}
        <div className="relative z-30 border-b border-emerald-500/20 bg-[#07191C]/70 backdrop-blur-2xl px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1px] shadow-lg shadow-emerald-500/20 shrink-0">
              <div className="w-full h-full bg-[#07191C] rounded-[11px] flex items-center justify-center">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
            <div className="min-w-0">
              <span className="font-display font-black text-xs sm:text-sm tracking-wide text-white truncate block">
                PULSEFIT // WELLNESS
              </span>
              <span className="text-[9px] sm:text-[10px] text-emerald-300 font-mono block -mt-0.5 truncate">
                Human Performance Lab
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline text-xs text-emerald-200/70">
              Frosted Glass Panels & Soft Gradients
            </span>
            <Link
              to="/request?style=glassmorphism"
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-[11px] sm:text-xs font-bold shadow-lg shadow-emerald-500/25 transition-all whitespace-nowrap"
            >
              Order Style
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10 sm:space-y-12">
          
          {/* Glass Hero Banner */}
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 relative overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-emerald-500/30 shadow-glass-card">
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-xs font-mono max-w-full">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">EVIDENCE-BASED METABOLIC RESTORATION</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight">
                Movement Engineered for <br />
                <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
                  Lifelong Vitality
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl">
                Transform your fitness studio or wellness practice with a soothing, frosted glass digital ecosystem that turns visitors into committed members.
              </p>

              <div className="pt-2 sm:pt-4 flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
                <a
                  href="#dashboard"
                  className="px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:opacity-95 text-center transition-all"
                >
                  Explore Interactive Member Lab
                </a>
                <Link
                  to="/request?style=glassmorphism"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm border border-white/20 text-center transition-colors"
                >
                  Commission This Website
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Progress Dashboard (Section 7 Requirement) */}
          <div id="dashboard" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>Member Daily Dashboard</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Interactive demonstration metrics • Test buttons below to update live stats
                </p>
              </div>

              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Live State Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Daily Streak Card */}
              <div className="rounded-2xl p-6 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-glass space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">Workout Streak</span>
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-black text-white">18</span>
                  <span className="text-xs text-slate-400 font-mono">consecutive days</span>
                </div>

                {/* Day selector pills */}
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1 pt-2">
                  {days.map((day, idx) => (
                    <button
                      key={day}
                      onClick={() => setActiveStreakDay(idx)}
                      className={`py-1.5 sm:py-2 px-0.5 rounded-lg sm:rounded-xl text-center font-mono text-[9px] sm:text-[10px] transition-all ${
                        activeStreakDay === idx
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/25'
                          : idx < activeStreakDay
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      <div>{day}</div>
                      <div className="mt-0.5 sm:mt-1 text-[7px] sm:text-[8px]">{idx <= activeStreakDay ? '✓' : '•'}</div>
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                  Weekly Goal: 5 / 5 sessions logged (100% on target)
                </div>
              </div>

              {/* Water & Hydration Tracker */}
              <div className="rounded-2xl p-6 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-glass space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider">Hydration Metric</span>
                  <Droplets className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-black text-white">{waterGlasses * 250}</span>
                  <span className="text-xs text-slate-400 font-mono">mL / 2,500 mL Target</span>
                </div>

                {/* Interactive Progress Bar */}
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((waterGlasses / 10) * 100, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-300 font-mono">{waterGlasses} of 10 glasses</span>
                  <button
                    onClick={() => setWaterGlasses((prev) => Math.min(prev + 1, 10))}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log 250mL</span>
                  </button>
                </div>
              </div>

              {/* Recovery & Heart Rate */}
              <div className="rounded-2xl p-6 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-glass space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">Recovery Score</span>
                  <Heart className="w-5 h-5 text-rose-400" />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-black text-emerald-400">94%</span>
                  <span className="text-xs text-emerald-300 font-mono">Optimal Ready State</span>
                </div>

                <div className="space-y-2 pt-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Resting Heart Rate</span>
                    <span className="text-white font-bold">52 BPM</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>HRV Balance</span>
                    <span className="text-white font-bold">78 ms</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Sleep Quality</span>
                    <span className="text-emerald-300 font-bold">8h 14m (Deep)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Fitness Programs Explorer */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Signature Performance Programs</h2>
                <p className="text-xs text-slate-400">Curated micro-cycles for strength, conditioning, and flexibility</p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {(['ALL', 'HIIT', 'Hypertrophy', 'Mobility'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Program Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 overflow-hidden shadow-glass flex flex-col justify-between group hover:border-emerald-400/40 transition-all"
                >
                  <div>
                    <div className="aspect-video relative overflow-hidden bg-slate-900">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-slate-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-300 border border-emerald-400/20">
                        {program.category}
                      </div>
                      <div className="absolute top-2 right-2 bg-slate-950/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-300">
                        {program.level}
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                        {program.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {program.highlight}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{program.durationWeeks} Weeks</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>~{program.caloriesBurnedAvg} kcal</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <Link
                      to="/request?style=glassmorphism"
                      className="w-full py-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 text-xs font-semibold border border-white/10 hover:border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>Enroll in Program</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master Instructors & Bio Cards */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">World-Class Master Faculty</h2>
              <p className="text-xs text-slate-400">Board-certified specialists in biomechanics, athletics, and longevity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainers.map((trainer) => (
                <div
                  key={trainer.name}
                  className="rounded-2xl p-5 bg-white/[0.04] backdrop-blur-xl border border-white/15 shadow-glass flex gap-4 items-start"
                >
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-white/20 shadow-md"
                  />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white font-display">{trainer.name}</h4>
                    <p className="text-xs text-emerald-300 font-mono">{trainer.role}</p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">{trainer.bio}</p>
                    <button
                      onClick={() => setSelectedTrainer(trainer)}
                      className="text-[11px] text-cyan-300 hover:underline pt-1 block"
                    >
                      View Credentials & Bio →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Pricing Section (Interactive Monthly / Annual Switch) */}
          <div className="rounded-3xl p-8 sm:p-12 bg-white/[0.04] backdrop-blur-2xl border border-emerald-500/30 shadow-2xl space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Transparent Memberships
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                Invest in Your Highest Vitality
              </h3>
              
              {/* Billing Cycle Switch */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/5 border border-white/15 p-1 rounded-full text-xs font-medium">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 sm:px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    billingCycle === 'annual'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="bg-emerald-300 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    SAVE 20%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              
              {/* Core Plan */}
              <div className="rounded-2xl p-6 bg-white/[0.04] backdrop-blur-xl border border-white/15 space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white font-display">Pulse Standard</h4>
                  <p className="text-xs text-slate-400">Complete access to digital studios and workout tracking.</p>
                </div>
                <div className="flex items-baseline gap-1 font-display">
                  <span className="text-3xl font-black text-white">
                    {billingCycle === 'annual' ? '$39' : '$49'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ month</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Unlimited on-demand workout library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Daily progress & hydration metric dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Community challenge leaderboard</span>
                  </li>
                </ul>
                <Link
                  to="/request?style=glassmorphism"
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 text-center block transition-all"
                >
                  Select Standard Tier
                </Link>
              </div>

              {/* Lab VIP Plan */}
              <div className="rounded-2xl p-6 bg-gradient-to-b from-emerald-500/20 to-teal-500/10 backdrop-blur-xl border-2 border-emerald-400/50 space-y-4 relative shadow-xl">
                <div className="absolute -top-3 right-6 bg-emerald-400 text-slate-950 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase">
                  Most Popular
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white font-display">Human Lab VIP</h4>
                  <p className="text-xs text-emerald-200">Personalized 1-on-1 coaching, biometrics and nutrition plans.</p>
                </div>
                <div className="flex items-baseline gap-1 font-display">
                  <span className="text-3xl font-black text-white">
                    {billingCycle === 'annual' ? '$79' : '$99'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">/ month</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Everything in Standard plus 1-on-1 coach check-ins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Custom metabolic macronutrient programming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Biometric wearable synchronization & recovery alerts</span>
                  </li>
                </ul>
                <Link
                  to="/request?style=glassmorphism"
                  className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs text-center block shadow-lg shadow-emerald-500/20 transition-all"
                >
                  Select VIP Tier
                </Link>
              </div>

            </div>
          </div>

          {/* Final Call to Action */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-teal-950/40 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-display font-black text-white">
                Ready to elevate your wellness or fitness brand with Glassmorphism?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                We craft custom glassmorphic dashboards, member booking portals, and interactive wellness platforms with proven conversion metrics.
              </p>
            </div>

            <Link
              to="/request?style=glassmorphism"
              className="px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-bold text-sm shadow-xl transition-all whitespace-nowrap"
            >
              Request Glassmorphic Website
            </Link>
          </div>

        </div>

        {/* Trainer Detail Modal */}
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="rounded-3xl p-6 sm:p-8 bg-[#0B1E21] border border-emerald-500/40 max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex gap-4 items-center">
                <img
                  src={selectedTrainer.image}
                  alt={selectedTrainer.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/30"
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">{selectedTrainer.name}</h3>
                  <p className="text-xs text-emerald-300 font-mono">{selectedTrainer.role}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
                <div className="text-slate-300 leading-relaxed">{selectedTrainer.bio}</div>
                <div className="pt-2 border-t border-white/10 font-mono text-emerald-300">
                  Credentials: {selectedTrainer.credentials}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  Close
                </button>
                <Link
                  to="/request?style=glassmorphism"
                  onClick={() => setSelectedTrainer(null)}
                  className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </DemoViewerShell>
  );
};
