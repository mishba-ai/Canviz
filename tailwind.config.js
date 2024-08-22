/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {
     colors:{
       nav:"var(--nav-bg-color)",
        bnav:"var(--border-color)"
     }
    },
  },
  plugins: [],
};
