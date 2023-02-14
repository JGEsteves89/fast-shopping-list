import { useEffect, useState } from 'react';

import { IconButton, Typography, Menu, MenuItem, Grow, Box, Card, Input } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';

import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import useStore from '../store/store.js';

import './shoppingItem.css';

function ShoppingItem(props) {
	const setItemBought = useStore((state) => state.setItemBought);
	const deleteShoppingItem = useStore((state) => state.deleteShoppingItem);
	const addShoppingItemQuantity = useStore((state) => state.addShoppingItemQuantity);
	const changeItemName = useStore((state) => state.changeItemName);
	const [menuAnchor, setMenuAnchor] = useState(null);
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [item, setItem] = useState(null);

	useEffect(() => {
		console.log('Use effect from props item', props.item.name);
		setItem(props.item);
	}, [props.item]);

	const theme = useTheme();

	const open = Boolean(menuAnchor);
	const handleMenuClick = (event) => {
		setMenuAnchor(event.currentTarget);
	};
	const handleClose = () => {
		setMenuAnchor(null);
	};

	const taskIcon = (bought) => {
		return bought ? <TaskAltSharpIcon /> : <PanoramaFishEyeSharpIcon />;
	};
	const getClass = (className) => {
		return item.bought ? className + ' ' + className + '-bought' : className;
	};

	const setNewName = (newName) => {
		setIsBeingEdited(false);
		changeItemName(item.itemId, newName);
	};

	const onEnterNewName = (e) => {
		if (e.keyCode === 13) {
			setNewName(e.target.value);
		}
	};

	return (
		item && (
			<Card className={getClass('item-card')} sx={{ backgroundColor: 'background.paper' }}>
				<IconButton
					onClick={() => setItemBought(item.id, !item.bought)}
					aria-label="bought"
					sx={{ color: theme.palette.text.primary, mr: 1 }}>
					{taskIcon(item.bought)}
				</IconButton>
				<Box>
					{isBeingEdited ? (
						<Input fullWidth defaultValue={item.name} onKeyDown={onEnterNewName} onBlur={(e) => setNewName(e.target.value)} />
					) : (
						<Typography onClick={() => setIsBeingEdited(true)} variant="subtitle1">
							{item.name}
						</Typography>
					)}
					{item.qty !== 1 && (
						<Typography color="secondary" variant="subtitle2">
							{item.qty} items
						</Typography>
					)}
				</Box>

				<IconButton onClick={handleMenuClick} size="large" edge="end" aria-label="menu" color="secondary" sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Menu
					id="basic-menu"
					anchorEl={menuAnchor}
					open={open}
					TransitionComponent={Grow}
					TransitionProps={{
						direction: 'left',
						timeout: 500,
						easing: {
							enter: 'cubic-bezier(1,0,.7,.81)',
							exit: 'cubic-bezier(1,0,.7,.81)',
						},
					}}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'center',
						horizontal: 'right',
					}}>
					<MenuItem onClick={() => addShoppingItemQuantity(item.id, 1)}>
						<AddIcon fontSize="small" />
					</MenuItem>
					<MenuItem onClick={() => addShoppingItemQuantity(item.id, -1)}>
						<RemoveIcon fontSize="small" />
					</MenuItem>
					<MenuItem onClick={() => deleteShoppingItem(item.id)}>
						<DeleteOutlineIcon fontSize="small" />
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<ArrowForwardIcon fontSize="small" />
					</MenuItem>
				</Menu>
			</Card>
		)
	);
}

export default ShoppingItem;
