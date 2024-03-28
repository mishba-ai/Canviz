/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        nav:"var(--nav-bg-color)",
        bnav:"var(--border-color)"
      }
    },
  },
  plugins: [],
}

