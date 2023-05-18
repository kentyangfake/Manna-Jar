/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'serif': ['Noto Serif TC'],
    },
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1023px'},
      'md': {'max': '767px'},
      'sm': {'max': '639px'},
      'xs': {'max': '484px'},
    },
    extend: {
      keyframes: {
        wave: {
          to: {
            'margin-left': '-499px',
          },
        },
      },
    },
    animation: {
      wave: 'wave 5s linear infinite',
    },
  },
  plugins: [],
}

