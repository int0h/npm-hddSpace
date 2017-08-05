export function invertHashTable(srcObject: any) {
	let res: any = {};
	for (let name in srcObject) {
		const value = srcObject[name];
		res[value] = name;
	}
	return res;
}

export function assign(destObj: any, srcObject: any) {
	for (let i in srcObject) {
		destObj[i] = srcObject[i];
	}
	return destObj;
}
