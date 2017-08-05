import {exec as cmd} from 'child_process';

import {assign} from './utils';
import {formatSize, Format} from './format';
import {unixCmd, parseUnixOutput} from './unix';
import {win32Cmd, parseWin32Output} from './win32';

export interface Part {
	size: number;
	free: number;
	letter?: string;
	mountOn?: string;
	place?: string;
}

export interface HddInfo {
	parts: Part[];
	total: Part;
}

export interface FormatedPart {
	size: string | number;
	free: string | number;
	letter?: string | number;
	mountOn?: string;
	place?: string;
}

export interface FormatedHddInfo {
	parts: FormatedPart[];
	total: FormatedPart;
}

export function getTotal(parts: Part[]) {
	return parts.reduce((total, part) => {
		total.size += part.size;
		total.free += part.free;
		return total;
	}, {
		size: 0,
		free: 0
	});
}

export interface Opts {
	format: Format;
}

function formatResult(opts: Opts, res: HddInfo): FormatedHddInfo {
	const formater = (size: number) => formatSize(opts.format, size);
	const newRes: FormatedHddInfo = {
		parts: res.parts.map(part => {
			let newPart: FormatedPart = {
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

type OutputParser = (output: string) => HddInfo;

interface Callback<T> {
	(err: Error | null, data?: T): void;
}

function runCmd(command: string, parser: OutputParser, callback: Callback<HddInfo>) {
	cmd(command, (err, output) => {
		if (err) {
			callback(err);
			return;
		}
		let result: HddInfo;
		try {
			result = parser(output);
			callback(null, result);
		} catch (e) {
			callback(new Error('cannot parse output'));
		}
	});
}

export default function getCrossPlatformInfo(opts: Opts, callback: (res: FormatedHddInfo) => void) {
	if (arguments.length < 2) {
		callback = opts as any as (res: FormatedHddInfo) => void;
		opts = {format: (size) => size};
	}
	const [cmd, parser] = process.platform === 'win32'
		? [win32Cmd, parseWin32Output]
		: [unixCmd, parseUnixOutput];
	runCmd(cmd, parser, (err, res: HddInfo) => {
		if (err) {
			throw err;
		}
		callback(formatResult(opts, res));
	});
}

module.exports = assign(getCrossPlatformInfo, module.exports);
