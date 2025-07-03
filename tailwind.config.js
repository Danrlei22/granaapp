/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c79d33', //gold
        'secondary': '#d7b661', //light gold
        'tertiary': '#333FC7' // purple
      },
      screens: {
        xs: '480px'
      },
      animation: {
        'bg-blink': 'bgBlink 1s steps(2,start) infinite',
      },
      keyframes: {
        bgBlink: {
          '0%': { backgroundColor: 'transparent' },
          '100%': { backgroundColor: '#facc15' },
        },
      },
    },
  },
  plugins: [],
};
