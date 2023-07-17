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

// const swapInFront = (list, beforeInd, afterInd) => {
// 	const before = list.splice(beforeInd, 1);
// 	list.splice(afterInd, 0, before[0]);
// };
const setShoppingListOrder = (itemId, shoppingList, itemsList) => {
	// const beforeIds = shoppingList.filter((i) => !i.bought && i.itemId !== itemId).map((i) => i.itemId);
	const boughtItemsIds = shoppingList.filter((i) => i.bought && i.itemId !== itemId).map((i) => i.itemId);

	const sortedList = itemsList.sort((a, b) => a.order - b.order);
	const item = itemsList.find((i) => i.id === itemId);
	if (item.order === 1000000 || item.name === 'Salsa') {
		const boughtItems = itemsList.filter((i) => boughtItemsIds.includes(i.id));
		item.order = boughtItems.length === 0 ? 1 : boughtItems.sort((a, b) => b.order - a.order)[0].order + 0.5;
	}
	// let curInd = sortedList.findIndex((i) => i.id === itemId);
	// for (const beforeId of beforeIds) {
	// 	const beforeInd = sortedList.findIndex((i) => i.id === beforeId);
	// 	if (beforeInd <= curInd) {
	// 		swapInFront(sortedList, curInd, beforeInd);
	// 		curInd = beforeInd;
	// 	}
	// }
	// for (const afterId of afterIds) {
	// 	const afterInd = sortedList.findIndex((i) => i.id === afterId);
	// 	if (curInd <= afterInd) {
	// 		swapInFront(sortedList, afterInd, curInd);
	// 	}
	// }
	// const somthing = [
	// 	{ order: 0, name: 'Café', section: 1 },
	// 	{ order: 1, name: 'Bolachas', section: 11 },
	// 	{ order: 2, name: 'Legumes para a sopa', section: 10 },
	// 	{ order: 3, name: 'Cenouras', section: 10 },
	// 	{ order: 4, name: 'Fruta', section: 3 },
	// 	{ order: 5, name: 'Fiambre', section: 5 },
	// 	{ order: 6, name: 'Queijo', section: 5 },
	// 	{ order: 7, name: 'Bacon', section: 5 },
	// 	{ order: 8, name: 'Leite', section: 19 },
	// 	{ order: 9, name: 'Leite sem lactose', section: 19 },
	// 	{ order: 10, name: 'Água com gás', section: 21 },
	// 	{ order: 11, name: 'Ovos', section: 19 },
	// 	{ order: 12, name: 'Sumos pacotinhos', section: 21 },
	// 	{ order: 13, name: 'Iogurtes', section: 15 },
	// 	{ order: 14, name: 'Sabonete', section: 18 },
	// 	{ order: 15, name: 'Limpa vidros', section: 14 },
	// 	{ order: 16, name: 'Detergente Louça', section: 14 },
	// 	{ order: 17, name: 'Feijão vermelho', section: 13 },
	// 	{ order: 18, name: 'Cevada', section: 1 },
	// 	{ order: 19, name: 'Pão de forma', section: 2 },
	// 	{ order: 20, name: 'Bananas', section: 3 },
	// 	{ order: 21, name: 'Salada', section: 5 },
	// 	{ order: 22, name: 'Nozes', section: 11 },
	// 	{ order: 23, name: 'Chocolate em pó', section: 1 },
	// 	{ order: 24, name: 'Pasta dos dentes', section: 14 },
	// 	{ order: 25, name: 'Manteiga', section: 6 },
	// 	{ order: 26, name: 'Manteiga de amendoim', section: 12 },
	// 	{ order: 27, name: 'Skyr', section: 15 },
	// 	{ order: 28, name: 'Chocolate', section: 11 },
	// 	{ order: 29, name: 'Carne picada', section: 6 },
	// 	{ order: 30, name: 'Costeletas', section: 6 },
	// 	{ order: 31, name: 'Comida de gato', section: 18 },
	// 	{ order: 32, name: 'Biscoitos Ringo', section: 18 },
	// 	{ order: 33, name: 'Acendalhas', section: 19 },
	// 	{ order: 34, name: 'Toalhitas', section: 20 },
	// 	{ order: 35, name: 'Papel higiénico', section: 14 },
	// 	{ order: 36, name: 'Nectarinas', section: 3 },
	// 	{ order: 37, name: 'Bifes de vaca', section: 6 },
	// 	{ order: 38, name: 'Molho Bechamel', section: 20 },
	// 	{ order: 39, name: 'Queijo ralado', section: 7 },
	// 	{ order: 40, name: 'Frango', section: 8 },
	// 	{ order: 41, name: 'Tomate em pedaços', section: 12 },
	// 	{ order: 42, name: 'Pizza', section: 5 },
	// 	{ order: 43, name: 'Cebolas', section: 10 },
	// 	{ order: 44, name: 'Pão', section: 2 },
	// 	{ order: 45, name: 'Farinha c/ fermento', section: 19 },
	// 	{ order: 46, name: 'Pão de hambúrguer', section: 2 },
	// 	{ order: 47, name: 'Hambúrguer', section: 6 },
	// 	{ order: 48, name: 'Salsichas', section: 13 },
	// 	{ order: 49, name: 'Coentros', section: 3 },
	// 	{ order: 50, name: 'Peixe', section: 4 },
	// 	{ order: 51, name: 'Alho', section: 10 },
	// 	{ order: 52, name: 'Pão de cachorro ', section: 2 },
	// 	{ order: 53, name: 'Maionese', section: 6 },
	// 	{ order: 54, name: 'Polpa de tomate', section: 12 },
	// 	{ order: 55, name: 'Bifes de peru ou frango', section: 8 },
	// 	{ order: 56, name: 'Natas', section: 20 },
	// 	{ order: 57, name: 'Arroz', section: 13 },
	// 	{ order: 58, name: 'Tomate', section: 10 },
	// 	{ order: 59, name: 'Tortellini', section: 7 },
	// 	{ order: 60, name: 'Pescada', section: 9 },
	// 	{ order: 61, name: 'Pimento', section: 10 },
	// 	{ order: 62, name: 'Batatas', section: 10 },
	// 	{ order: 63, name: 'Feijão de manteiga', section: 13 },
	// 	{ order: 64, name: 'Cogumelos ', section: 13 },
	// 	{ order: 65, name: 'Aipo', section: 10 },
	// 	{ order: 66, name: 'Corgete', section: 10 },
	// 	{ order: 67, name: 'Manga', section: 3 },
	// 	{ order: 68, name: 'Coxas de frango', section: 8 },
	// 	{ order: 69, name: 'Gengibre', section: 10 },
	// 	{ order: 70, name: 'Alho francês', section: 10 },
	// 	{ order: 71, name: 'Maças', section: 3 },
	// 	{ order: 72, name: 'Tangerinas', section: 3 },
	// 	{ order: 73, name: 'Pastilhas para a máquina', section: 14 },
	// 	{ order: 74, name: 'Peito de frango', section: 8 },
	// 	{ order: 75, name: 'Carne picada de frango', section: 8 },
	// 	{ order: 76, name: 'Salsicha fresca', section: 5 },
	// 	{ order: 77, name: 'Alheira', section: 5 },
	// 	{ order: 78, name: 'Agrião', section: 5 },
	// 	{ order: 79, name: 'Papel de cozinha', section: 14 },
	// 	{ order: 80, name: 'Detergente Roupa', section: 18 },
	// 	{ order: 81, name: 'Amaciador', section: 18 },
	// 	{ order: 82, name: 'Detergente para Manchas', section: 18 },
	// 	{ order: 83, name: 'Detergente recém nascido', section: 18 },
	// 	{ order: 84, name: 'Sal Grosso', section: 6 },
	// 	{ order: 85, name: 'Chocapic', section: 19 },
	// 	{ order: 86, name: 'Pilhas AAA', section: 19 },
	// 	{ order: 87, name: 'Atum em água', section: 13 },
	// 	{ order: 88, name: 'Lenços de papel ', section: 14 },
	// 	{ order: 89, name: 'Croutons', section: 8 },
	// 	{ order: 90, name: 'Massa cotovelos', section: 13 },
	// 	{ order: 91, name: 'Creme gordo', section: 14 },
	// 	{ order: 92, name: 'Comida para o cão', section: 18 },
	// 	{ order: 93, name: 'Atum', section: 13 },
	// 	{ order: 94, name: 'Brócolos', section: 10 },
	// 	{ order: 95, name: 'Gás natural', section: 22 },
	// 	{ order: 96, name: 'Puré de batata', section: 19 },
	// 	{ order: 97, name: 'Bicarbonato de sódio', section: 19 },
	// 	{ order: 98, name: 'Meias de compressão', section: 23 },
	// 	{ order: 99, name: 'Batata frita congelada', section: 20 },
	// 	{ order: 100, name: 'Sumos ', section: 21 },
	// 	{ order: 101, name: 'Azeite', section: 12 },
	// 	{ order: 102, name: 'Farinha', section: 19 },
	// 	{ order: 103, name: 'Bolo', section: 4 },
	// 	{ order: 104, name: 'Açucar', section: 19 },
	// 	{ order: 105, name: 'Esparguete', section: 13 },
	// 	{ order: 106, name: 'Ceriais c/ fibra', section: 19 },
	// 	{ order: 107, name: 'Esfregão da loiça', section: 14 },
	// 	{ order: 108, name: 'Vinho tempero', section: 13 },
	// 	{ order: 109, name: 'Gelado', section: 17 },
	// 	{ order: 110, name: 'Batatas fritas', section: 12 },
	// 	{ order: 111, name: 'Queijo feta', section: 7 },
	// 	{ order: 112, name: 'Farritas', section: 2 },
	// 	{ order: 113, name: 'Entradas', section: 24 },
	// 	{ order: 114, name: 'Tostas', section: 8 },
	// ];

	// for (const item of somthing) {
	// 	sortedList.find((i) => i.name === item.name).order = item.section;
	// }
	// // for (let i = 0; i < sortedList.length; i++) {
	// // 	sortedList[i].order = i;
	// // }
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
		return { avgWeek: null, expectedStock: null };
	}
	const totalAmountOfDays = new MyDate().daysDiff(MyDate.parse(purchases[0].date));
	const totalAmountBougth = purchases.reduce((prev, cur) => (prev += cur.qty), 0);
	const avgWeek = totalAmountOfDays > 0 ? (totalAmountBougth / totalAmountOfDays) * 7 : 0.0000001;
	const lastPurchase = purchases[purchases.length - 1];
	const lastQtyPurchase = lastPurchase.qty;
	const lastPurchaseDaysAgo = new MyDate().daysDiff(MyDate.parse(lastPurchase.date));
	const shouldBeIgnore = lastPurchaseDaysAgo * (1 / avgWeek) > 150;
	const expectedStock = shouldBeIgnore ? null : lastQtyPurchase - lastPurchaseDaysAgo * (avgWeek / 7);

	return { avgWeek, expectedStock };
};

export default useStore;
