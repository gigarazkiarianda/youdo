/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'light-beam': 'lightBeam 4s infinite alternate',
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-delay-1000': 'fadeIn 1s ease-in-out 1000ms',
        'fade-in-delay-2000': 'fadeIn 1s ease-in-out 2000ms',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        lightBeam: {
          '0%': { opacity: '0.2', transform: 'translateY(-100%)' },
          '100%': { opacity: '0.8', transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounce: {
          '0%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-15px)' },
          '50%': { transform: 'translateY(0)' },
          '80%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      colors: {
        teal: {
          200: '#b2f5ea',
          300: '#81e6d9',
          400: '#4fd1c5',
          500: '#38b2ac',
          600: '#319795',
          700: '#2c7a7b',
        },
        blue: {
          500: '#3b82f6',
          700: '#1d4ed8',
          900: '#1e40af',
        },
      },
    },
  },
  plugins: [],
};
