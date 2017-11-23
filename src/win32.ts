import {exec as cmd} from 'child_process';
import {Part, HddInfo} from './index';

function getTotal(parts: Part[]) {
	return parts.reduce((total, part) => {
		total.size += part.size;
		total.free += part.free;
		return total;
	}, {
		size: 0,
		free: 0
	});
}

/*
	[wmic logicaldisk get size,freespace,caption,volumename] output example:

	Caption  FreeSpace     Size          VolumeName
	C:       497654161408  539028877312  System
	D:

*/

export function parseWin32Output(output: string): HddInfo {
	const lines = output
		.split('\n');
	const labelOffset = lines[0].indexOf('VolumeName');
	const parts = lines
		.slice(1) // remove header
		.map(line => {
			const [letter, free, size] = line.split(/[\s]+/g);
			let partInfo: Part = {
				place: letter,
				letter,
				free: parseInt(free),
				size: parseInt(size)
			};
			if (labelOffset !== -1) {
				partInfo.label = line.slice(labelOffset).trim();
			}
			if (
				isNaN(partInfo.free) ||
				isNaN(partInfo.size) ||
				partInfo.place === ''
			) {
				return null;
			}
			return partInfo;
		})
		.filter(part => {
			return !!part;
		}) as Part[];
	return {
		parts,
		total: getTotal(parts)
	};
}

export const win32Cmd = 'wmic logicaldisk get size,freespace,caption,volumename';
