/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",   // all React files
    "./src/**/*"                    // fallback catch-all
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
  animation: {
    'spin-slow': 'spin 20s linear infinite',
    'spin-slow-reverse': 'spin 30s linear infinite reverse',
  }
}
}
