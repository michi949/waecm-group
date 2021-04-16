export interface Storage {
  nonce: string, feedItems: any[]
}

function getItem(key: keyof Storage){
	const value = window.localStorage.getItem(key);
	if(value === undefined) return null;
	return JSON.parse(value);
}

export function setItem<T extends keyof Storage, R extends Storage[T]>(key: T, value: R){
	window.localStorage.setItem(key, JSON.stringify(value));
}

export default {getItem, setItem};