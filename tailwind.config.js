/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': {
          DEFAULT: '#eff0f3',
          'sec': '#fffffe'
        },
        'line': {
          DEFAULT: '#0d0d0d',
          'sec': '#2a2a2a'
        },
        'highlight': {
          DEFAULT: '#ff8e3c',
          'sec': '#fffffe',
          'ter': '#d9376e'
        },
      }
    },
  },
  plugins: [],
}
