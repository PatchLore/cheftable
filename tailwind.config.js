/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
        lora: ['Lora', 'serif'],
      },
      colors: {
        bg: '#0a0908',
        s1: '#131110',
        s2: '#1a1714',
        s3: '#22201c',
        s4: '#2c2924',
        border: '#2e2b26',
        border2: '#3d3930',
        gold: '#c9a227',
        gold2: '#e8be50',
        goldDim: 'rgba(201,162,39,0.1)',
        goldGlow: 'rgba(201,162,39,0.15)',
        ember: '#b84a2a',
        emberDim: 'rgba(184,74,42,0.12)',
        sage: '#5c7a5a',
        sageDim: 'rgba(92,122,90,0.12)',
        sky: '#3a7ab8',
        skyDim: 'rgba(58,122,184,0.12)',
        text: '#ede8e0',
        text2: '#b8b0a4',
        muted: '#6e6860',
      },
      animation: {
        fadeSlide: 'fadeSlide 0.3s ease',
        typingBounce: 'typingBounce 1.4s infinite',
        orbPulse: 'orbPulse 1.2s ease-in-out infinite',
        orbRing: 'orbRing 1.2s ease-in-out infinite'
      },
      keyframes: {
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        typingBounce: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-1.5rem)' }
        },
        orbPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' }
        },
        orbRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.2)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}