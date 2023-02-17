import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import useStore from '../store/store.js';
import ShoppingItem from '../components/shoppingItem';
import './shoppingList.css';

const sortByBought = (a, b) => (a.bought ? 1 : -1) - (b.bought ? 1 : -1);
const sortByItemOrder = (a, b) => a.order - b.order;

function ShoppingList() {
	const shoppingItems = useStore((state) => state.shoppingList);
	const deleteShoppingItem = useStore((state) => state.deleteShoppingItem);
	const [shoppingListItems, setShippingListItems] = useState([]);

	useEffect(() => {
		//console.log('Use effect from shopping list');
		setSortedShoppingListItems(shoppingItems);
	}, [shoppingItems]);

	const setSortedShoppingListItems = (list) => {
		const sorted = [...list].sort(sortByItemOrder).sort(sortByBought);
		setShippingListItems(sorted);
	};
	const clearList = () => {
		for (const item of shoppingItems) {
			deleteShoppingItem(item.id);
		}
	};
	return (
		<Box
			className="shopping-list-container"
			sx={{
				width: '100%',
				position: 'relative',
				overflow: 'auto',
				maxHeight: '82vh',
				'& ul': { padding: 0 },
			}}>
			{shoppingListItems.length === 0 ? (
				<h3>No items on the shopping list</h3>
			) : (
				shoppingListItems.map((item) => <ShoppingItem key={item.id} item={{ ...item }} />)
			)}
			<Button onClick={() => clearList()} className="center-button" color="secondary">
				Clear list
			</Button>
		</Box>
	);
}

export default ShoppingList;
