/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        rcraBlue: '#337AB7',
      },
    },
  },
  plugins: [],
};
