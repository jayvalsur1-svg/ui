import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  Sliders, 
  Power, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Radio, 
  Flame, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Disc,
  Activity,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface MasteringPreset {
  id: string;
  name: string;
  drive: number;
  gain: number;
  warmth: number;
  air: number;
  mode: 'triode' | 'pentode' | 'transformer' | 'tape';
  ceiling: number;
}

const PRESETS: MasteringPreset[] = [
  { id: 'vinyl', name: 'Warm Vinyl Master', drive: 42, gain: 2.5, warmth: 65, air: 48, mode: 'tape', ceiling: -0.3 },
  { id: 'tape_punch', name: 'Punchy Drum Bus', drive: 68, gain: 4.0, warmth: 78, air: 35, mode: 'transformer', ceiling: -0.1 },
  { id: 'tube_glow', name: 'Acoustic Air & Tube Glow', drive: 30, gain: 1.0, warmth: 40, air: 85, mode: 'triode', ceiling: -0.5 },
  { id: 'hot_clip', name: 'Aggressive Pentode Clip', drive: 88, gain: 6.5, warmth: 55, air: 70, mode: 'pentode', ceiling: 0.0 },
];

export const SkeuomorphismDemo: React.FC = () => {
  // Physical Machine States
  const [powerOn, setPowerOn] = useState(true);
  const [bypass, setBypass] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedMode, setSelectedMode] = useState<'triode' | 'pentode' | 'transformer' | 'tape'>('tape');
  
  // Rotary Potentiometer Knob States
  const [tubeDrive, setTubeDrive] = useState(42); // 0 to 100%
  const [inputGain, setInputGain] = useState(2.5); // -12 to +18 dB
  const [warmth, setWarmth] = useState(65); // 0 to 100%
  const [air, setAir] = useState(48); // 0 to 100%
  const [ceiling, setCeiling] = useState(-0.3); // -18 to 0 dB

  // Dynamic VU Meter Needle Angles (-45deg to +45deg)
  const [leftVuAngle, setLeftVuAngle] = useState(-38);
  const [rightVuAngle, setRightVuAngle] = useState(-38);
  const [isClipping, setIsClipping] = useState(false);

  // Active Preset Tracker
  const [activePreset, setActivePreset] = useState<string>('vinyl');

  // Animation Frame Loop for VU Ballistics
  const animRef = useRef<number | null>(null);
  const ballisticsRef = useRef({ leftTarget: -38, rightTarget: -38, leftCurrent: -38, rightCurrent: -38 });

  useEffect(() => {
    let phase = 0;

    const updatePhysics = () => {
      if (!powerOn || bypass) {
        // Power off or bypassed: needles drop to rest position
        ballisticsRef.current.leftTarget = -44;
        ballisticsRef.current.rightTarget = -44;
      } else if (isPlaying) {
        phase += 0.08;
        // Drive & gain amplify needle excursion
        const driveBonus = (tubeDrive / 100) * 18;
        const gainBonus = inputGain * 2.2;
        
        // Dynamic music dynamics simulation with sub-bass pulses and transients
        const beatPulse = Math.pow(Math.max(0, Math.sin(phase * 1.5)), 3) * 22;
        const chatterL = (Math.sin(phase * 4.2) + Math.cos(phase * 2.8)) * 8;
        const chatterR = (Math.sin(phase * 3.7) + Math.cos(phase * 3.1)) * 8;

        const targetL = -20 + driveBonus + gainBonus + beatPulse + chatterL;
        const targetR = -20 + driveBonus + gainBonus + beatPulse + chatterR;

        // Clamp between -45 (silence) and +42 (hard peg)
        ballisticsRef.current.leftTarget = Math.min(42, Math.max(-45, targetL));
        ballisticsRef.current.rightTarget = Math.min(42, Math.max(-45, targetR));
      } else {
        // Idle ambient line noise when powered on but stopped
        ballisticsRef.current.leftTarget = -36 + Math.sin(Date.now() / 200) * 2;
        ballisticsRef.current.rightTarget = -36 + Math.cos(Date.now() / 200) * 2;
      }

      // Ballistic inertia (300ms analog damping)
      const smoothingAttack = 0.22;
      const smoothingDecay = 0.08;
      
      const rateL = ballisticsRef.current.leftTarget > ballisticsRef.current.leftCurrent ? smoothingAttack : smoothingDecay;
      const rateR = ballisticsRef.current.rightTarget > ballisticsRef.current.rightCurrent ? smoothingAttack : smoothingDecay;

      ballisticsRef.current.leftCurrent += (ballisticsRef.current.leftTarget - ballisticsRef.current.leftCurrent) * rateL;
      ballisticsRef.current.rightCurrent += (ballisticsRef.current.rightTarget - ballisticsRef.current.rightCurrent) * rateR;

      setLeftVuAngle(ballisticsRef.current.leftCurrent);
      setRightVuAngle(ballisticsRef.current.rightCurrent);
      setIsClipping(ballisticsRef.current.leftCurrent > 28 || ballisticsRef.current.rightCurrent > 28);

      animRef.current = requestAnimationFrame(updatePhysics);
    };

    animRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [powerOn, bypass, isPlaying, tubeDrive, inputGain]);

  // Apply mastering preset
  const applyPreset = (preset: MasteringPreset) => {
    setActivePreset(preset.id);
    setTubeDrive(preset.drive);
    setInputGain(preset.gain);
    setWarmth(preset.warmth);
    setAir(preset.air);
    setSelectedMode(preset.mode);
    setCeiling(preset.ceiling);
  };

  // Convert normalized knob values (0-100) to rotation angle (-135deg to +135deg)
  const calcKnobAngle = (val: number, min: number, max: number) => {
    const fraction = (val - min) / (max - min);
    return -135 + fraction * 270;
  };

  return (
    <DemoViewerShell
      demoId="skeuomorphism"
      demoTitle="Valve 1976 // Studio Mastering"
      category="Pro Audio Hardware & Mastering Suite"
      styleBadge="Skeuomorphism Physical Realism"
    >
      <div className="min-h-screen bg-[#101114] text-slate-200 font-sans antialiased overflow-x-hidden pb-24 selection:bg-amber-600 selection:text-white">
        
        {/* Vintage Studio Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

        {/* Studio Console Navigation Bar */}
        <div className="relative z-30 border-b border-black/80 bg-gradient-to-r from-[#1c1d22] via-[#24262c] to-[#1c1d22] px-3 sm:px-8 py-2.5 sm:py-3.5 shadow-2xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#3a3c44] to-[#18191c] border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-amber-200 uppercase truncate">
                  VALVE 1976 // MK-IV
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-amber-400">
                  CLASS-A TUBE RACK
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 truncate">Analog Mastering Console & Transformer Harmonic Suite</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Play / Pause stem audition */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-2.5 sm:px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 border transition-all ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Master Stem Playing' : 'Audition Stem'}</span>
            </button>

            <Link
              to="/request?style=skeuomorphism"
              className="px-3 py-1.5 rounded bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1 transition-all"
            >
              <Sparkles className="w-3 h-3 text-black" />
              <span className="hidden xs:inline">Order Hardware UI</span>
              <ArrowRight className="w-3 h-3 text-black" />
            </Link>
          </div>
        </div>

        {/* Main 19-Inch 4U Rack Unit Chassis */}
        <div className="max-w-6xl mx-auto px-2 sm:px-6 pt-6 sm:pt-10">
          
          {/* Rack Cabinet Enclosure with Wood/Anodized Bezel */}
          <div className="rounded-2xl p-2 sm:p-4 bg-gradient-to-b from-[#2a1a12] via-[#1a110c] to-[#0d0906] border-4 border-[#3e271a] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_0_2px_#1c1008] relative">
            
            {/* Brushed Gunmetal 19-inch Faceplate */}
            <div className="skeuo-metal rounded-xl border-2 border-[#4b4e54] p-3 sm:p-7 relative overflow-hidden">
              
              {/* Vertical Brushed Anodized Metal Texture Stripes */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                }}
              />

              {/* 4 Rack Corner Hex Screws */}
              <div className="absolute top-3 left-3 w-4 h-4 rounded-full skeuo-screw flex items-center justify-center">
                <div className="w-2.5 h-[1.5px] bg-[#1a1b1e] rotate-45" />
              </div>
              <div className="absolute top-3 right-3 w-4 h-4 rounded-full skeuo-screw flex items-center justify-center">
                <div className="w-2.5 h-[1.5px] bg-[#1a1b1e] -rotate-45" />
              </div>
              <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full skeuo-screw flex items-center justify-center">
                <div className="w-2.5 h-[1.5px] bg-[#1a1b1e] rotate-12" />
              </div>
              <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full skeuo-screw flex items-center justify-center">
                <div className="w-2.5 h-[1.5px] bg-[#1a1b1e] -rotate-30" />
              </div>

              {/* Top Faceplate Header Stamp */}
              <div className="relative z-10 flex flex-wrap items-center justify-between pb-6 border-b border-black/60 shadow-[0_1px_0_rgba(255,255,255,0.1)] gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                  <div>
                    <h1 className="font-mono text-base sm:text-xl font-black tracking-widest text-[#d8dadf] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      VALVE 1976 MASTERING PROCESSOR
                    </h1>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                      DUAL VACUUM TUBE & TRANSFORMER SATURATOR // SERIAL #76-88914
                    </span>
                  </div>
                </div>

                {/* Machine Status Lights & Jeweled Pilot Lamp */}
                <div className="flex items-center gap-4 bg-[#141518] px-4 py-2 rounded-lg border border-black/80 shadow-inner">
                  {/* Glowing Amber Pilot Lamp */}
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-5 h-5 rounded-full border-2 border-[#22242a] transition-all duration-300 ${
                        powerOn && !bypass
                          ? 'skeuo-lamp-on scale-105'
                          : powerOn && bypass
                          ? 'bg-amber-700/60 shadow-[0_0_8px_rgba(180,83,9,0.5)]'
                          : 'bg-zinc-800'
                      }`}
                    />
                    <span className="font-mono text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
                      {powerOn ? (bypass ? 'BYPASS' : 'ACTIVE') : 'OFF'}
                    </span>
                  </div>

                  {/* Overload / Peak LED */}
                  <div className="flex items-center gap-1.5 border-l border-zinc-700 pl-3">
                    <div 
                      className={`w-3.5 h-3.5 rounded-full border border-black transition-all ${
                        isClipping && powerOn
                          ? 'bg-red-500 shadow-[0_0_12px_#EF4444]'
                          : 'bg-[#3b1212]'
                      }`}
                    />
                    <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase">PEAK</span>
                  </div>
                </div>
              </div>

              {/* SECTION A: DUAL VINTAGE ANALOG VU METERS & TUBE WINDOW */}
              <div className="relative z-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left VU Meter */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-sm rounded-xl p-3 bg-gradient-to-b from-[#1b1c20] via-[#121316] to-[#0a0a0c] border-2 border-[#32343a] shadow-[inset_0_4px_12px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5)]">
                    
                    {/* Backlit Warm Cream Meter Face */}
                    <div className="relative h-28 sm:h-32 rounded-lg bg-gradient-to-b from-[#f7e6b8] to-[#e4cc95] border border-[#a89260] overflow-hidden p-2 shadow-inner">
                      {/* Meter Backlight Ambient Glow */}
                      {powerOn && (
                        <div className="absolute inset-0 bg-amber-400/15 pointer-events-none mix-blend-overlay animate-pulse" />
                      )}

                      {/* Calibrated dB Scale Lines (SVG Arc) */}
                      <svg className="w-full h-full" viewBox="0 0 240 120">
                        {/* Scale Arc Background */}
                        <path d="M 30 100 A 100 100 0 0 1 210 100" fill="none" stroke="#715c32" strokeWidth="2" strokeDasharray="1 3" />
                        
                        {/* Red Overload Arc Section (0dB to +3dB) */}
                        <path d="M 165 72 A 100 100 0 0 1 210 100" fill="none" stroke="#dc2626" strokeWidth="4" />

                        {/* dB Labels */}
                        <text x="32" y="94" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-20</text>
                        <text x="65" y="68" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-10</text>
                        <text x="105" y="55" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-5</text>
                        <text x="145" y="58" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-1</text>
                        <text x="168" y="68" fontSize="8" fill="#b91c1c" fontFamily="monospace" fontWeight="black">0</text>
                        <text x="195" y="85" fontSize="8" fill="#b91c1c" fontFamily="monospace" fontWeight="black">+3</text>

                        {/* Meter Label Brand */}
                        <text x="120" y="82" fontSize="9" fill="#5c4826" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
                          VU - LEFT CHANNEL
                        </text>
                        <text x="120" y="94" fontSize="7" fill="#715c32" fontFamily="monospace" textAnchor="middle">
                          VALVE 100% 0dB=1.228V
                        </text>

                        {/* Pivot Base */}
                        <circle cx="120" cy="115" r="9" fill="#1b1c20" stroke="#3a3c44" strokeWidth="2" />

                        {/* Realistic Analog Galvanometer Needle */}
                        <line
                          x1="120"
                          y1="115"
                          x2="120"
                          y2="28"
                          stroke="#18181b"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          transform={`rotate(${leftVuAngle}, 120, 115)`}
                          style={{ transition: 'none' }}
                        />
                        {/* Needle Counterbalance Cap */}
                        <circle cx="120" cy="115" r="4" fill="#a1a1aa" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center px-2 pt-2 text-[10px] font-mono text-zinc-400">
                      <span>CH-L MASTER</span>
                      <span className="text-amber-400 font-bold">{leftVuAngle > 20 ? '+1.2 VU' : leftVuAngle > 0 ? '-0.5 VU' : '-12 VU'}</span>
                    </div>
                  </div>
                </div>

                {/* Center Glass Vacuum Tube Viewing Window */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center py-2">
                  <div className="relative w-20 h-32 rounded-full p-1 bg-gradient-to-b from-[#18191c] via-[#0b0b0c] to-[#1f2025] border-2 border-[#45474f] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                    
                    {/* Glowing Vacuum Tube Filament */}
                    <div className="relative w-12 h-24 rounded-t-full bg-gradient-to-b from-white/10 via-transparent to-black/60 border border-white/20 flex flex-col items-center justify-center">
                      {/* Vacuum Tube Glass Reflection Specular */}
                      <div className="absolute top-2 left-2 w-1.5 h-12 bg-white/30 rounded-full blur-[0.5px]" />
                      
                      {/* Heated Orange Filament Coils */}
                      <div 
                        className={`w-4 h-12 rounded border-2 transition-all duration-700 flex flex-col items-center justify-center gap-1 ${
                          powerOn && !bypass
                            ? 'border-amber-500 bg-amber-500/20 shadow-[0_0_20px_#F59E0B,inset_0_0_10px_#EF4444]'
                            : 'border-zinc-700 bg-transparent opacity-30'
                        }`}
                      >
                        <div className={`w-2 h-1 rounded-full ${powerOn ? 'bg-amber-200 shadow-[0_0_6px_#FEF08A]' : 'bg-zinc-800'}`} />
                        <div className={`w-2 h-1 rounded-full ${powerOn ? 'bg-amber-300 shadow-[0_0_6px_#FDE047]' : 'bg-zinc-800'}`} />
                        <div className={`w-2 h-1 rounded-full ${powerOn ? 'bg-amber-400 shadow-[0_0_6px_#F59E0B]' : 'bg-zinc-800'}`} />
                      </div>

                      <div className="text-[7px] font-mono text-zinc-400 tracking-tighter uppercase mt-2">
                        ECC83 / 12AX7
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-amber-300/80 uppercase tracking-widest mt-1.5 font-bold">
                    TUBE CORE
                  </span>
                </div>

                {/* Right VU Meter */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-sm rounded-xl p-3 bg-gradient-to-b from-[#1b1c20] via-[#121316] to-[#0a0a0c] border-2 border-[#32343a] shadow-[inset_0_4px_12px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5)]">
                    
                    {/* Backlit Warm Cream Meter Face */}
                    <div className="relative h-28 sm:h-32 rounded-lg bg-gradient-to-b from-[#f7e6b8] to-[#e4cc95] border border-[#a89260] overflow-hidden p-2 shadow-inner">
                      {powerOn && (
                        <div className="absolute inset-0 bg-amber-400/15 pointer-events-none mix-blend-overlay animate-pulse" />
                      )}

                      <svg className="w-full h-full" viewBox="0 0 240 120">
                        <path d="M 30 100 A 100 100 0 0 1 210 100" fill="none" stroke="#715c32" strokeWidth="2" strokeDasharray="1 3" />
                        <path d="M 165 72 A 100 100 0 0 1 210 100" fill="none" stroke="#dc2626" strokeWidth="4" />

                        <text x="32" y="94" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-20</text>
                        <text x="65" y="68" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-10</text>
                        <text x="105" y="55" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-5</text>
                        <text x="145" y="58" fontSize="8" fill="#42351d" fontFamily="monospace" fontWeight="bold">-1</text>
                        <text x="168" y="68" fontSize="8" fill="#b91c1c" fontFamily="monospace" fontWeight="black">0</text>
                        <text x="195" y="85" fontSize="8" fill="#b91c1c" fontFamily="monospace" fontWeight="black">+3</text>

                        <text x="120" y="82" fontSize="9" fill="#5c4826" fontFamily="sans-serif" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
                          VU - RIGHT CHANNEL
                        </text>
                        <text x="120" y="94" fontSize="7" fill="#715c32" fontFamily="monospace" textAnchor="middle">
                          VALVE 100% 0dB=1.228V
                        </text>

                        <circle cx="120" cy="115" r="9" fill="#1b1c20" stroke="#3a3c44" strokeWidth="2" />

                        <line
                          x1="120"
                          y1="115"
                          x2="120"
                          y2="28"
                          stroke="#18181b"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          transform={`rotate(${rightVuAngle}, 120, 115)`}
                          style={{ transition: 'none' }}
                        />
                        <circle cx="120" cy="115" r="4" fill="#a1a1aa" />
                      </svg>
                    </div>

                    <div className="flex justify-between items-center px-2 pt-2 text-[10px] font-mono text-zinc-400">
                      <span>CH-R MASTER</span>
                      <span className="text-amber-400 font-bold">{rightVuAngle > 20 ? '+1.0 VU' : rightVuAngle > 0 ? '-0.8 VU' : '-13 VU'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* SECTION B: ROTARY ANALOG POTENTIOMETER BANK */}
              <div className="relative z-10 py-6 border-t border-b border-black/80 bg-black/25 rounded-xl p-4 sm:p-6 shadow-inner">
                <div className="text-center mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-[#16171b] px-3 py-1 rounded border border-white/5">
                    CALIBRATED CONTINUOUS ROTARY POTENTIOMETERS
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 items-center justify-items-center">
                  
                  {/* Knob 1: Input Gain */}
                  <div className="flex flex-col items-center space-y-2 select-none">
                    <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wide">
                      INPUT GAIN
                    </span>
                    
                    {/* Knob Wheel */}
                    <div 
                      onClick={() => setInputGain((prev) => (prev >= 15 ? -10 : Number((prev + 3.5).toFixed(1))))}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full skeuo-knob border-2 border-[#121315] relative flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 transition-transform"
                      title="Click to increment Input Gain"
                    >
                      {/* Knurled Ridges Ring */}
                      <div className="absolute inset-1 rounded-full border border-zinc-600/30" />
                      
                      {/* Rotary White Line Indicator */}
                      <div 
                        className="w-full h-full absolute inset-0 flex items-start justify-center transition-transform duration-200"
                        style={{ transform: `rotate(${calcKnobAngle(inputGain, -12, 18)}deg)` }}
                      >
                        <div className="w-1 h-4 sm:h-5 bg-white rounded-full mt-1.5 shadow-[0_0_4px_white]" />
                      </div>

                      {/* Machined Aluminum Center Cap */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#4a4d54] via-[#202227] to-[#121316] border border-black/80 shadow-md" />
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono font-bold text-amber-300">
                        {inputGain > 0 ? `+${inputGain}` : inputGain} dB
                      </div>
                      <div className="flex gap-1 pt-1">
                        <button 
                          onClick={() => setInputGain((v) => Math.max(-12, Number((v - 1.5).toFixed(1))))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setInputGain((v) => Math.min(18, Number((v + 1.5).toFixed(1))))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Knob 2: Harmonic Tube Drive */}
                  <div className="flex flex-col items-center space-y-2 select-none">
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wide">
                      TUBE DRIVE
                    </span>
                    
                    <div 
                      onClick={() => setTubeDrive((prev) => (prev >= 90 ? 10 : prev + 15))}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full skeuo-knob border-2 border-amber-600/40 relative flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 transition-transform"
                      title="Click to increment Tube Drive"
                    >
                      <div className="absolute inset-1 rounded-full border border-amber-500/20" />
                      
                      <div 
                        className="w-full h-full absolute inset-0 flex items-start justify-center transition-transform duration-200"
                        style={{ transform: `rotate(${calcKnobAngle(tubeDrive, 0, 100)}deg)` }}
                      >
                        <div className="w-1 h-4 sm:h-5 bg-amber-400 rounded-full mt-1.5 shadow-[0_0_6px_#F59E0B]" />
                      </div>

                      <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#5c401d] via-[#24170a] to-[#120b05] border border-amber-600/50 shadow-md flex items-center justify-center">
                        <Flame className="w-3.5 h-3.5 text-amber-400 opacity-80" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono font-bold text-amber-300">
                        {tubeDrive}% THD
                      </div>
                      <div className="flex gap-1 pt-1">
                        <button 
                          onClick={() => setTubeDrive((v) => Math.max(0, v - 10))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setTubeDrive((v) => Math.min(100, v + 10))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Knob 3: Warmth (Low Contour) */}
                  <div className="flex flex-col items-center space-y-2 select-none">
                    <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wide">
                      WARMTH (BASS)
                    </span>
                    
                    <div 
                      onClick={() => setWarmth((prev) => (prev >= 90 ? 20 : prev + 15))}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full skeuo-knob border-2 border-[#121315] relative flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 transition-transform"
                    >
                      <div className="absolute inset-1 rounded-full border border-zinc-600/30" />
                      
                      <div 
                        className="w-full h-full absolute inset-0 flex items-start justify-center transition-transform duration-200"
                        style={{ transform: `rotate(${calcKnobAngle(warmth, 0, 100)}deg)` }}
                      >
                        <div className="w-1 h-4 sm:h-5 bg-white rounded-full mt-1.5 shadow-[0_0_4px_white]" />
                      </div>

                      <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#4a4d54] via-[#202227] to-[#121316] border border-black/80 shadow-md" />
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono font-bold text-amber-300">
                        {warmth}% @ 80Hz
                      </div>
                      <div className="flex gap-1 pt-1">
                        <button 
                          onClick={() => setWarmth((v) => Math.max(0, v - 10))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setWarmth((v) => Math.min(100, v + 10))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Knob 4: Air (Presence) */}
                  <div className="flex flex-col items-center space-y-2 select-none">
                    <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wide">
                      AIR (12 kHz)
                    </span>
                    
                    <div 
                      onClick={() => setAir((prev) => (prev >= 90 ? 15 : prev + 15))}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full skeuo-knob border-2 border-[#121315] relative flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 transition-transform"
                    >
                      <div className="absolute inset-1 rounded-full border border-zinc-600/30" />
                      
                      <div 
                        className="w-full h-full absolute inset-0 flex items-start justify-center transition-transform duration-200"
                        style={{ transform: `rotate(${calcKnobAngle(air, 0, 100)}deg)` }}
                      >
                        <div className="w-1 h-4 sm:h-5 bg-white rounded-full mt-1.5 shadow-[0_0_4px_white]" />
                      </div>

                      <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#4a4d54] via-[#202227] to-[#121316] border border-black/80 shadow-md" />
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono font-bold text-amber-300">
                        {air}% SHELF
                      </div>
                      <div className="flex gap-1 pt-1">
                        <button 
                          onClick={() => setAir((v) => Math.max(0, v - 10))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setAir((v) => Math.min(100, v + 10))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Knob 5: Ceiling (Output) */}
                  <div className="col-span-2 md:col-span-1 flex flex-col items-center space-y-2 select-none">
                    <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wide">
                      OUTPUT CEILING
                    </span>
                    
                    <div 
                      onClick={() => setCeiling((prev) => (prev >= 0 ? -6.0 : Number((prev + 1.0).toFixed(1))))}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full skeuo-knob border-2 border-[#121315] relative flex items-center justify-center cursor-pointer shadow-2xl active:scale-95 transition-transform"
                    >
                      <div className="absolute inset-1 rounded-full border border-zinc-600/30" />
                      
                      <div 
                        className="w-full h-full absolute inset-0 flex items-start justify-center transition-transform duration-200"
                        style={{ transform: `rotate(${calcKnobAngle(ceiling, -18, 0)}deg)` }}
                      >
                        <div className="w-1 h-4 sm:h-5 bg-white rounded-full mt-1.5 shadow-[0_0_4px_white]" />
                      </div>

                      <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#4a4d54] via-[#202227] to-[#121316] border border-black/80 shadow-md" />
                    </div>

                    <div className="text-center">
                      <div className="text-xs font-mono font-bold text-amber-300">
                        {ceiling} dBFS
                      </div>
                      <div className="flex gap-1 pt-1">
                        <button 
                          onClick={() => setCeiling((v) => Math.max(-18, Number((v - 0.5).toFixed(1))))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          -
                        </button>
                        <button 
                          onClick={() => setCeiling((v) => Math.min(0, Number((v + 0.5).toFixed(1))))}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 hover:bg-zinc-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION C: MECHANICAL TOGGLES, SATURATION MODE & PRESET CASSETTES */}
              <div className="relative z-10 pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Harmonic Circuit Selector */}
                <div className="md:col-span-4 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    HARMONIC CIRCUIT TOPOLOGY:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'triode', label: 'Triode (Warm 2nd)' },
                      { id: 'pentode', label: 'Pentode (Punchy 3rd)' },
                      { id: 'transformer', label: 'Iron Core (Transformer)' },
                      { id: 'tape', label: 'Studer 15 IPS Tape' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMode(m.id as any)}
                        className={`p-2 rounded text-left text-[11px] font-mono font-bold border transition-all ${
                          selectedMode === m.id
                            ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                            : 'bg-[#15161a] border-black/80 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mastering Presets */}
                <div className="md:col-span-5 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    MASTERING CALIBRATION PRESETS:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => applyPreset(p)}
                        className={`p-2 rounded text-left text-[11px] font-mono border transition-all flex items-center justify-between ${
                          activePreset === p.id
                            ? 'bg-gradient-to-r from-amber-600/30 to-amber-500/20 border-amber-400/80 text-amber-200 shadow-md font-bold'
                            : 'bg-[#15161a] border-black/80 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        <Disc className={`w-3 h-3 shrink-0 ${activePreset === p.id ? 'text-amber-400 animate-spin' : 'text-zinc-600'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Heavy Mechanical Toggle Switches */}
                <div className="md:col-span-3 flex items-center justify-around bg-[#121316] p-4 rounded-xl border border-black/90 shadow-inner">
                  
                  {/* Power Toggle Switch */}
                  <div className="flex flex-col items-center space-y-2 select-none">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                      POWER
                    </span>
                    <button
                      onClick={() => setPowerOn(!powerOn)}
                      className={`w-8 h-14 rounded-full p-1 border-2 border-zinc-700 flex flex-col justify-between items-center transition-all shadow-xl ${
                        powerOn 
                          ? 'bg-gradient-to-b from-zinc-700 to-zinc-900' 
                          : 'bg-gradient-to-b from-zinc-900 to-black'
                      }`}
                      title="Mechanical Power Lever"
                    >
                      <div 
                        className={`w-6 h-6 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border border-black shadow-md transition-transform duration-150 ${
                          powerOn ? 'translate-y-0' : 'translate-y-6'
                        }`}
                      />
                    </button>
                    <span className={`text-[10px] font-mono font-bold ${powerOn ? 'text-amber-400' : 'text-zinc-600'}`}>
                      {powerOn ? 'ON' : 'OFF'}
                    </span>
                  </div>

                  {/* Audio Bypass Toggle Switch */}
                  <div className="flex flex-col items-center space-y-2 select-none">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                      BYPASS
                    </span>
                    <button
                      onClick={() => setBypass(!bypass)}
                      className={`w-8 h-14 rounded-full p-1 border-2 border-zinc-700 flex flex-col justify-between items-center transition-all shadow-xl ${
                        bypass 
                          ? 'bg-gradient-to-b from-zinc-700 to-zinc-900' 
                          : 'bg-gradient-to-b from-zinc-900 to-black'
                      }`}
                      title="Mechanical Bypass Lever"
                    >
                      <div 
                        className={`w-6 h-6 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 border border-black shadow-md transition-transform duration-150 ${
                          bypass ? 'translate-y-0' : 'translate-y-6'
                        }`}
                      />
                    </button>
                    <span className={`text-[10px] font-mono font-bold ${bypass ? 'text-red-400' : 'text-zinc-600'}`}>
                      {bypass ? 'ENGAGED' : 'OFF'}
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Interactive Specification & Conversion Callout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#14151a] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                <Radio className="w-4 h-4" />
                <span>Physical Materiality</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Brushed Metals & Tactile Physics</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Render realistic knurled aluminum knobs, brushed faceplates, calibrated analog ballistics, and physical mechanical levers built strictly with modern CSS & Canvas physics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#14151a] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Pro Audio & Luxury UI</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Targeting Precision Industries</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ideal for VST plugin developers, high-end studio hardware manufacturers, luxury watch brands, automotive telematics, and heritage instrument builders.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-[#18191f] to-[#14151a] border border-amber-500/30 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  Commission Bespoke Hardware UI
                </span>
                <h4 className="text-base font-bold text-white font-display">Bring Tactile Realism to Your Web App</h4>
                <p className="text-xs text-zinc-300 pt-1">
                  We engineer ultra-responsive skeuomorphic interfaces that captivate audiophiles and demanding technical buyers.
                </p>
              </div>

              <Link
                to="/request?style=skeuomorphism"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider text-center shadow-lg transition-all"
              >
                Request Skeuomorphic Platform →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </DemoViewerShell>
  );
};
