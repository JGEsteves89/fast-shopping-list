import { ThemeProvider } from '@mui/material/styles';
import DefaultLayout from './layout/default';
import defaultTheme from './themes/theme';

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<DefaultLayout />
		</ThemeProvider>
	);
}

export default App;
