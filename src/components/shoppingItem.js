import { useEffect, useState, useRef } from 'react';

import { IconButton, Typography, Box, Card, Input } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import EditIcon from '@mui/icons-material/Edit';
import ClickAwayListener from '@mui/base/ClickAwayListener';

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
	const inputRef = useRef(null);

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
		if (newName !== item.name) {
			changeItemName(item.itemId, newName);
		}
	};

	const onEnterNewName = (e) => {
		if (e.keyCode === 13) {
			setNewName(e.target.value);
		}
	};

	return (
		item && (
			<ClickAwayListener onClickAway={() => isBeingEdited && setNewName(inputRef.current.firstChild.value)}>
				<Card className={getClass('item-card')} sx={{ backgroundColor: 'background.paper' }}>
					<IconButton
						onClick={() => setItemBought(item.id, !item.bought)}
						aria-label="bought"
						sx={{ color: theme.palette.text.primary, mr: 1 }}>
						{taskIcon(item.bought)}
					</IconButton>

					<Box sx={{ mx: 1, mt: 0.4 }} onClick={() => !isBeingEdited && setItemBought(item.id, !item.bought)}>
						{isBeingEdited ? (
							<Input
								ref={inputRef}
								fullWidth
								defaultValue={item.name}
								onKeyDown={onEnterNewName}
								onBlur={(e) => setNewName(e.target.value)}
							/>
						) : (
							<Typography variant="subtitle1">{item.name}</Typography>
						)}
						{item.qty !== 1 && (
							<Typography color="secondary" variant="subtitle2">
								{item.qty} items
							</Typography>
						)}
					</Box>

					<Box className="add-remove-buttons">
						<IconButton className="add-remove-button" color="secondary" onClick={() => addShoppingItemQuantity(item.id, 1)}>
							<AddIcon fontSize="34" />
						</IconButton>
						<IconButton className="add-remove-button" color="secondary" onClick={() => addShoppingItemQuantity(item.id, -1)}>
							<RemoveIcon fontSize="34" />
						</IconButton>
					</Box>
					<IconButton size="large" edge="end" aria-label="menu" color="secondary" onClick={() => setIsBeingEdited(true)}>
						<EditIcon />
					</IconButton>
					<IconButton size="large" edge="end" aria-label="menu" color="secondary" onClick={() => deleteShoppingItem(item.id)}>
						<DeleteOutlineIcon />
					</IconButton>
				</Card>
			</ClickAwayListener>
		)
	);
}

export default ShoppingItem;
