import {exec as cmd} from 'child_process';
import {Part, HddInfo, getTotal} from './index';

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

export function parseWin32Output(output: string): HddInfo {
	const parts = output
		.split('\n')
		.slice(1) // remove header
		.map(function(line){
			const lineParts = line.split(/[\s]+/g);
			const partInfo: Part = {
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
		}) as Part[];
	return {
		parts,
		total: getTotal(parts)
	};
}

export const win32Cmd = 'wmic logicaldisk get size,freespace,caption';
