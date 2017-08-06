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

export type OutputFetcher = (cb: Callback<string>) => void;

export interface Opts {
	format: Format;
	output?: string;
	platform?: 'posix' | 'win32';
	fetchOutput?: OutputFetcher;
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
		if (!output || output.trim() === '') {
			callback(new Error('empty output'));
			return;
		}
		try {
			const result = parser(output as string);
			if (result.parts.length === 0) {
				throw new Error('cannot parse output');
			}
			callback(null, result);
		} catch (e) {
			callback(new Error('cannot parse output'));
		}
	});
}

const defaultOpts: Opts = {
	format: (size) => size
};

export function getHddInfo(opts: Opts, callback: Callback<FormatedHddInfo>) {
	const platform = opts.platform || process.platform;
	const [cmd, parser] = platform === 'win32'
		? [win32Cmd, parseWin32Output]
		: [unixCmd, parseUnixOutput];
	const fn: OutputFetcher = opts.fetchOutput || ('output' in opts
		? cb => cb(null, opts.output)
		: exec.bind(null, cmd));
	runCmd(fn, parser, (err, result) => {
		if (err) {
			callback(err);
			return;
		}
		const formatted = formatResult(opts, result as HddInfo);
		callback(null, formatted);
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

export type InfoCallback = (res: FormatedHddInfo) => void;

export default function getCrossPlatformInfo(opts: Opts | InfoCallback, callback?: InfoCallback) {
	if (arguments.length < 2) {
		callback = opts as any as (res: FormatedHddInfo) => void;
		opts = defaultOpts;
	}
	opts = opts as Opts;
	getHddInfo(opts, (err, res) => {
		if (err) {
			throw err;
		}
		(callback as InfoCallback)(res as FormatedHddInfo);
	});
}

module.exports = assign(getCrossPlatformInfo, module.exports);
