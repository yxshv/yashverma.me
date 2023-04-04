/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#1B1B31',
        outline: '#474466',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require('tailwind-scrollbar')],
}
