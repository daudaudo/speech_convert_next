declare global {
	interface String {
		searchIn(searchText: string): boolean;
	}
}

String.prototype.searchIn = function (searchText: string): boolean {
	return this.toLowerCase().includes(searchText.toLowerCase());
};

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export { capitalizeFirstLetter };
