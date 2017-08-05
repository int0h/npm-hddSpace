import {invertHashTable, assign} from '../utils';
import test from 'ava';

test('basic invert hash check', t => {
	const srcObj = {a: 1, b: 2};
	const expected = {1: 'a', 2: 'b'};
	t.deepEqual(invertHashTable(srcObj), expected);
});

test('mutable assign check', t => {
	const srcObj = {a: 1, b: 2};
	const expected = {a: 1, b: 2, c: 3};
	assign(srcObj, {c: 3});
	t.deepEqual(srcObj, expected);
});

test('imutable assign check', t => {
	const srcObj = {a: 1, b: 2};
	const expected = {a: 1, b: 2, c: 3};
	t.deepEqual(assign(srcObj, {c: 3}), expected);
});
