import { ThemeProvider } from '@mui/material/styles';
import DefaultLayout from './layout/default';
import defaultTheme from './themes/theme';
import useStore from './store/store';
import { useEffect } from 'react';

function App() {
	const fetch = useStore((state) => state.fetch);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return (
		<ThemeProvider theme={defaultTheme}>
			<DefaultLayout />
		</ThemeProvider>
	);
}

export default App;
