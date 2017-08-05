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

test('fixture #1 (windows 7)', t => {
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

test('fixture #2 (windows xp)', t => {
	let out = `
		Caption  FreeSpace     Size
		C:       627703808     10725732352
		D:       0             699783168
		E:       25851797504   107496861696
		F:       834660716544  2000396742656
	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseWin32Output(out);
	const expected: HddInfo = {
		parts: [
			{
				place: 'C:',
				letter: 'C:',
				free: 627703808,
				size: 10725732352
			},
			{
				place: 'D:',
				letter: 'D:',
				free: 0,
				size: 699783168
			},
			{
				place: 'E:',
				letter: 'E:',
				free: 25851797504,
				size: 107496861696
			},
			{
				place: 'F:',
				letter: 'F:',
				free: 834660716544,
				size: 2000396742656
			}
		],
		total: {
			size: 2119319119872,
			free: 861140217856
		}
	};
	t.deepEqual(result, expected);
});

test('fixture #3 (windows server 2008)', t => {
	let out = `
		Caption  FreeSpace    Size
		C:       22377099264  53580132352
		D:       0            58601472
	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseWin32Output(out);
	const expected: HddInfo = {
		parts: [
			{
				place: 'C:',
				letter: 'C:',
				free: 22377099264,
				size: 53580132352
			},
			{
				place: 'D:',
				letter: 'D:',
				free: 0,
				size: 58601472
			}
		],
		total: {
			size: 58601472 + 53580132352,
			free: 22377099264
		}
	};
	t.deepEqual(result, expected);
});

test('fixture #4 (windows 8)', t => {
	let out = `
		Caption  FreeSpace     Size
		C:       498562174976  539028877312
		D:       0             59494400
	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseWin32Output(out);
	const expected: HddInfo = {
		parts: [
			{
				place: 'C:',
				letter: 'C:',
				free: 498562174976,
				size: 539028877312
			},
			{
				place: 'D:',
				letter: 'D:',
				free: 0,
				size: 59494400
			}
		],
		total: {
			size: 59494400 + 539028877312,
			free: 498562174976
		}
	};
	t.deepEqual(result, expected);
});

test('fixture #5 (windows 10)', t => {
	let out = `
		Caption  FreeSpace     Size
		C:       159345410048  171204145152
		D:       0             4001759232
	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseWin32Output(out);
	const expected: HddInfo = {
		parts: [
			{
				place: 'C:',
				letter: 'C:',
				free: 159345410048,
				size: 171204145152
			},
			{
				place: 'D:',
				letter: 'D:',
				free: 0,
				size: 4001759232
			}
		],
		total: {
			size: 171204145152 + 4001759232,
			free: 159345410048
		}
	};
	t.deepEqual(result, expected);
});
