import {parseUnixOutput} from '../unix';
import test from 'ava';
import {unixFixtures} from './fixtures';

unixFixtures.forEach(({name, output, result: expected}, id) => {
	test(`fixture #${id} (${name})`, t => {
		t.deepEqual(parseUnixOutput(output), expected);
	});
});
