import { create } from 'zustand';
import { normalizeString } from '../utils/utils.js';
import uuid from 'react-uuid';

const uuid1 = uuid();
const uuid2 = uuid();
const uuid3 = uuid();
const allItems = [
	{ id: uuid1, name: 'Bananas' },
	{ id: uuid2, name: 'Queijo' },
	{ id: uuid3, name: 'Batatas' },
	{ id: uuid(), name: 'Chourição' },
	{ id: uuid(), name: 'Chouriço' },
	{ id: uuid(), name: 'Arroz' },
	{ id: uuid(), name: 'Feijão' },
	{ id: uuid(), name: 'Farinha de trigo' },
	{ id: uuid(), name: 'Manteiga' },
	{ id: uuid(), name: 'Chá' },
	{ id: uuid(), name: 'Carne' },
	{ id: uuid(), name: 'Ovos' },
].map((i) => {
	return { ...i, ...{ searchable: normalizeString(i.name) } };
});
const shoppingList = [
	{ id: uuid(), qty: 1, itemId: uuid1, bought: true },
	{ id: uuid(), qty: 2, itemId: uuid2, bought: false },
	{ id: uuid(), qty: 3, itemId: uuid3, bought: false },
].map((i) => {
	return { ...i, ...{ name: allItems.find((ii) => ii.id === i.itemId).name } };
});

const useStore = create((set, get) => ({
	itemsList: allItems,
	shoppingList: shoppingList,
	addShoppingItem: (itemName) => {
		console.log('Trying to add new item', itemName);
		if (itemName) {
			const newItemsList = [...get().itemsList];
			let foundItem = newItemsList.find((i) => i.searchable === normalizeString(itemName));
			if (!foundItem) {
				foundItem = { id: uuid(), name: itemName, searchable: normalizeString(itemName) };
				console.log('Store => Created a new item ' + foundItem.name);
				newItemsList.push(foundItem);
			}

			const newShoppingList = [...get().shoppingList];
			const shoppingItem = newShoppingList.find((i) => i.id === foundItem.id);
			if (!shoppingItem) {
				console.log('Store => Add item to shopping list ' + foundItem.name);
				newShoppingList.push({ id: uuid(), itemId: foundItem.id, qty: 1, bought: false, name: foundItem.name });
				set((state) => ({ shoppingList: newShoppingList, itemsList: newItemsList }));
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
		}
	},
	setItemBought: (id, bought) => {
		const newShoppingList = [...get().shoppingList];
		const shoppingItem = newShoppingList.find((i) => i.id === id);
		if (shoppingItem && shoppingItem.bought !== bought) {
			console.log('Store => State of item ' + shoppingItem.name + ' bought changed to ', bought);
			shoppingItem.bought = bought;
			set((state) => ({ shoppingList: newShoppingList }));
		}
	},
	addShoppingItemQuantity: (id, qty) => {
		const newShoppingList = [...get().shoppingList];
		const shoppingItem = newShoppingList.find((i) => i.id === id);
		if (shoppingItem && shoppingItem.qty + qty !== 0) {
			console.log('Store => State of item ' + shoppingItem.name + ' qty changed to ', shoppingItem.qty + qty);
			shoppingItem.qty += qty;
			set((state) => ({ shoppingList: newShoppingList }));
		}
	},
	deleteShoppingItem: (id) => {
		console.log('Store => Delete item ' + id);
		const newShoppingList = [...get().shoppingList].filter((i) => i.id !== id);
		set((state) => ({ shoppingList: newShoppingList }));
	},

	increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	removeAllBears: () => set({ bears: 0 }),
}));
export default useStore;
