/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js,ts}',
    './components/**/*.{html,js,ts}',
    './index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nav: "var(--nav-bg-color)",
        bnav: "var(--border-color)"
      }
    },
  },
  plugins: [],
};
