import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import useStore from '../store/store.js';
import './shoppingTrend.css';

function ShoppingTrend() {
	const itemsList = useStore((state) => state.itemsList);
	const shoppingHistory = useStore((state) => state.shoppingHistory);
	const getTrendStats = useStore((state) => state.getTrendStats);
	const addShoppingItem = useStore((state) => state.addShoppingItem);
	const [shoppingTrend, setShoppingTrend] = useState([]);
	const [itemsAdded, setItemsAdded] = useState([]);
	const addItem = (item) => {
		// Handle button click for the specific row...
		//console.log(item.name);
		setItemsAdded([...itemsAdded, item.id]);
		addShoppingItem(item.name);
	};
	const columns = [
		{ field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 120, sortable: true, editable: false },
		{ field: 'averagePerWeek', headerName: 'Avg', type: 'number', width: 65, sortable: true, editable: false },
		{ field: 'estimatedStock', headerName: 'Stock', type: 'number', width: 65, sortable: true, editable: false },
		{ field: 'order', headerName: 'Order', type: 'number', width: 65, sortable: true, editable: false },
		{
			field: 'actions',
			headerName: 'Add',
			width: 65,
		},
	];

	useEffect(() => {
		let newShoppingTrend = [];
		for (const item of itemsList) {
			// if (item.name === 'Queijo') {
			const { avgWeek, expectedStock } = getTrendStats(item.id);
			// }
			// const purchases = shoppingHistory
			// 	.filter((i) => i.itemId === item.id)
			// 	.sort((a, b) => MyDate.compareMyDateStr(a.date, b.date))
			// 	.splice(0, 5);

			// let boughtInTheLastWeek = 0;
			// const purchasesPerDay = purchases.map((purchase, i) => {
			// 	const nextPurchaseDate = purchase[i + 1] ? purchase[i + 1].date : new MyDate().toString();
			// 	if (MyDate.daysStrDiff(new MyDate().toString(), purchase.date) <= 7) {
			// 		boughtInTheLastWeek += purchase.qty;
			// 	}
			// 	return { qty: purchase.qty, days: MyDate.daysStrDiff(nextPurchaseDate, purchase.date) };
			// });
			// const totalDays = (purchasesPerDay.length < 2 ? 0 : purchasesPerDay.reduce((prev, cur) => (prev += cur.days), 0)) + 1;
			// const totalPurchases = purchasesPerDay.length < 2 ? 0 : purchasesPerDay.reduce((prev, cur) => (prev += cur.qty), 0);
			// const averagePerWeek = (totalPurchases / totalDays) * 7;
			// const lastBought = purchases.length !== 0 ? purchasesPerDay[purchasesPerDay.length - 1] : { qty: 0, days: 0 };
			// const estimatedStock = lastBought.qty - (averagePerWeek / 7) * lastBought.days;

			newShoppingTrend.push({
				...item,
				...{
					averagePerWeek: !avgWeek || isNaN(+avgWeek) ? 'n/a' : avgWeek.toFixed(1),
					estimatedStock: !expectedStock || isNaN(+expectedStock) ? 'n/a' : expectedStock.toFixed(1),
				},
			});
		}
		newShoppingTrend = newShoppingTrend
			.sort((a, b) => (a.estimatedStock === 'n/a' ? -1000 : a.estimatedStock) - (b.estimatedStock === 'n/a' ? -1000 : b.estimatedStock))
			.sort((a, b) => (a.estimatedStock === 'n/a' ? 1 : -1) - (b.estimatedStock === 'n/a' ? 1 : -1));
		setShoppingTrend(newShoppingTrend);
	}, [itemsList, shoppingHistory, getTrendStats]);

	return (
		<Box
			className="shopping-list-container"
			sx={{
				width: '100%',
				position: 'relative',
				overflow: 'auto',
				maxHeight: '82vh',
				height: '85vh',
				padding: '1rem',
				margin: '1rem',
				'& ul': { padding: 0 },
			}}>
			<span className="side-note">Average and quantity are relative to the last 7 days.</span>
			<TableContainer>
				<Table>
					<TableHead sx={{ border: '1px solid white' }}>
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.field}>{column.headerName}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{shoppingTrend.map((row) => (
							<TableRow key={row.id}>
								{columns.map((column) => {
									if (column.field !== 'actions') return <TableCell key={column.field}>{row[column.field]}</TableCell>;
									return (
										<TableCell key={column.field} sx={{ display: 'flex', flexFlow: 'row' }}>
											<IconButton color="secondary" disabled={itemsAdded.includes(row.id)} onClick={() => addItem(row)}>
												<AddIcon />
											</IconButton>
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}

export default ShoppingTrend;
