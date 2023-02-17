import React from 'react';
import {
	CssBaseline,
	Box,
	Paper,
	AppBar,
	Toolbar,
	Grid,
	IconButton,
	alpha,
	Typography,
	BottomNavigation,
	BottomNavigationAction,
	CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { useTheme } from '@mui/material/styles';

import ShoppingList from '../pages/shoppingList.js';
import ShoppingTrend from '../pages/shoppingTrend.js';
import NewItemBottomSheet from '../components/newItemBottomSheet.js';
import useStore from '../store/store.js';
import './default.css';

function getCurrentPage(currentPage) {
	console.log('Current page', currentPage);
	if (currentPage === 2) {
		return <ShoppingTrend />;
	}
	return <ShoppingList />;
}

function DefaultLayout() {
	const loading = useStore((state) => state.loading);
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
			<Box className="app-content">{loading ? <CircularProgress color="secondary" /> : getCurrentPage(currentPage)}</Box>
			<NewItemBottomSheet show={showAddItem} setShow={setShowAddItem} />
			<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
				<BottomNavigation showLabels value={currentPage} onChange={(event, newCurrentPage) => setCurrentPage(newCurrentPage)}>
					<BottomNavigationAction label="List" icon={<ShoppingBasketOutlinedIcon />} />
					<BottomNavigationAction onClick={() => setShowAddItem(!showAddItem)} id="add-button" icon={<AddIcon id="add-button-icon" />} />
					<BottomNavigationAction label="Settings" icon={<TrendingUpOutlinedIcon />} />
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
