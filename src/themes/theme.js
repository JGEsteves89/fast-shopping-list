import { createTheme } from '@mui/material/styles';
const defaultTheme = createTheme({
	palette: {
		type: 'dark',
		primary: {
			main: '#22416c',
			light: '#224e7a',
			dark: '#28666d',
			contrastText: '#97c9ce',
		},
		secondary: {
			main: '#74b9c2',
		},
		background: {
			default: '#22416c',
			paper: '#2c548c',
		},
		text: {
			primary: '#ddebe7',
			secondary: '#74b9c2',
			disabled: 'rgba(173,202,203,0.58)',
			hint: 'rgba(116,185,194,0.53)',
		},
	},
	typography: {
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1,
			letterSpacing: '-0.03em',
		},
	},
});
export default defaultTheme;
