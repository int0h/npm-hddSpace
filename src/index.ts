import {exec as cmd} from 'child_process';
import * as parseColumns from 'parse-columns';

interface IPart {
	size: number;
	free: number;
	letter?: string;
	mountOn?: string;
	place?: string;
}

interface IHddInfo {
	parts: IPart[];
	total: IPart;
}

function getTotal(parts: IPart[]) {
	return parts.reduce((total, part) => {
		total.size += part.size;
		total.free += part.free;
		return total;
	}, {
		size: 0,
		free: 0
	});
}

interface UnixPart {
	free: number;
	size: number;
	mp: string;
}

type UnixPartField = 'free' | 'mp' | 'size';

interface ExtractTable {
	[id: number]: UnixPartField;
}

function parseDf(output: string): UnixPart[] {
	const extractTable: ExtractTable = {
		3: 'free',
		5: 'mp',
		1: 'size'
	};

	let res: UnixPart[] = [];

	parseColumns(output, {
		transform: (value: string | number, header: string, columnIndex: number, rowIndex: number) => {
			const key: UnixPartField  = extractTable[columnIndex];
			if (!key) {
				return;
			}
			let row: UnixPart = res[rowIndex - 1];
			if (!row) {
				row = {} as UnixPart;
				res[rowIndex - 1] = row;
			}
			if (key !== 'mp') {
				value = Number(value);
			}
			row[key] = value;
		}
	});

	return res;
}

function getUnixInfo(callback: Function) {

	/*
		[df] output example:

		Filesystem	 1K-blocks	Used Available Use% Mounted on
		rootfs		  15506408 1149728  13708188   8% /
		/dev/root	   15506408 1149728  13708188   8% /
		devtmpfs		  447624	   0	447624   0% /dev
		tmpfs			  89548	 208	 89340   1% /run
		tmpfs			   5120	   0	  5120   0% /run/lock
		tmpfs			 179080	   0	179080   0% /run/shm

	*/

	cmd('df -Pk', function(err, output){
		const parsed = parseDf(output.trim());
		let root: any = null;
		const parts: IPart[] = parsed
			.map((part) => {
				const res = {
					size: part.size * 1024,
					free: part.free * 1024,
					place: part.mp,
					mountOn: part.mp
				};
				if (part.mp === '/') {
					root = res;
				}
				return res;
			});
		let resultObj: IHddInfo = {
			parts,
			total: root as IPart
		};
		callback(resultObj);
	});
}

function isNaN(val: number) {
	return val !== val;
}

function getWindowsInfo(callback: Function) {

	/*
		[wmic logicaldisk get size,freespace,caption] output example:

		Caption  FreeSpace	Size
		C:	   1286164480   34359734272
		D:	   1864638464   50925137920
		E:
		F:	   77553082368  990202818560
		G:
		L:


	*/

	cmd('wmic logicaldisk get size,freespace,caption', function(err, output){
		const parts = output
			.split('\n')
			.slice(1) // remove header
			.map(function(line){
				const lineParts = line.split(/[\s]+/g);
				const partInfo: IPart = {
					place: lineParts[0],
					letter: lineParts[0],
					free: parseInt(lineParts[1]),
					size: parseInt(lineParts[2])
				};
				if (
					isNaN(partInfo.free) ||
					isNaN(partInfo.size) ||
					partInfo.place === ''
				) {
					return null;
				}
				return partInfo;
			})
			.filter(function(part){
				return !!part;
			}) as IPart[];
		const resultObj: IHddInfo = {
			parts,
			total: getTotal(parts)
		};
		callback(resultObj);
	});
}

type Formater = string | ((size: number) => (string | number));

interface IFormaters {
	[key: string]: Formater;
}

let formaters = {
	'byte': (size: number) => (size) + ' Bytes',
	'bit': (size: number) => (size * 8) + ' Bits',
	'kb': (size: number) => (size / 1024).toFixed(2) + ' KB',
	'mb': (size: number) => (size / 1024 / 1024).toFixed(2) + ' MB',
	'gb': (size: number) => (size / 1024 / 1024 / 1024).toFixed(2) + ' GB',
	'tb': (size: number) => (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB',
	'pb': (size: number) => (size / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' PB',
	'auto': (size: number) => {
		if (size === 0) {
			return formaters.byte(size);
		}
		const scale = Math.floor(Math.log(size) / Math.log(1024));
		switch (scale) {
			case 0: return formaters.byte(size);
			case 1: return formaters.kb(size);
			case 2: return formaters.mb(size);
			case 3: return formaters.gb(size);
			case 4: return formaters.tb(size);
			default: return formaters.pb(size);
		}
	}
};

export interface IOpts {
	format: Formater;
}

function formatResult(opts: IOpts, res: IHddInfo): IHddInfo {
	let formater: Function = opts.format as Function;
	if (typeof formater !== 'function') {
		formater = (formaters as IFormaters)[(formater as string).toLowerCase()] as Function;
	}
	const newRes: IHddInfo = {
		parts: res.parts.map(part => {
			let newPart: IPart = {
				free: formater(part.free),
				size: formater(part.size),
				place: part.place
			};
			if ('letter' in part) {
				newPart.letter = part.letter;
			}
			if ('mountOn' in part) {
				newPart.mountOn = part.mountOn;
			}
			return newPart;
		}),
		total: {
			free: formater(res.total.free),
			size: formater(res.total.size)
		}
	};
	return newRes;
}

export default function getCrossPlatformInfo(opts: IOpts, callback: Function) {
	if (arguments.length < 2) {
		callback = opts as any as Function;
		opts = {format: (size) => size};
	}
	let func = process.platform === 'win32'
		? getWindowsInfo
		: getUnixInfo;
	func((res: IHddInfo) => {
		callback(formatResult(opts, res));
	});
}
module.exports = getCrossPlatformInfo;
