import {exec} from 'child_process';

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

export interface Opts {
	format: Format;
	output?: string;
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

export interface Callback<T> {
	(err: Error | null, data?: T): void;
}

function runCmd(commandFn: (cb: Callback<string>) => void, parser: OutputParser, callback: Callback<HddInfo>) {
	commandFn((err, output) => {
		if (err) {
			callback(err);
			return;
		}
		try {
			callback(null, parser(output as string));
		} catch (e) {
			callback(new Error('cannot parse output'));
		}
	});
}

const defaultOpts: Opts = {
	format: (size) => size
};

export function getHddInfo(opts: Opts, callback: Callback<FormatedHddInfo>) {
	const [cmd, parser] = process.platform === 'win32'
		? [win32Cmd, parseWin32Output]
		: [unixCmd, parseUnixOutput];
	const fn: (cb: Callback<string>) => void = opts.output
		? cb => cb(null, opts.output)
		: exec.bind(null, cmd);
	runCmd(fn, parser, (err, result) => {
		if (err) {
			callback(err);
			return;
		}
		callback(null, result);
	});
}

export function fetchHddInfo(opts: Opts = defaultOpts): Promise<FormatedHddInfo> {
	return new Promise((resolve, reject) => {
		getHddInfo(opts, (err, res) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(res);
		});
	});
}

export default function getCrossPlatformInfo(opts: Opts, callback: (res: FormatedHddInfo) => void) {
	if (arguments.length < 2) {
		callback = opts as any as (res: FormatedHddInfo) => void;
		opts = defaultOpts;
	}
	getHddInfo(opts, (err, res) => {
		if (err) {
			throw err;
		}
		callback(res as FormatedHddInfo);
	});
}

module.exports = assign(getCrossPlatformInfo, module.exports);
