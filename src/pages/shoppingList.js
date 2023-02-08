import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import ShoppingItem from '../components/shoppingItem';
function ShoppingList() {
	const [shoppingListItems, setShippingListItems] = useState([]);
	useEffect(() => {
		const rows = [
			{ id: 1000, qty: 1001, name: 'bananas' },
			{ id: 2, qty: 2, name: 'queijo' },
			{ id: 3, qty: 3, name: 'batatas' },
			{ id: 4, qty: 1, name: 'chouriço' },
		];
		setShippingListItems(rows);
	}, []);
	return (
		<Paper sx={{ padding: '1rem', margin: '1rem', width: 'auto' }}>
			{shoppingListItems.map((item) => (
				<ShoppingItem key={item.id} item={{ ...item }} />
			))}
		</Paper>
	);
}

export default ShoppingList;
