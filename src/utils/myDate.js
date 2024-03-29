class MyDate {
	constructor(date = new Date()) {
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
	}
	toString() {
		return `${this.year.toString()}/${this.month.toString().padStart(2, '0')}/${this.day.toString().padStart(2, '0')}`;
	}
	toDate() {
		return new Date(this.year, this.month - 1, this.day);
	}
	daysDiff(other) {
		const diff = this.toDate().getTime() - other.toDate().getTime();
		return Math.ceil(diff / (1000 * 3600 * 24));
	}
	addDays(days) {
		const date = this.toDate();
		date.setDate(date.getDate() + days);
		return new MyDate(date);
	}
}

MyDate.parse = (str) => {
	const year = +str.slice(0, 4);
	const month = +str.slice(5, 7);
	const day = +str.slice(8, 10);
	return new MyDate(new Date(year, month - 1, day));
};
MyDate.compareMyDateStr = (a, b) => {
	return b.localeCompare(a);
};
MyDate.compareMyDate = (a, b) => {
	return MyDate.compareMyDateStr(a.toString(), b.toString());
};
MyDate.daysStrDiff = (a, b) => {
	return MyDate.parse(a).daysDiff(MyDate.parse(b));
};
export default MyDate;
