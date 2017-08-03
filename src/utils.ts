export function invertHashTable(srcObject: any) {
	let res: any = {};
	for (let name in srcObject) {
		const value = srcObject[name];
		res[value] = name;
	}
	return res;
}
