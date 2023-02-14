import { useState, useEffect } from 'react';
import { InputBase, IconButton, ListItem, List, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useStore from '../store/store.js';
import BottomSheet from './bottomSheet.js';
import { fuzzySort } from '../utils/utils.js';

import './newItemBottomSheet.css';

function NewItemBottomSheet(props) {
	const allShoppingItems = useStore((state) => state.itemsList);
	const [show, setShow, onAddItem] = [props.show, props.setShow, props.onAddItem];
	const [shoppingItems, setShoppingItems] = useState(allShoppingItems);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		console.log('Use effect from new item');
		setShoppingItems(fuzzySort(allShoppingItems, searchValue, (i) => i.searchable));
	}, [searchValue, allShoppingItems]);

	const addItem = (itemName) => {
		console.log('Pre add item', itemName);
		setShow(false);
		onAddItem(itemName);
	};

	return (
		<BottomSheet show={show} setShow={setShow}>
			<div className="search">
				<InputBase
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search"
					inputProps={{ 'aria-label': 'search' }}
				/>
				<IconButton onClick={() => addItem(searchValue)} color="secondary" type="button" sx={{ p: '10px' }} aria-label="search">
					<AddIcon />
				</IconButton>
			</div>
			<div className="list-results">
				<List
					sx={{
						width: '100%',
						position: 'relative',
						overflow: 'auto',
						maxHeight: '60vh',
						'& ul': { padding: 0 },
					}}>
					{shoppingItems.map((item) => (
						<ListItem key={item.id} className="list-item" onClick={() => addItem(item.name)}>
							<ListItemText primary={item.name} />
						</ListItem>
					))}
				</List>
			</div>
		</BottomSheet>
	);
}

export default NewItemBottomSheet;
