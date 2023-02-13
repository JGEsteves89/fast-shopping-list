import { useState } from 'react';
import Box from '@mui/material/Box';
import ShoppingItem from '../components/shoppingItem';
import './shoppingList.css';
const defaultSorter = (a, b) => (a.bought ? 1 : -1) - (b.bought ? 1 : -1);
function ShoppingList() {
	const [shoppingListItems, setShippingListItems] = useState(
		[
			{ id: 1000, qty: 1001, name: 'bananas', bought: true },
			{ id: 2, qty: 2, name: 'queijo', bought: false },
			{ id: 3, qty: 3, name: 'batatas', bought: false },
			{ id: 4, qty: 1, name: 'chouriço', bought: false },
		].sort(defaultSorter)
	);

	const onItemChange = (item) => {
		console.log('The item', item.name, 'was changed');
		let cpyList = [...shoppingListItems];
		const changedInd = cpyList.findIndex((i) => i.id === item.id);
		cpyList[changedInd] = item;
		cpyList = cpyList.sort(defaultSorter);
		setShippingListItems(cpyList);
	};
	const onItemDelete = (item) => {
		console.log('The item', item.name, 'was deleted');
		let cpyList = [...shoppingListItems];
		setShippingListItems(cpyList.filter((i) => i.id !== item.id).sort(defaultSorter));
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
