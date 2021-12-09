const reader = require('any-text');
const fs = require('fs');
const path = require('path');

export function indexes(source, find) {
	if (!source) {
		return [];
	}
	// if find is empty string return all indexes.
	if (!find) {
		// or shorter arrow function:
		// return source.split('').map((_,i) => i);
		return source.split('').map(function (_, i) {
			return i;
		});
	}
	const result = [];
	for (let i = 0; i < source.length; ++i) {
		// If you want to search case insensitive use
		// if (source.substring(i, i + find.length).toLowerCase() == find) {
		if (source.substring(i, i + find.length) == find) {
			result.push(i);
		}
	}
	return result;
}

export async function searchInContents(search: string, pathToFile: string) {
	const rootPath = path.resolve('./');
	return new Promise<number[]>((resolve, reject) => {
		try {
			reader
				.getText(path.resolve(rootPath, pathToFile))
				.then((data) => {
					const searchResult = indexes(data, search);
					resolve(searchResult);
				})
				.catch((err) => resolve([]));
		} catch (e) { // Hanlde unsupported files for the reader
			resolve([]); // No results
		}
	});
}
