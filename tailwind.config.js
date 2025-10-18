/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8b5cf6',
        'primary-dark': '#7c3aed',
        'primary-light': '#a78bfa',
        background: '#ffffff',
        foreground: '#1f2937',
        border: '#e5e7eb',
        'border-light': '#f3f4f6',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}