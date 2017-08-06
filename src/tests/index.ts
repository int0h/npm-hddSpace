import {default as def, fetchHddInfo, getHddInfo, FormatedPart, FormatedHddInfo} from '../index';
import test from 'ava';
import {CallbackTestContext, TestContext} from 'ava';

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
	info.parts.forEach(validatePart.bind(null, false, true, t));
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

test.cb('default returns a valid formatted object', t => {
	def({format: 'auto'}, info => {
		validateHddInfo(true, t, info);
		t.end();
	});
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

// node.js style require

const defNodejs = require('../index') as typeof def;

test.cb('default works at all', t => {
	defNodejs({format: i => i}, info => {
		t.pass();
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