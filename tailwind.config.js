module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			'sans': ['Poppins'],
		}
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms")({
		  strategy: 'class',
		}),
	   ],
	theme: {
	minHeight: {
		'0': '0',
		'1/4': '25%',
		'1/2': '50%',
		'3/4': '75%',
		'5/6': '85%',
		'full': '100%',
		}
	}
};
