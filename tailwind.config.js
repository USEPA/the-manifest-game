/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        blue: '#337AB7',
      },
    },
  },
  plugins: [],
};
