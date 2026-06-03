/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0e9fb5',
          700: '#0e7d90',
          800: '#155e6d',
          900: '#164e5c',
        },
        navy: {
          900: '#07111f',
          950: '#04101c',
        },
        graphite: {
          800: '#1f2933',
          900: '#111827',
        },
        mist: '#f6fafb',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(10, 35, 54, 0.12)',
        glow: '0 22px 70px rgba(6, 182, 212, 0.18)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}