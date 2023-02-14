import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { alpha, Typography } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import ShoppingList from '../pages/shoppingList.js';
import BottomSheet from '../components/bottomSheet.js';
import './default.css';

function DefaultLayout() {
	const theme = useTheme();
	const [currentPage, setCurrentPage] = React.useState(0);
	const [showAddItem, setShowAddItem] = React.useState(false);
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
			<Box className="app-content">
				<ShoppingList />
			</Box>
			<BottomSheet show={showAddItem} setShow={setShowAddItem}></BottomSheet>
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation
					showLabels
					value={currentPage}
					onChange={(event, newCurrentPage) => {
						setCurrentPage(newCurrentPage);
					}}>
					<BottomNavigationAction label="List" icon={<RestoreIcon />} />
					<BottomNavigationAction onClick={() => setShowAddItem(!showAddItem)} id="add-button" icon={<AddIcon id="add-button-icon" />} />
					<BottomNavigationAction label="Settings" icon={<LocationOnIcon />} />
				</BottomNavigation>
			</Paper>
		</Box>
	);
}

const gradientBackground = (theme) => {
	return {
		background: `linear-gradient(0deg, rgba(0,0,0,1) -150%, ${alpha(theme.palette.background.default, 1)} 100%)`,
	};
};
export default DefaultLayout;
