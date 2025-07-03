/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        busPink: '#E23A7B',
        busYellow: '#FFD600',
        busBlue: '#2A4D9B',
        busWhite: '#FFFFFF',
        busGray: '#E5E5E5',
        busCharcoal: '#333333',
      },
    },
  },
  plugins: [],
};
