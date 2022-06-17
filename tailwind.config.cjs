module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				night: {
					primary: '#3ABFF8',
					secondary: '#828DF8',
					accent: '#F471B5',
					// neutral: '#1D283A',
					neutral: '#18212f',
					// 'base-100': '#0F1729',
					'base-100': '#0b0f18',
					info: '#0CA6E9',
					success: '#2BD4BD',
					warning: '#F4C152',
					error: '#FB6F84',
				},
			},
		],
	},
	plugins: [require('daisyui')],
}