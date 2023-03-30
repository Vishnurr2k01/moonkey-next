/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				Kelly: ['Kelly Slab', 'cursive'],
			},
			backgroundColor: {
				'logo-blue': '#66aaf8',
			},
			colors: {
				'logo-blue': '#66aaf8',
			},
		},
	},
	plugins: [],
};
