import {HddInfo} from '../index';
import {parseWin32Output} from '../win32';
import test from 'ava';

function prepareFixture(fixture: string, prefix: string | RegExp): string {
	return fixture
		.trim()
		.split('\n')
		.map(line => line.replace(prefix, ''))
		.join('\n');
}

test('fixture #1', t => {
	let out = `
		Caption  FreeSpace	Size
		C:	   1286164480   34359734272
		D:	   1864638464   50925137920
		E:
		F:	   77553082368  990202818560
		G:
		L:
	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseWin32Output(out);
	const expected: HddInfo = {
		parts: [
			{
				place: 'C:',
				letter: 'C:',
				free: 1286164480,
				size: 34359734272
			},
			{
				place: 'D:',
				letter: 'D:',
				free: 1864638464,
				size: 50925137920
			},
			{
				place: 'F:',
				letter: 'F:',
				free: 77553082368,
				size: 990202818560
			}
		],
		total: {
			size: 1075487690752,
			free: 80703885312
		}
	};
	t.deepEqual(result, expected);
});
