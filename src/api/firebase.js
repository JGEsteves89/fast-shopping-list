// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getDatabase, ref, set, get, child } from 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

logEvent(analytics, 'APP_START');

const api = {
	getData: () => {
		const dbRef = ref(getDatabase());
		logEvent(analytics, 'GET_DATA_EVENT');
		return get(child(dbRef, `api`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					return snapshot.val();
				} else {
					console.error('No data available on the server');
					return {};
				}
			})
			.catch((error) => {
				console.error(error);
				return {};
			});
	},
	postData: (data) => {
		logEvent(analytics, 'POST_DATA_EVENT');
		return set(ref(database, 'api'), data);
	},
};
export default api;
