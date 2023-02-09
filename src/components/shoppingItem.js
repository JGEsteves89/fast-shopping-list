import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

import './shoppingItem.css';

function ShoppingItem(props) {
	const emitOnChange = props.onChange;
	const [item, setItem] = useState(props.item);

	const theme = useTheme();
	const taskIcon = (bought) => {
		return bought ? <TaskAltSharpIcon /> : <PanoramaFishEyeSharpIcon />;
	};
	const getClass = (className) => {
		return item.bought ? className + ' ' + className + '-bought' : className;
	};
	const toggleItemBought = () => {
		const cpyItem = { ...item };
		cpyItem.bought = !cpyItem.bought;
		setItem(cpyItem);
		emitOnChange(cpyItem);
	};

	return (
		<Card className={getClass('item-card')} sx={{ backgroundColor: 'background.paper' }}>
			<IconButton onClick={toggleItemBought} aria-label="bought" sx={{ color: theme.palette.text.primary, mr: 1 }}>
				{taskIcon(item.bought)}
			</IconButton>
			<Box>
				<Typography variant="h6"> {item.name}</Typography>
				{item.qty !== 1 && (
					<Typography color="secondary" variant="subtitle2">
						{item.qty} items
					</Typography>
				)}
			</Box>
			<IconButton size="large" edge="start" aria-label="menu" color="secondary" sx={{ mr: 2 }}>
				<MenuIcon />
			</IconButton>
		</Card>
	);
}

export default ShoppingItem;
