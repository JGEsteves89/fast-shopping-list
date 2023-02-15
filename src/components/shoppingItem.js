import { useEffect, useState } from 'react';

import { IconButton, Typography, Box, Card, Input } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';

import { useTheme } from '@mui/material/styles';

import useStore from '../store/store.js';

import './shoppingItem.css';

function ShoppingItem(props) {
	const setItemBought = useStore((state) => state.setItemBought);
	const deleteShoppingItem = useStore((state) => state.deleteShoppingItem);
	const addShoppingItemQuantity = useStore((state) => state.addShoppingItemQuantity);
	const changeItemName = useStore((state) => state.changeItemName);
	const [isBeingEdited, setIsBeingEdited] = useState(false);
	const [item, setItem] = useState(null);

	useEffect(() => {
		//console.log('Use effect from props item', props.item.name);
		setItem(props.item);
	}, [props.item]);

	const theme = useTheme();

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
				<Box className="add-remove-buttons">
					<IconButton className="add-remove-button" color="secondary" onClick={() => addShoppingItemQuantity(item.id, 1)}>
						<AddIcon fontSize="34" />
					</IconButton>
					<IconButton className="add-remove-button" color="secondary" onClick={() => addShoppingItemQuantity(item.id, -1)}>
						<RemoveIcon fontSize="34" />
					</IconButton>
				</Box>
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

				<IconButton size="large" edge="end" aria-label="menu" color="secondary" sx={{ mr: 2 }} onClick={() => deleteShoppingItem(item.id)}>
					<DeleteOutlineIcon />
				</IconButton>
			</Card>
		)
	);
}

export default ShoppingItem;
