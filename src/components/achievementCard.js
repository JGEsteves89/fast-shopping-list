import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { renderToStaticMarkup } from 'react-dom/server';
import './achievementCard.css';

const WaveSvgBanner = (theme) => {
	return (
		<svg width="100%" height="100%" viewBox="0 0 447 120" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				opacity="0.4"
				d="M55.2678 22.3777C-49.5465 -14.1611 7.16534 -48.8529 136.242 -34.0647L214.579 -30.0724L448.26 -8.82579L459.956 104.858C396.401 148.386 406.862 51.7166 297.501 67.1292C188.139 82.5419 225.278 33.322 176.928 20.0906C128.579 6.8592 91.4243 34.9821 55.2678 22.3777Z"
				fill={theme.palette.background.default}></path>
		</svg>
	);
};

function AchievementCard(props) {
	const theme = useTheme();
	const svgString = encodeURIComponent(renderToStaticMarkup(WaveSvgBanner(theme)));
	const achievement = props.achievement;
	return (
		<Card className="achievement-card" sx={{ backgroundColor: 'background.paper', backgroundImage: `url("data:image/svg+xml,${svgString}")` }}>
			<Typography color="secondary" variant="subtitle2">
				{achievement.title}
			</Typography>
			<Typography variant="h4">
				{achievement.currentValue}
				{achievement.unit}
			</Typography>
			<Box sx={{ opacity: 0.3, minHeight: 100, backgroundColor: 'gray' }}></Box>
			<Box sx={{ display: 'inline-flex', gap: 0.5, pt: 2 }}>
				<Typography color="secondary" variant="subtitle2">
					Your goal is
				</Typography>
				<Typography variant="subtitle" sx={{ mt: -0.27 }}>
					{achievement.targetValue}
					{achievement.unit}
				</Typography>
				<Typography color="secondary" variant="subtitle2">
					this year
				</Typography>
			</Box>
		</Card>
	);
}

export default AchievementCard;
