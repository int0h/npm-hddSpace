import {invertHashTable} from '../utils';
import test from 'ava';

test('basic invert hash check', t => {
	const srcObj = {a: 1, b: 2};
	const expected = {1: 'a', 2: 'b'};
	t.deepEqual(invertHashTable(srcObj), expected);
});
