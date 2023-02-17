import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MyDate from '../utils/myDate.js';
import useStore from '../store/store.js';
import './shoppingTrend.css';

const columns = [
	{ field: 'name', headerName: 'Name', type: 'string', flex: 1, minWidth: 150, sortable: true, editable: false },
	{ field: 'averagePerWeek', headerName: 'Avg', type: 'number', width: 45, sortable: true, editable: false },
	{ field: 'boughtInTheLastWeek', headerName: 'Qtd', type: 'number', width: 45, sortable: true, editable: false },
	{ field: 'estimatedStock', headerName: 'Stock', type: 'number', width: 45, sortable: true, editable: false },
];

function ShoppingTrend() {
	const itemsList = useStore((state) => state.itemsList);
	const shoppingHistory = useStore((state) => state.shoppingHistory);
	const [shoppingTrend, setShoppingTrend] = useState([]);

	useEffect(() => {
		let newShoppingTrend = [];
		for (const item of itemsList) {
			const purchases = shoppingHistory
				.filter((i) => i.itemId === item.id)
				.sort((a, b) => MyDate.compareMyDateStr(a.date, b.date))
				.splice(0, 5);

			let boughtInTheLastWeek = 0;
			const purchasesPerDay = purchases.map((purchase, i) => {
				const nextPurchaseDate = purchase[i + 1] ? purchase[i + 1].date : new MyDate().toString();
				if (MyDate.daysStrDiff(new MyDate().toString(), purchase.date) <= 7) {
					boughtInTheLastWeek += purchase.qty;
				}
				return { qty: purchase.qty, days: MyDate.daysStrDiff(nextPurchaseDate, purchase.date) };
			});
			const averagePerWeek = (
				purchasesPerDay.length < 2 ? 0 : purchasesPerDay.reduce((prev, cur) => (prev += cur.qty / cur.days), 0) * 7
			).toFixed(1);
			const lastBought = purchases.length !== 0 ? purchasesPerDay[purchasesPerDay.length - 1] : { qty: 0, days: 0 };
			const estimatedStock = (lastBought.qty - (averagePerWeek / 7) * lastBought.days).toFixed(1);

			newShoppingTrend.push({ ...item, ...{ averagePerWeek, boughtInTheLastWeek, estimatedStock } });
		}
		setShoppingTrend(newShoppingTrend);
	}, [itemsList, shoppingHistory]);

	return (
		<Box
			className="shopping-list-container"
			sx={{
				width: '100%',
				position: 'relative',
				overflow: 'auto',
				maxHeight: '82vh',
				height: '90vh',
				margin: '1rem',
				'& ul': { padding: 0 },
			}}>
			<span className="side-note">Average and quantity are relative to the last 7 days.</span>
			<DataGrid rows={shoppingTrend} columns={columns} autoPageSize rowsPerPageOptions={[5]} experimentalFeatures={{ newEditingApi: false }} />
		</Box>
	);
}

export default ShoppingTrend;
