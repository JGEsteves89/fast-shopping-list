//import axios from 'axios';

export const getAchievements = () => {
	console.log('[GET] /api/achievements ');
	return [];
	// return axios
	// 	.get('http://localhost:3210/api/achievements')
	// 	.then((res) => {
	// 		console.log('[GET] got', res.data);
	// 		return res.data;
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		return null;
	// 	});
};

export const updateAchievement = (data) => {
	console.log('[POST] /api/achievements/', data.id);
	return [];
	// return axios
	// 	.post('http://localhost:3210/api/achievements/' + data.id, data)
	// 	.then((res) => {
	// 		console.log('[POST] got', res.data);
	// 		return res.data;
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		return null;
	// 	});
};
