import {invertHashTable} from './utils';

const multipliers = {
	bit: 8,
	byte: 1,
	kb: 1 / 2 ** 10,
	mb: 1 / 2 ** 20,
	gb: 1 / 2 ** 30,
	tb: 1 / 2 ** 40,
	pb: 1 / 2 ** 50,
	eb: 1 / 2 ** 60,
	zb: 1 / 2 ** 70,
	yb: 1 / 2 ** 80
};

const invertedMultipliers = invertHashTable(multipliers) as {[key: number]: keyof typeof multipliers};

function capitalizeMultiplier(multiplier: string) {
	if (multiplier.length > 2) {
		return multiplier[0].toUpperCase() + multiplier.slice(1);
	}
	return multiplier.toUpperCase();
}

type StaticFormat = keyof typeof multipliers | 'auto';

type FuncFormatter = ((size: number) => string | number);

export type Format = StaticFormat | FuncFormatter;

export function formatSize(format: Format, size: number): string | number {
	if (typeof format === 'function') {
		return (format as FuncFormatter)(size);
	}
	const staticFormat = format.toLowerCase() as StaticFormat;
	if (staticFormat in multipliers) {
		const multiplier = multipliers[staticFormat as keyof typeof multipliers];
		return size * multiplier + ' ' + capitalizeMultiplier(staticFormat);
	}
	if (staticFormat === 'auto') {
		const scale = Math.floor(Math.log(size) / Math.log(1024));
		const unit = invertedMultipliers[scale];
		return formatSize(unit, size);
	}
	console.error(`Bad format [${staticFormat}]`);
	return formatSize('byte', size);
}
