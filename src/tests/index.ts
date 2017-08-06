import {default as def, fetchHddInfo, getHddInfo, FormatedPart, FormatedHddInfo, HddInfo} from '../index';
import test from 'ava';
import {CallbackTestContext, TestContext} from 'ava';
import {unixFixtures, win32Fixtures, formatFixtures} from './fixtures';

function validatePart(formated: boolean, placeValidation: boolean, t: CallbackTestContext | TestContext, part: FormatedPart) {
	if (!formated) {
		t.is(typeof part.free, 'number');
		t.is(typeof part.size, 'number');
		t.false(isNaN(part.free as number));
		t.false(isNaN(part.size as number));
	}
	if (!placeValidation) {
		return;
	}
	t.is(typeof part.place, 'string');
	t.true(typeof part.letter === 'string' || typeof part.mountOn === 'string');
}

function validateHddInfo(formated: boolean, t: CallbackTestContext | TestContext, info: FormatedHddInfo) {
	t.is(typeof info, 'object');
	t.true('total' in info);
	info.parts.forEach(validatePart.bind(null, formated, true, t));
	validatePart(formated, false, t, info.total);
}

test.cb('default works at all', t => {
	def({format: i => i}, info => {
		t.pass();
		t.end();
	});
});

test.cb('default returns a valid object', t => {
	def({format: i => i}, info => {
		validateHddInfo(false, t, info);
		t.end();
	});
});

test.cb('default returns a valid object w/o options', t => {
	def(info => {
		validateHddInfo(false, t, info);
		t.end();
	});
});

test.cb('default returns a valid formatted object', t => {
	def({format: 'auto'}, info => {
		validateHddInfo(true, t, info);
		t.end();
	});
});

test.cb('default works with provided output (posix)', t => {
	const {output, result: expected} = unixFixtures[0];
	def({format: i => i, output, platform: 'posix'}, info => {
		validateHddInfo(false, t, info);
		t.deepEqual(info, expected);
		t.end();
	});
});


test.cb('default works with provided output (win32)', t => {
	const {output, result: expected} = win32Fixtures[0];
	def({format: i => i, output, platform: 'win32'}, info => {
		validateHddInfo(false, t, info);
		t.deepEqual(info, expected);
		t.end();
	});
});

test.cb('default throws on invalid output', t => {
	t.throws(() => {
		def({format: 'auto', output: ''}, info => {});
	});
	t.end();
});

// getHddInfo:

test.cb('getHddInfo works at all', t => {
	getHddInfo({format: i => i}, (err, info) => {
		t.falsy(err);
		t.pass();
		t.end();
	});
});

test.cb('getHddInfo returns a valid object', t => {
	getHddInfo({format: i => i}, (err, info) => {
		t.falsy(err);
		info = info as FormatedHddInfo;
		validateHddInfo(false, t, info);
		t.end();
	});
});

test.cb('getHddInfo returns a valid formatted object', t => {
	getHddInfo({format: 'auto'}, (err, info) => {
		t.falsy(err);
		info = info as FormatedHddInfo;
		validateHddInfo(true, t, info);
		t.end();
	});
});


test.cb('getHddInfo returns error via callback on invalid output', t => {
	getHddInfo({format: 'auto', output: ''}, (err, info) => {
		t.truthy(err);
		t.end();
	});
});

test.cb('getHddInfo returns error via callback on invalid output', t => {
	getHddInfo({format: 'auto', output: '----'}, (err, info) => {
		t.truthy(err);
		t.end();
	});
});

// fetchHddInfo

test('fetchHddInfo works at all', async t => {
	const info = await fetchHddInfo({format: i => i});
	t.pass();
});

test('fetchHddInfo returns a valid object', async t => {
	const info = await fetchHddInfo({format: i => i});
	validateHddInfo(false, t, info);
});

test('fetchHddInfo returns a valid formatted object', async t => {
	const info = await fetchHddInfo({format: i => i});
	validateHddInfo(true, t, info);
});

test.cb('fetchHddInfo throws on invalid output', t => {
	fetchHddInfo({format: i => i, output: ''})
		.catch(() => t.end());
});

test('fetchHddInfo and auto format', async t => {
	const info = await fetchHddInfo({
		format: 'auto',
		platform: 'posix',
		output: formatFixtures[0].output
	});
	validateHddInfo(true, t, info);
	t.deepEqual(info, formatFixtures[0].result);
});

test('fetchHddInfo works w/o options', async t => {
	const info = await fetchHddInfo();
	validateHddInfo(false, t, info);
});

// node.js style require

const defNodejs = require('../index') as typeof def;

test.cb('default works at all', t => {
	defNodejs({format: i => i}, info => {
		t.pass();
		t.end();
	});
});

test.cb('default returns a valid object w/o options', t => {
	defNodejs(info => {
		validateHddInfo(false, t, info);
		t.end();
	});
});

test.cb('default returns a valid object', t => {
	defNodejs({format: i => i}, info => {
		validateHddInfo(false, t, info);
		t.end();
	});
});

test.cb('default returns a valid formatted object', t => {
	defNodejs({format: 'auto'}, info => {
		validateHddInfo(true, t, info);
		t.end();
	});
});

// formating test

formatFixtures.forEach(({name, output, result: expected}, id) => {
	test.cb(`getHddInfo returns a valid formatted object [${name}]`, t => {
		getHddInfo({format: 'auto', output, platform: name as any}, (err, info) => {
			t.falsy(err);
			info = info as FormatedHddInfo;
			t.deepEqual(info, expected);
			t.end();
		});
	});
});

// custom fetcher

test.cb(`getHddInfo works with a custom fetcher`, t => {
	getHddInfo({
		format: 'auto',
		platform: 'posix',
		fetchOutput: cb => {
			cb(null, formatFixtures[0].output);
		}
	}, (err, info) => {
		t.falsy(err);
		info = info as FormatedHddInfo;
		t.deepEqual(info, formatFixtures[0].result);
		t.end();
	});
});

test.cb(`getHddInfo handles errors in a custom fetcher`, t => {
	getHddInfo({
		format: 'auto',
		platform: 'posix',
		fetchOutput: cb => {
			cb(new Error('bad'));
		}
	}, (err, info) => {
		t.truthy(err);
		t.end();
	});
});