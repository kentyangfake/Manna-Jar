/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'serif': ['Noto Serif TC'],
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
      wave: 'wave 3s linear infinite',
    },
  },
  plugins: [],
}

