const get = async () => {
	const response = await fetch('http://localhost:3210/api/data');
	const data = await response.json();
	return data;
};
const post = async (data) => {
	await fetch('http://localhost:3210/api/data', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(data),
	});
};

const api = { get, post };
export default api;
