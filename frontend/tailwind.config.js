/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#070b14',
          card:    '#0c1224',
          glass:   'rgba(12,18,36,0.65)',
        },
        brand: {
          purple: '#8b5cf6',
          pink:   '#ec4899',
          blue:   '#3b82f6',
          cyan:   '#06b6d4',
          gold:   '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-brand':
          'linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #2563eb 100%)',
        'gradient-glow':
          'linear-gradient(135deg, #c084fc 0%, #f472b6 40%, #818cf8 80%, #38bdf8 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.4)' },
          '50%':       { boxShadow: '0 0 45px rgba(139,92,246,0.7), 0 0 80px rgba(236,72,153,0.3)' },
        },
        blobA: {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '50%':  { transform: 'translate(100px,60px) scale(1.12)' },
          '100%': { transform: 'translate(-60px,120px) scale(0.92)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float:          'float 5s ease-in-out infinite',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
        'gradient':     'gradientShift 5s ease infinite',
        'spin-slow':    'spinSlow 14s linear infinite',
        'spin-slower':  'spinSlow 22s linear infinite reverse',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(139,92,246,0.35), 0 0 80px rgba(139,92,246,0.15)',
        'glow-pink':   '0 0 40px rgba(236,72,153,0.25)',
        'glow-sm':     '0 0 20px rgba(139,92,246,0.3)',
        'glass':       '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        'dark-xl':     '0 24px 60px rgba(0,0,0,0.6)',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
};