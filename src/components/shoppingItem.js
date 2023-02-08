import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './shoppingItem.css';

function ShoppingItem(props) {
	const item = props.item;
	return (
		<Card className="item-card" sx={{ backgroundColor: 'background.paper' }}>
			<Typography color="secondary" variant="subtitle2">
				{item.name}
			</Typography>
			<Typography variant="h4">{item.qty}</Typography>
		</Card>
	);
}

export default ShoppingItem;
