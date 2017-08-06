import {Format, formatSize} from '../format';
import test from 'ava';

test('unit basic format', t => {
	t.is(formatSize('bit', 1), '8 Bits');
	t.is(formatSize('byte', 10), '10 Bytes');
	t.is(formatSize('kb', 5 * (2 ** 10)), '5 KB');
	t.is(formatSize('mb', 5 * (2 ** 20)), '5 MB');
	t.is(formatSize('gb', 5 * (2 ** 30)), '5 GB');
	t.is(formatSize('tb', 5 * (2 ** 40)), '5 TB');
	t.is(formatSize('pb', 5 * (2 ** 50)), '5 PB');
	t.is(formatSize('eb', 5 * (2 ** 60)), '5 EB');
	t.is(formatSize('zb', 5 * (2 ** 70)), '5 ZB');
	t.is(formatSize('yb', 5 * (2 ** 80)), '5 YB');
	t.is(formatSize('byte', 0), '0 Bytes');
	t.is(formatSize('mb', 0), '0 MB');
});

test('unit case insensetive', t => {
	t.is(formatSize('kb', 5 * (2 ** 10)), '5 KB');
	t.is(formatSize('Kb' as Format, 5 * (2 ** 10)), '5 KB');
	t.is(formatSize('KB' as Format, 5 * (2 ** 10)), '5 KB');
});

test('auto formatter', t => {
	t.is(formatSize('auto', 5), '5.00 Bytes');
	t.is(formatSize('auto', 5 * (2 ** 10)), '5.00 KB');
	t.is(formatSize('auto', 5.2 * (2 ** 20)), '5.20 MB');
	t.is(formatSize('auto', 750 * (2 ** 20)), '750.00 MB');
	t.is(formatSize('auto', 5.9 * (2 ** 40)), '5.90 TB');
	t.is(formatSize('auto', 5.9 * (2 ** 80)), '5.90 YB');
	t.is(formatSize('auto', 5 * (2 ** 100)), '5242880.00 YB');
	t.is(formatSize('auto', 10 ** 5), '97.66 KB');
	t.is(formatSize('auto', 10 ** 10), '9.31 GB');
	t.is(formatSize('auto', 10 ** 7), '9.54 MB');
});

test('funcion formatter', t => {
	t.is(formatSize(n => n / 1000 + ' KB', 5000), '5 KB');
	t.is(formatSize(n => n / 1000, 5000), 5);
});

test('bad format', t => {
	t.is(formatSize('BAD_FORMAT' as Format, 10), '10 Bytes');
});

test('bad scale value', t => {
	t.is(formatSize('auto', 0.001), '0.00 Bytes');
});
