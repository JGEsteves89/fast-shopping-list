import { create } from 'zustand';
import uuid from 'react-uuid';

import api from '../api/firebase.js';
import { normalizeString } from '../utils/utils.js';
import MyDate from '../utils/myDate.js';

const newListItem = (name, id = uuid(), stock = 0, order = 1000000) => {
	return { id, name, searchable: normalizeString(name), stock, order };
};
const newShoppingItem = (itemId, name, order, id = uuid(), qty = 1, bought = false) => {
	return { id, itemId, qty, bought, name, order };
};

const swapInFront = (list, beforeInd, afterInd) => {
	const before = list.splice(beforeInd, 1);
	list.splice(afterInd, 0, before[0]);
};
const setShoppingListOrder = (itemId, shoppingList, itemsList) => {
	const beforeIds = shoppingList.filter((i) => !i.bought && i.itemId !== itemId).map((i) => i.itemId);
	const afterIds = shoppingList.filter((i) => i.bought && i.itemId !== itemId).map((i) => i.itemId);

	const sortedList = itemsList.sort((a, b) => a.order - b.order);
	let curInd = sortedList.findIndex((i) => i.id === itemId);
	for (const beforeId of beforeIds) {
		const beforeInd = sortedList.findIndex((i) => i.id === beforeId);
		if (beforeInd <= curInd) {
			swapInFront(sortedList, curInd, beforeInd);
			curInd = beforeInd;
		}
	}
	for (const afterId of afterIds) {
		const afterInd = sortedList.findIndex((i) => i.id === afterId);
		if (curInd <= afterInd) {
			swapInFront(sortedList, afterInd, curInd);
		}
	}
	for (let i = 0; i < sortedList.length; i++) {
		sortedList[i].order = i;
	}
	return sortedList;
};

const useStore = create((set, get) => ({
	loading: true,
	itemsList: [],
	shoppingList: [],
	shoppingHistory: [],
	addShoppingItem: (itemName) => {
		//console.log('Trying to add new item', itemName);
		if (itemName) {
			const newItemsList = [...get().itemsList];
			let foundItem = newItemsList.find((i) => i.searchable === normalizeString(itemName));
			if (!foundItem) {
				foundItem = newListItem(itemName);
				//console.log('Store => Created a new item ' + foundItem.name);
				newItemsList.push(foundItem);
			}

			const newShoppingList = [...get().shoppingList];
			const shoppingItem = newShoppingList.find((i) => i.itemId === foundItem.id);
			if (!shoppingItem) {
				//console.log('Store => Add item to shopping list ' + foundItem.name);
				const newShoppingListItem = newShoppingItem(foundItem.id, foundItem.name, foundItem.order);
				newShoppingList.push(newShoppingListItem);
				set((state) => ({ shoppingList: newShoppingList, itemsList: newItemsList }));
				get().save();
			}
		}
	},
	addSeveralShoppingItem: (itemNames) => {
		const separators = [' e ', ' and ', ', '];
		let separator = '';
		for (const sep of separators) {
			if (itemNames.includes(sep)) {
				separator = ';';
				itemNames = itemNames.replaceAll(sep, separator);
			}
		}
		if (separator) {
			for (const itemName of itemNames.split(separator)) {
				console.log('Adding', itemName);
				get().addShoppingItem(itemName);
			}
		} else {
			console.log('Adding', itemNames);
			get().addShoppingItem(itemNames);
		}
	},

	changeItemName: (id, itemName) => {
		if (itemName) {
			const newItemsList = [...get().itemsList];
			const foundItem = newItemsList.find((i) => i.id === id);
			//console.log('Store => Changing name of', foundItem.name, 'to', itemName);
			foundItem.name = itemName;
			foundItem.searchable = normalizeString(itemName);

			const newShoppingList = [...get().shoppingList];
			newShoppingList.find((i) => i.itemId === id).name = itemName;

			set((state) => ({ shoppingList: newShoppingList, itemsList: newItemsList }));
			get().save();
		}
	},
	setItemBought: (id, bought) => {
		let newShoppingList = [...get().shoppingList];
		const shoppingItem = newShoppingList.find((i) => i.id === id);
		if (shoppingItem && shoppingItem.bought !== bought) {
			//console.log('Store => State of item ' + shoppingItem.name + ' bought changed to ', bought);
			shoppingItem.bought = bought;
			if (bought) {
				let newItemsList = [...get().itemsList];
				newItemsList = setShoppingListOrder(shoppingItem.itemId, newShoppingList, newItemsList);
				newShoppingList = prepareShoppingList(newShoppingList, newItemsList);
				get().addShoppingHistory(shoppingItem.itemId, shoppingItem.qty);
				set((state) => ({ shoppingList: newShoppingList, itemsList: newItemsList }));
			} else {
				get().removeShoppingHistory(shoppingItem.itemId);
				set((state) => ({ shoppingList: newShoppingList }));
			}

			get().save();
		}
	},
	addShoppingHistory: (itemId, qty) => {
		const newShoppingHistory = [...get().shoppingHistory];
		const today = new MyDate();

		const alreadyIn = newShoppingHistory.find((i) => i.itemId === itemId && i.date === today.toString());
		if (!alreadyIn) {
			//console.log('Store => Adding history of shopping', itemId);
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
			//console.log('Store => Removing history of shopping', itemId);
			set((state) => ({ shoppingHistory: newShoppingHistory.filter((i) => i.itemId !== itemId || i.date !== today.toString()) }));
			// saved will be done on setItemBought
		}
	},
	addShoppingItemQuantity: (id, qty) => {
		const newShoppingList = [...get().shoppingList];
		const shoppingItem = newShoppingList.find((i) => i.id === id);
		if (shoppingItem && shoppingItem.qty + qty !== 0) {
			//console.log('Store => State of item ' + shoppingItem.name + ' qty changed to ', shoppingItem.qty + qty);
			shoppingItem.qty += qty;
			set((state) => ({ shoppingList: newShoppingList }));
			get().save();
		}
	},
	getTrendStats: (itemId) => {
		return calculateTrendStats(itemId, get().shoppingHistory, get().itemsList);
	},
	deleteShoppingItem: (id) => {
		//console.log('Store => Delete item ' + id);
		const newShoppingList = [...get().shoppingList].filter((i) => i.id !== id);
		set((state) => ({ shoppingList: newShoppingList }));
		get().save();
	},
	fetch: async () => {
		const data = await api.getData();
		const { itemsList, shoppingList, shoppingHistory } = prepareAllData(data);
		// for (const hit of shoppingHistory) {
		// 	const foundItem = itemsList.find((i) => i.id === hit.itemId);
		// 	console.log(foundItem.name, hit.date);
		// }
		set((state) => ({ itemsList, shoppingList, shoppingHistory, loading: false }));
	},
	save: async () => {
		const data = get();
		const { itemsList, shoppingList, shoppingHistory } = data;
		return api.postData({ itemsList, shoppingList, shoppingHistory });
	},
}));

