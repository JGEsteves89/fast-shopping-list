import { create } from 'zustand';
import { normalizeString } from '../utils/utils.js';

const allItems = [
	{ id: 1000, name: 'Bananas' },
	{ id: 2, name: 'Queijo' },
	{ id: 3, name: 'Batatas' },
	{ id: 4, name: 'Chourição' },
	{ id: 5, name: 'Chouriço' },
	{ id: 6, name: 'Arroz' },
	{ id: 7, name: 'Feijão' },
	{ id: 8, name: 'Farinha de trigo' },
	{ id: 10, name: 'Manteiga' },
	{ id: 11, name: 'Chá' },
	{ id: 12, name: 'Carne' },
	{ id: 13, name: 'Ovos' },
].map((i) => {
	return { ...i, ...{ searchable: normalizeString(i.name) } };
});
const shoppingList = [
	{ id: 1000, qty: 1001, bought: false },
	{ id: 2, qty: 2, bought: false },
	{ id: 3, qty: 3, bought: false },
	{ id: 4, qty: 1, bought: false },
	{ id: 5, qty: 1, bought: false },
	{ id: 6, qty: 1, bought: false },
	{ id: 7, qty: 1, bought: false },
	{ id: 8, qty: 1, bought: false },
].map((i) => {
	return { ...i, ...{ name: allItems.find((ii) => ii.id === i.id).name } };
});

const useStore = create((set, get) => ({
	itemsList: allItems,
	shoppingList: shoppingList,
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
