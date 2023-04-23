/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{vue,ts}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
	daisyui: {
    themes: ['pastel', 'aqua'],
  },
}

