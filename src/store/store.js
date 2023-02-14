import { create } from 'zustand';
import uuid from 'react-uuid';

import { normalizeString } from '../utils/utils.js';
import MyDate from '../utils/myDate.js';

const newListItem = (name, id = uuid(), stock = 0, order = 0) => {
	return { id, name, searchable: normalizeString(name), stock, order };
};
const newShoppingItem = (itemId, name, id = uuid(), qty = 1, bought = false) => {
	return { id, itemId, qty, bought, name };
};

const useStore = create((set, get) => ({
	itemsList: [],
	shoppingList: [],
	shoppingHistory: [],
	addShoppingItem: (itemName) => {
		console.log('Trying to add new item', itemName);
		if (itemName) {
			const newItemsList = [...get().itemsList];
			let foundItem = newItemsList.find((i) => i.searchable === normalizeString(itemName));
			if (!foundItem) {
				foundItem = newListItem(itemName);
				console.log('Store => Created a new item ' + foundItem.name);
				newItemsList.push(foundItem);
			}

			const newShoppingList = [...get().shoppingList];
			const shoppingItem = newShoppingList.find((i) => i.itemId === foundItem.id);
			if (!shoppingItem) {
				console.log('Store => Add item to shopping list ' + foundItem.name);
				const newShoppingListItem = newShoppingItem(foundItem.id, foundItem.name);
				newShoppingList.push(newShoppingListItem);
				set((state) => ({ shoppingList: newShoppingList, itemsList: newItemsList }));
				get().save();
			}
		}
	},
	changeItemName: (id, itemName) => {
		if (itemName) {
			const newItemsList = [...get().itemsList];
			const foundItem = newItemsList.find((i) => i.id === id);
			console.log('Store => Changing name of', foundItem.name, 'to', itemName);
			foundItem.name = itemName;
			foundItem.searchable = normalizeString(itemName);

			const newShoppingList = [...get().shoppingList];
			newShoppingList.find((i) => i.itemId === id).name = itemName;

			set((state) => ({ shoppingList: newShoppingList, itemsList: newItemsList }));
			get().save();
		}
	},

	setItemBought: (id, bought) => {
		const newShoppingList = [...get().shoppingList];
		const shoppingItem = newShoppingList.find((i) => i.id === id);
		if (shoppingItem && shoppingItem.bought !== bought) {
			console.log('Store => State of item ' + shoppingItem.name + ' bought changed to ', bought);
			shoppingItem.bought = bought;
			if (bought) {
				get().addShoppingHistory(shoppingItem.itemId, shoppingItem.qty);
			} else {
				get().removeShoppingHistory(shoppingItem.itemId);
			}
			set((state) => ({ shoppingList: newShoppingList }));
			get().save();
		}
	},
	addShoppingHistory: (itemId, qty) => {
		const newShoppingHistory = [...get().shoppingHistory];
		const today = new MyDate();

		const alreadyIn = newShoppingHistory.find((i) => i.itemId === itemId && i.date === today.toString());
		if (!alreadyIn) {
			console.log('Store => Adding history of shopping', itemId);
			newShoppingHistory.push({ itemId, qty, date: today.toString() });
			set((state) => ({ shoppingHistory: newShoppingHistory }));
			// saved will be done on setItemBought
		}
	},
	removeShoppingHistory: (itemId) => {
		const newShoppingHistory = [...get().shoppingHistory];
		const today = new MyDate();

		const alreadyIn = newShoppingHistory.find((i) => i.itemId === itemId && i.date === today.toString());
		if (alreadyIn) {
			console.log('Store => Removing history of shopping', itemId);
			set((state) => ({ shoppingHistory: newShoppingHistory.filter((i) => i.itemId !== itemId || i.date !== today.toString()) }));
			// saved will be done on setItemBought
		}
	},
	addShoppingItemQuantity: (id, qty) => {
		const newShoppingList = [...get().shoppingList];
		const shoppingItem = newShoppingList.find((i) => i.id === id);
		if (shoppingItem && shoppingItem.qty + qty !== 0) {
			console.log('Store => State of item ' + shoppingItem.name + ' qty changed to ', shoppingItem.qty + qty);
			shoppingItem.qty += qty;
			set((state) => ({ shoppingList: newShoppingList }));
			get().save();
		}
	},
	deleteShoppingItem: (id) => {
		console.log('Store => Delete item ' + id);
		const newShoppingList = [...get().shoppingList].filter((i) => i.id !== id);
		set((state) => ({ shoppingList: newShoppingList }));
		get().save();
	},
	fetch: async () => {
		const response = await fetch('http://localhost:3210/api/data');
		const data = await response.json();
		const { itemsList, shoppingList, shoppingHistory } = prepareAllData(data);
		set((state) => ({ itemsList, shoppingList, shoppingHistory }));
		get().save();
	},
	save: async () => {
		const data = get();
		await fetch('http://localhost:3210/api/data', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(data),
		}).then(() => console.log('Store => data saved'));
	},
}));
const prepareAllData = (data) => {
	const shoppingHistory = data.shoppingHistory || [];

	const itemsList = data.itemsList.map((i) => {
		const searchable = normalizeString(i.name);
		const stock = calculateStock(i.id, shoppingHistory);

		return { ...i, ...{ searchable, stock } };
	});
	const shoppingList = data.shoppingList.map((i) => {
		const name = itemsList.find((ii) => ii.id === i.itemId).name;
		return { ...i, ...{ name } };
	});

	return { itemsList, shoppingList, shoppingHistory };
};
const calculateStock = (id, history) => {
	const purchases = history
		.filter((i) => i.itemId === id)
		.sort((a, b) => MyDate.compareMyDateStr(a.date, b.date))
		.splice(0, 5);
	if (purchases.length > 3) {
		let purchasesPerDay = 0;
		for (let i = 0; i < purchases.length - 1; i++) {
			const boughtDate = MyDate.parse(purchases[i].date);
			const nextBoughtDate = MyDate.parse(purchases[i + 1].date);
			const days = nextBoughtDate.daysDiff(boughtDate);
			purchasesPerDay += purchases[i].qty / days;
		}

		const averagePerDay = purchasesPerDay / (purchases.length - 1);
		const lastBought = purchases[purchases.length - 1];
		const daysFromLastBought = new MyDate().daysDiff(MyDate.parse(lastBought.date));
		const qty = lastBought.qty;
		const stock = qty - daysFromLastBought * averagePerDay;
		return stock;
	}
	return 0;
};
export default useStore;
