import {parseWin32Output} from '../win32';
import test from 'ava';
import {win32Fixtures} from './fixtures';

win32Fixtures.forEach(({name, output, result: expected}, id) => {
	test(`fixture #${id} (${name})`, t => {
		t.deepEqual(parseWin32Output(output), expected);
	});
});
