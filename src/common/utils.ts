const reader = require('any-text');
const fs = require('fs');
const path = require('path');

export function indexes(source, find) {
	if (!source) {
		return [];
	}
	if (!find) {
		return source.split('').map(function (_, i) {
			return i;
		});
	}
	const result = [];
	for (let i = 0; i < source.length; ++i) {
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
		} catch (e) {
			// Hanlde unsupported files for the reader
			resolve([]); // No results
		}
	});
}

export async function getFileContents(pathToFile: string) {
	const rootPath = path.resolve('./');
	return new Promise<string | null>((resolve, reject) => {
		try {
			reader
				.getText(path.resolve(rootPath, pathToFile))
				.then((data) => {
					resolve(data);
				})
				.catch((err) => resolve(null));
		} catch (e) {
			resolve(null); // No results
		}
	});
}

export function wordCount(str: string) {
	const stringArray = str.split(' ');
	let count = 0;
	for (let i = 0; i < stringArray.length; i++) {
		const word = stringArray[i];
		if (/[A-Za-z]/.test(word)) {
			count++;
		}
	}
	return count;
}
