/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neon: {
          blue: '#00d4ff',
          purple: '#a855f7',
          green: '#22d3ee',
          pink: '#ec4899'
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0c1428 0%, #1e293b 50%, #0f172a 100%)',
        'neon-gradient': 'linear-gradient(45deg, #00d4ff, #a855f7)',
        'analysis-gradient': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'typewriter': 'typewriter 4s steps(40) 1s forwards'
      },
      keyframes: {
        glow: {
          '0%': { 
            'box-shadow': '0 0 20px rgba(0, 212, 255, 0.5)',
            'border-color': 'rgba(0, 212, 255, 0.5)'
          },
          '100%': { 
            'box-shadow': '0 0 40px rgba(0, 212, 255, 0.8)',
            'border-color': 'rgba(0, 212, 255, 0.8)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' }
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'mono': ['Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