const prepareShoppingList = (shoppingList, itemsList) => {
	return shoppingList.map((i) => {
		const item = itemsList.find((ii) => ii.id === i.itemId);
		const name = item.name;
		const order = item.order;
		return { ...i, ...{ name, order } };
	});
};

const prepareItemsListList = (itemsList, shoppingHistory) => {
	return itemsList.map((i) => {
		const searchable = normalizeString(i.name);
		const stock = calculateTrendStats(i.id, shoppingHistory).expectedStock;

		return { ...i, ...{ searchable, stock } };
	});
};

const prepareAllData = (data) => {
	const shoppingHistory = data.shoppingHistory || [];

	const itemsList = prepareItemsListList(data.itemsList || [], shoppingHistory);
	const shoppingList = prepareShoppingList(data.shoppingList || [], itemsList);

	return { itemsList, shoppingList, shoppingHistory };
};
const calculateTrendStats = (itemId, history, itemsList) => {
	const purchases = history
		.filter((i) => i.itemId === itemId)
		.sort((a, b) => MyDate.compareMyDateStr(a.date, b.date))
		.splice(0, 5)
		.reverse();

	if (purchases.length < 2) {
		//console.log(itemName, 'Item bougth only', purchases.length, 'time');
		return { avgWeek: 0, expectedStock: 0 };
	}
	const totalAmountOfDays = new MyDate().daysDiff(MyDate.parse(purchases[0].date));
	const totalAmountBougth = purchases.reduce((prev, cur) => (prev += cur.qty), 0);
	const avgWeek = totalAmountOfDays > 0 ? (totalAmountBougth / totalAmountOfDays) * 7 : 0;
	const lastPurchase = purchases[purchases.length - 1];
	const lastQtyPurchase = lastPurchase.qty;
	const lastPurchaseDaysAgo = new MyDate().daysDiff(MyDate.parse(lastPurchase.date));
	const shouldBeIgnore = lastPurchaseDaysAgo * (1 / avgWeek) > 150;
	const expectedStock = shouldBeIgnore ? 0 : lastQtyPurchase - lastPurchaseDaysAgo * (avgWeek / 7);

	return { avgWeek, expectedStock };
};

export default useStore;
