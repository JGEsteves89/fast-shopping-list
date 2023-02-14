class MyDate {
	constructor(date = new Date()) {
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
	}
	toString() {
		return `${this.year.toString()}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
	}
}

MyDate.parse = (str) => {
	const year = +str.slice(0, 4);
	const month = +str.slice(5, 7);
	const day = +str.slice(8, 10);
	return new MyDate(new Date(year, month - 1, day));
};
export default MyDate;
