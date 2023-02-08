import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ShoppingItem from '../components/shoppingItem';

function ShoppingList() {
	const [shoppingListItems, setShippingListItems] = useState([]);
	useEffect(() => {
		const rows = [
			{ id: 1000, qty: 1001, name: 'bananas', bought: true },
			{ id: 2, qty: 2, name: 'queijo', bought: false },
			{ id: 3, qty: 3, name: 'batatas', bought: false },
			{ id: 4, qty: 1, name: 'chouriço', bought: false },
		];
		setShippingListItems(rows);
	}, []);
	return (
		<Box sx={{ margin: '1rem', width: 'auto' }}>
			{shoppingListItems.map((item) => (
				<ShoppingItem key={item.id} item={{ ...item }} />
			))}
		</Box>
	);
}

export default ShoppingList;
