import { fuzzy } from 'fast-fuzzy';

export const myFuzzy = (a, b) => {
	const def = fuzzy(a, b);
	if (a.startsWith(b)) return def + 1;
	if (a.includes(b)) return def + 0.5;
	return def;
};

export const normalizeString = (str) =>
	str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim();

export const fuzzySort = (allItemsList, fuzzySearchPattern, strHandle) => {
	if (fuzzySearchPattern) {
		const normSearch = normalizeString(fuzzySearchPattern);
		const matchResults = allItemsList.map((i) => {
			return { item: i, value: myFuzzy(strHandle(i), normSearch) };
		});
		const filteredItems = matchResults.sort((a, b) => b.value - a.value);
		return filteredItems.map((i) => i.item);
	} else {
		return allItemsList;
	}
};
