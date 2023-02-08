import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AchievementCard from '../components/achievementCard';
import { getAchievements } from '../api/achievementsController';

function AchievementsPage() {
	const [achievements, setAchievements] = useState([]);

	useEffect(() => {
		// console.log('useEffect called');
		// getAchievements().then((data) => setAchievements(data));
	}, []);
	console.log('Achievements page prepare to render');
	//const achievements = [achievementExampleData, achievementExampleData, achievementExampleData];
	return (
		<Box sx={{ flexGrow: 1 }} style={{ minHeight: '200px' }}>
			{achievements.map((achievement) => (
				<AchievementCard key={achievement.id} achievement={{ ...achievement }} />
			))}
		</Box>
	);
}

export default AchievementsPage;
