import * as parseColumns from 'parse-columns';
import {exec as cmd} from 'child_process';

import {Part, HddInfo} from './index';

interface UnixPart {
	free: number;
	size: number;
	mp: string;
}

interface ExtractTable {
	[id: number]: keyof UnixPart;
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
			const key: keyof UnixPart = extractTable[columnIndex];
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

/*
		[df] output example:

		Filesystem     1K-blocks    Used Available Use% Mounted on
		rootfs          15506408 1149728  13708188   8% /
		/dev/root       15506408 1149728  13708188   8% /
		devtmpfs          447624       0    447624   0% /dev
		tmpfs              89548     208     89340   1% /run
		tmpfs               5120       0      5120   0% /run/lock
		tmpfs             179080       0    179080   0% /run/shm

	*/

export function parseUnixOutput(output: string): HddInfo {
	const parsed = parseDf(output.trim());
	let root: any = null;
	const parts: Part[] = parsed
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
	return {
		parts,
		total: root as Part
	};
}

export const unixCmd = 'df -Pk';
