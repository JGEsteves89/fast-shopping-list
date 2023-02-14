import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import useStore from '../store/store.js';
import ShoppingItem from '../components/shoppingItem';
import './shoppingList.css';

const defaultSorter = (a, b) => (a.bought ? 1 : -1) - (b.bought ? 1 : -1);

function ShoppingList() {
	const shoppingItems = useStore((state) => state.shoppingList);
	const [shoppingListItems, setShippingListItems] = useState([]);

	useEffect(() => {
		console.log('Use effect from shopping list');
		setSortedShoppingListItems(shoppingItems);
	}, [shoppingItems]);

	const setSortedShoppingListItems = (list) => {
		const sorted = [...list].sort(defaultSorter);
		setShippingListItems(sorted);
	};
	const onItemChange = (item) => {
		console.log('The item', item.name, 'was changed');
		let cpyList = [...shoppingListItems];
		const changedInd = cpyList.findIndex((i) => i.id === item.id);
		cpyList[changedInd] = item;
		cpyList = cpyList.sort(defaultSorter);
		setSortedShoppingListItems(cpyList);
	};
	const onItemDelete = (item) => {
		console.log('The item', item.name, 'was deleted');
		let cpyList = [...shoppingListItems];
		setSortedShoppingListItems(cpyList.filter((i) => i.id !== item.id).sort(defaultSorter));
	};

	return (
		<Box className="shopping-list-container">
			{shoppingListItems.map((item) => (
				<ShoppingItem key={item.id} onChange={onItemChange} onItemDelete={onItemDelete} item={{ ...item }} />
			))}
		</Box>
	);
}

export default ShoppingList;
