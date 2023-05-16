/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{vue,ts}'],
  theme: {
    extend: {},
		screens: {
			'ms': '320px',
			'mm': '375px',
			'ml': '425px',
			't': '768px',
			'l': '1024px',
			'll': '1440px',
		}
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
	daisyui: {
    themes: ['pastel', 'aqua'],
  },
}

