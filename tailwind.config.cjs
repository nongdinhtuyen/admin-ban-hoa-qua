/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        sider: 270,
      },
      margin: {
        sider: 270,
      },
      textColor: {
        primary: '#82ae46',
      },
      backgroundColor: {
        primary: '#82ae46',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
};
