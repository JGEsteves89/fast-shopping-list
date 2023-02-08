import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { alpha, Typography } from '@mui/material';

import ShoppingList from '../pages/shoppingList.js';
import './default.css';

function DefaultLayout() {
	const theme = useTheme();
	return (
		<Box className="app-body" sx={gradientBackground(theme)}>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar>
					<Grid item sx={{ width: '40px' }}>
						<IconButton size="large" edge="start" aria-label="menu" color="secondary" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
					</Grid>
					<Grid item sx={{ width: '100%' }}>
						<Typography sx={{ textAlign: 'center', marginBlock: '0.5rem' }} color="secondary" variant="h4">
							FAST SHOPPING LIST
						</Typography>
					</Grid>
				</Toolbar>
			</AppBar>
			<ShoppingList />
		</Box>
	);
}

const gradientBackground = (theme) => {
	return {
		background: `linear-gradient(0deg, rgba(0,0,0,1) -150%, ${alpha(theme.palette.background.default, 1)} 100%)`,
	};
};
export default DefaultLayout;
