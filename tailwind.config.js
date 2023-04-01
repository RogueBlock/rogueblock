const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
    require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: ['black']
  }
}
