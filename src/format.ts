import {invertHashTable} from './utils';

export const multiplierPowers = {
	bit: -3,
	byte: 0,
	kb: 10,
	mb: 20,
	gb: 30,
	tb: 40,
	pb: 50,
	eb: 60,
	zb: 70,
	yb: 80
};

const invertedMultipliers = invertHashTable(multiplierPowers) as {[key: number]: keyof typeof multiplierPowers};

function capitalizeMultiplier(multiplier: string) {
	switch (multiplier) {
		case 'bit': return 'Bits';
		case 'byte': return 'Bytes';
		default: return multiplier.toUpperCase();
	}
}

export type StaticFormat = keyof typeof multiplierPowers | 'auto';

export type FuncFormatter = ((size: number) => string | number);

export type Format = StaticFormat | FuncFormatter;

export function formatSize(format: Format, size: number): string | number {
	if (typeof format === 'function') {
		return (format as FuncFormatter)(size);
	}
	const staticFormat = format.toLowerCase() as StaticFormat;
	if (staticFormat in multiplierPowers) {
		const power = multiplierPowers[staticFormat as keyof typeof multiplierPowers];
		return size * (1 / 2 ** power) + ' ' + capitalizeMultiplier(staticFormat);
	}
	if (staticFormat === 'auto') {
		const scale = Math.floor(Math.log(size) / Math.log(1024)) * 10;
		let unit = invertedMultipliers[scale];
		if (!unit) {
			unit = scale > 80 ? 'yb' : 'byte';
		}
		return formatSize(unit, size);
	}
	console.error(`Bad format [${staticFormat}]`);
	return formatSize('byte', size);
}
