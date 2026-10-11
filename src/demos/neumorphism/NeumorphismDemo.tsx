import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import { 
  Sliders, 
  Power, 
  Sun, 
  Moon, 
  Wind, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Sparkles,
  Wifi,
  Flame,
  Droplets,
  Volume2
} from 'lucide-react';

export const NeumorphismDemo: React.FC = () => {
  // Environmental Control States
  const [temperature, setTemperature] = useState(72);
  const [dimmerValue, setDimmerValue] = useState(68);
  const [activeScene, setActiveScene] = useState<'focus' | 'cinema' | 'eco' | 'night'>('focus');

  // Device Switches
  const [devices, setDevices] = useState({
    ambientLighting: true,
    airPurifier: true,
    acousticDampener: false,
    smartBlinds: true,
  });

  const toggleDevice = (key: keyof typeof devices) => {
    setDevices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate live energy wattage
  const activeDeviceCount = Object.values(devices).filter(Boolean).length;
  const wattage = 120 + activeDeviceCount * 45 + Math.round(dimmerValue * 0.8);

  return (
    <DemoViewerShell
      demoId="neumorphism"
      demoTitle="Aura // Tactile IoT"
      category="Smart Home & Environmental Controller"
      styleBadge="Neumorphism Architecture"
    >
      <div className="min-h-screen bg-[#111322] text-slate-200 font-sans antialiased overflow-x-hidden pb-24 selection:bg-slate-700 selection:text-white">
        
        {/* Soft Tone-on-Tone Neumorphic Ambient Layer */}
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-slate-700/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-slate-600/10 rounded-full blur-[130px] pointer-events-none" />

        {/* Sub-Header Bar */}
        <div className="relative z-30 border-b border-white/5 bg-[#141726]/80 backdrop-blur-2xl px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl neumorphic-raised flex items-center justify-center shrink-0">
              <Power className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <span className="font-display font-black text-xs sm:text-sm tracking-wide text-white truncate block">
                AURA // SMART OS
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono block -mt-0.5 truncate">
                Soft Extrusion Hardware UI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl neumorphic-inset text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-white font-bold">{wattage} W</span>
              <span className="text-slate-400">Live Grid</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <Wifi className="w-3.5 h-3.5" />
              <span>Mesh Synced</span>
            </div>

            <Link
              to="/request?style=neumorphism"
              className="px-3.5 py-1.5 rounded-xl neumorphic-button text-cyan-300 hover:text-cyan-200 text-xs font-semibold transition-all whitespace-nowrap"
            >
              Order Neumorphic Build
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-10 sm:space-y-12">
          
          {/* Neumorphic Extruded Hero Card */}
          <div className="rounded-3xl p-6 sm:p-10 neumorphic-raised border border-white/5 relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xl neumorphic-inset text-cyan-400 text-[11px] font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SEAMLESS CONTINUOUS SURFACE ARCHITECTURE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight">
                Controls That Emerge <br />
                <span className="text-cyan-300">From the Surface</span>
              </h1>

              <p className="text-slate-400 text-xs sm:text-base leading-relaxed max-w-xl">
                Simulate tactile physical extrusion through balanced light and shadow pairs. Ideal for smart hardware hubs, IoT controllers, automotive consoles, and luxury audio interfaces.
              </p>

              {/* Scene Switcher Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                  Active Scene Preset:
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { id: 'focus', label: 'Deep Focus', icon: Sun },
                    { id: 'cinema', label: 'Cinema Studio', icon: Moon },
                    { id: 'eco', label: 'Eco Conservation', icon: Wind },
                    { id: 'night', label: 'Night Sanctuary', icon: Zap },
                  ].map((scene) => (
                    <button
                      key={scene.id}
                      onClick={() => setActiveScene(scene.id as any)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeScene === scene.id
                          ? 'neumorphic-inset text-cyan-300 font-bold border border-cyan-500/30'
                          : 'neumorphic-button text-slate-400 hover:text-white'
                      }`}
                    >
                      <scene.icon className="w-3.5 h-3.5" />
                      <span>{scene.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Hardware Controller Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left: Climate Dial Controller (Span 5 cols) */}
            <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 neumorphic-raised border border-white/5 space-y-6 flex flex-col items-center text-center">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400">
                  Precision Thermostat
                </span>
                <h3 className="text-xl font-display font-bold text-white mt-1">
                  Living Hub Climate
                </h3>
              </div>

              {/* Central Extruded Circular Dial */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full neumorphic-raised flex items-center justify-center p-4">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full neumorphic-inset flex flex-col items-center justify-center space-y-1">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white">
                    {temperature}°
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300">
                    TARGET 72°F
                  </span>
                </div>
              </div>

              {/* Temperature Adjust Buttons */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setTemperature((prev) => Math.max(60, prev - 1))}
                  className="w-12 h-12 rounded-2xl neumorphic-button text-slate-300 hover:text-white font-black text-xl flex items-center justify-center"
                  aria-label="Decrease temperature"
                >
                  −
                </button>

                <div className="text-xs font-mono text-slate-400">
                  <div>Humidity: 44%</div>
                  <div className="text-emerald-400">Air: Optimal</div>
                </div>

                <button
                  onClick={() => setTemperature((prev) => Math.min(85, prev + 1))}
                  className="w-12 h-12 rounded-2xl neumorphic-button text-slate-300 hover:text-white font-black text-xl flex items-center justify-center"
                  aria-label="Increase temperature"
                >
                  +
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-mono pt-1">
                *Dual shadow physics simulate soft matte plastic
              </div>
            </div>

            {/* Right: Tactile Device Switches & Sliders (Span 7 cols) */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Tactile Dimmer Slider */}
              <div className="rounded-3xl p-6 sm:p-7 neumorphic-raised border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">Luminance Output</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">{dimmerValue}%</span>
                </div>

                {/* Tactile Inset Slider Track */}
                <div className="relative pt-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={dimmerValue}
                    onChange={(e) => setDimmerValue(Number(e.target.value))}
                    className="w-full h-3 rounded-full neumorphic-inset appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>10% Low Ambient</span>
                  <span>100% Studio Day</span>
                </div>
              </div>

              {/* Connected Device Toggles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'ambientLighting', label: 'Ambient Perimeter LEDs', desc: 'Warm 2700K Soft Glow', icon: Sun },
                  { key: 'airPurifier', label: 'HEPA Ionizer Purifier', desc: 'Silent Filter Cycle', icon: Wind },
                  { key: 'acousticDampener', label: 'Acoustic Wall Panels', desc: 'Active Resonator Cancel', icon: Volume2 },
                  { key: 'smartBlinds', label: 'Motorized Solar Blinds', desc: 'Auto Tilt Angle 45°', icon: ShieldCheck },
                ].map((item) => {
                  const isOn = devices[item.key as keyof typeof devices];
                  return (
                    <div
                      key={item.key}
                      onClick={() => toggleDevice(item.key as keyof typeof devices)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 select-none ${
                        isOn
                          ? 'neumorphic-inset border-cyan-500/30'
                          : 'neumorphic-raised border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                          isOn ? 'neumorphic-raised text-cyan-300' : 'neumorphic-inset text-slate-500'
                        }`}>
                          <item.icon className="w-4 h-4" />
                        </div>

                        {/* Tactile Convex / Concave Switch */}
                        <div className={`w-11 h-6 rounded-full p-0.5 transition-all ${
                          isOn ? 'neumorphic-inset bg-cyan-950/40' : 'neumorphic-inset bg-slate-900/60'
                        }`}>
                          <div className={`w-5 h-5 rounded-full transition-transform ${
                            isOn ? 'translate-x-5 bg-cyan-400 shadow-sm' : 'translate-x-0 bg-slate-600'
                          }`} />
                        </div>
                      </div>

                      <div>
                        <h4 className={`text-xs font-bold ${isOn ? 'text-white' : 'text-slate-400'}`}>
                          {item.label}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Pricing & Custom Callout Card */}
          <div className="rounded-3xl p-6 sm:p-10 neumorphic-raised border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                IoT & Hardware User Interfaces
              </span>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Require a tactile Neumorphic control system?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                We craft custom extruded dashboards for connected hardware, automotive dashboards, smart home apps, and industrial automation control rooms.
              </p>
            </div>

            <Link
              to="/request?style=neumorphism"
              className="px-6 py-3.5 rounded-xl neumorphic-button text-cyan-300 hover:text-cyan-200 font-bold text-xs sm:text-sm transition-all whitespace-nowrap shadow-lg"
            >
              Commission Neumorphic System
            </Link>
          </div>

        </div>

      </div>
    </DemoViewerShell>
  );
};
