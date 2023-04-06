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
				primary: {
					DEFAULT: '#10BBD5',
					light: '#DBF5F9',
					dark: '#08A2C3',
				},
				success: {
					DEFAULT: '#67D79F',
					hover: '#30b674',
				},
				warning: {
					DEFAULT: '#FF8A00',
					hover: '#c97307',
				},
				error: {
					DEFAULT: '#E27D8A',
					hover: '#D86371',
				},
				fog: { DEFAULT: '#F4F4F4' },
				graphite: { DEFAULT: '#BFBFC3' },
				silver: { DEFAULT: '#E4E4E6' },
				charcoal: { DEFAULT: '#18181A' },
				grey: { DEFAULT: '#303034' },
				approve: { DEFAULT: '#4EC987' },
				dark: {
					DEFAULT: '#000000',
					hover: '#444444',
					disabled: '#18181A33', //20% Opacity
				},
				light: {
					DEFAULT: '#FFFFFF', //100% Opacity
					hover: '#efefef',
					disabled: '#FFFFFF33', //20% Opacity
				},
				black: {
					DEFAULT: '#000000',
					hover: '#444444',
					medium: '#18181ACC', //80% Opacity
					low: '#18181A80', //50% Opacity
					disabled: '#18181A33', //20% Opacity
				},
				white: {
					DEFAULT: '#FFFFFF', //100% Opacity
					hover: '#efefef',
					medium: '#FFFFFFCC', //80% Opacity
					low: '#FFFFFF80', //50% Opacity
					disabled: '#FFFFFF33', //20% Opacity
				},
			},
			boxShadow: {
				widget: '0px 2px 6px rgba(15, 49, 105, 0.15);',
				header: '0px 2px 6px rgba(15, 49, 105, 0.15)',
				content: '0px 2px 6px rgba(15, 49, 105, 0.15)',
				ticker: '0px 1px 2px rgba(15, 49, 105, 0.15)',
			},
		},
	},
	plugins: [],
};
