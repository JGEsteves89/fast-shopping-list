import { useState, useEffect } from 'react';
import { InputBase, IconButton, ListItem, List, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import useStore from '../store/store.js';
import BottomSheet from './bottomSheet.js';
import { fuzzySort } from '../utils/utils.js';

import './newItemBottomSheet.css';

const shoppingTrendAndHistorySort = (list, searchValue) => {
	if (searchValue) {
		return fuzzySort(list, searchValue, (i) => i.searchable);
	} else {
		return list.sort((a, b) => (!a.stock ? 100 : a.stock) - (!b.stock ? 100 : b.stock));
	}
};

function NewItemBottomSheet(props) {
	const addSeveralShoppingItem = useStore((state) => state.addSeveralShoppingItem);
	const allShoppingItems = useStore((state) => state.itemsList);
	const [show, setShow] = [props.show, props.setShow];
	const [shoppingItems, setShoppingItems] = useState(allShoppingItems);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		//console.log('Use effect from new item');
		setShoppingItems(shoppingTrendAndHistorySort(allShoppingItems, searchValue));
	}, [searchValue, allShoppingItems]);

	const selectOrAddItem = (itemsNames) => {
		setSearchValue('');
		setShow(false);
		addSeveralShoppingItem(itemsNames);
	};

	const onEnterNewName = (e) => {
		if (e.keyCode === 13) {
			selectOrAddItem(e.target.value);
		}
	};
	return (
		<BottomSheet show={show} setShow={setShow}>
			<div className="search">
				<InputBase
					autoFocus
					value={searchValue}
					onKeyDown={onEnterNewName}
					onChange={(e) => setSearchValue(e.target.value)}
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search"
					inputProps={{ 'aria-label': 'search' }}
				/>
				<IconButton onClick={() => selectOrAddItem(searchValue)} color="secondary" type="button" sx={{ p: '10px' }} aria-label="search">
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
						<ListItem key={item.id} className="list-item" onClick={() => selectOrAddItem(item.name)}>
							<ListItemText primary={item.name} />
							{item.stock !== null && <ListItemText secondary={'Estimated stock: ' + item.stock.toFixed(1)} />}
						</ListItem>
					))}
				</List>
			</div>
		</BottomSheet>
	);
}

export default NewItemBottomSheet;
