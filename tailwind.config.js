/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'charcoal-gray': '#1C1C1E',
        'vibrant-yellow': '#FFD60A',
        'light-gray': '#8E8E93',
        'dark-card': '#2C2C2E',
        'darker-card': '#1C1C1E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '390px',
      },
    },
  },
  plugins: [],
};
