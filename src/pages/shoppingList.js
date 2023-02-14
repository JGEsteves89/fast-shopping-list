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

	return (
		<Box className="shopping-list-container">
			{shoppingListItems.map((item) => (
				<ShoppingItem key={item.id} item={{ ...item }} />
			))}
		</Box>
	);
}

export default ShoppingList;
