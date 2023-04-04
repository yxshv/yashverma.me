/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#101217'
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require('tailwind-scrollbar')],
}
