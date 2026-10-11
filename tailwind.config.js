/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agency: {
          dark: '#090A0F',
          card: '#12141F',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#6366F1',
          accentGlow: '#8B5CF6',
          cyan: '#06B6D4'
        },
        brutal: {
          yellow: '#FAFF00',
          black: '#000000',
          white: '#FFFFFF',
          purple: '#9B51E0',
          pink: '#FF0055',
          orange: '#FF5E00'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        brutal: ['Space Grotesk', 'Impact', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '8px 8px 0px #000000',
        'brutal-sm': '2px 2px 0px #000000',
        'brutal-hover': '6px 6px 0px #000000',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'glow-primary': '0 0 25px rgba(99, 102, 241, 0.45)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.45)',
        'neumorph-flat': '8px 8px 16px #0b0d14, -8px -8px 16px #191d2c',
        'neumorph-inset': 'inset 4px 4px 8px #0b0d14, inset -4px -4px 8px #191d2c',
        'clay': '0 20px 30px -10px rgba(0,0,0,0.3), inset 0 -6px 12px rgba(0,0,0,0.2), inset 0 6px 12px rgba(255,255,255,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
