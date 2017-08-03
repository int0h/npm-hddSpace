import {HddInfo} from '../index';
import {parseUnixOutput} from '../unix';
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
		Filesystem     1K-blocks    Used Available Use% Mounted on
		rootfs          15506408 1149728  13708188   8% /
		/dev/root       15506408 1149728  13708188   8% /
		devtmpfs          447624       0    447624   0% /dev
		tmpfs              89548     208     89340   1% /run
		tmpfs               5120       0      5120   0% /run/lock
		tmpfs             179080       0    179080   0% /run/shm
	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseUnixOutput(out);
	const expected: HddInfo = {
		parts: [
			{
				size: 15878561792,
				free: 14037184512,
				place: '/',
				mountOn: '/'
			},
			{
				size: 15878561792,
				free: 14037184512,
				place: '/',
				mountOn: '/'
			},
			{
				size: 458366976,
				free: 458366976,
				place: '/dev',
				mountOn: '/dev'
			},
			{
				size: 91697152,
				free: 91484160,
				place: '/run',
				mountOn: '/run'
			},
			{
				size: 5242880,
				free: 5242880,
				place: '/run/lock',
				mountOn: '/run/lock'
			},
			{
				size: 183377920,
				free: 183377920,
				place: '/run/shm',
				mountOn: '/run/shm'
			}
		],
		total: {
			size: 15878561792,
			free: 14037184512,
			place: '/',
			mountOn: '/'
		}
	};
	t.deepEqual(result, expected);
});

test('fixture #2', t => {
	let out = `
		Файл.система   1024-блоков Использовано Доступно Вместимость Cмонтировано в
		udev               2485944            0  2485944          0% /dev
		tmpfs               507804        60492   447312         12% /run
		/dev/sda1         71631200     48091380 19878048         71% /
		tmpfs              2539016         1616  2537400          1% /dev/shm
		tmpfs                 5120            4     5116          1% /run/lock
		tmpfs              2539016            0  2539016          0% /sys/fs/cgroup
		/dev/sdc         240234168    188729228 39278628         83% /media/Downloads
		/dev/sdb         307535312    227899592 63990776         79% /media/Video
		cgmfs                  100            0      100          0% /run/cgmanager/fs
		tmpfs               507804            0   507804          0% /run/user/1000
		tmpfs               507804           40   507764          1% /run/user/1001

	`;
	out = prepareFixture(out, /^\t\t/);
	const result = parseUnixOutput(out);
	const expected: HddInfo = {
		parts: [
			{
				size: 2545606656,
				free: 2545606656,
				place: '/dev',
				mountOn: '/dev'
			},
			{
				size: 519991296,
				free: 458047488,
				place: '/run',
				mountOn: '/run'
			},
			{
				size: 73350348800,
				free: 20355121152,
				place: '/',
				mountOn: '/'
			},
			{
				size: 2599952384,
				free: 2598297600,
				place: '/dev/shm',
				mountOn: '/dev/shm'
			},
			{
				size: 5242880,
				free: 5238784,
				place: '/run/lock',
				mountOn: '/run/lock'
			},
			{
				size: 2599952384,
				free: 2599952384,
				place: '/sys/fs/cgroup',
				mountOn: '/sys/fs/cgroup'
			},
			{
				size: 245999788032,
				free: 40221315072,
				place: '/media/Downloads',
				mountOn: '/media/Downloads'
			},
			{
				size: 314916159488,
				free: 65526554624,
				place: '/media/Video',
				mountOn: '/media/Video'
			},
			{
				size: 102400,
				free: 102400,
				place: '/run/cgmanager/fs',
				mountOn: '/run/cgmanager/fs'
			},
			{
				size: 519991296,
				free: 519991296,
				place: '/run/user/1000',
				mountOn: '/run/user/1000'
			},
			{
				size: 519991296,
				free: 519950336,
				place: '/run/user/1001',
				mountOn: '/run/user/1001'
			}
		],
		total: {
			size: 73350348800,
			free: 20355121152,
			place: '/',
			mountOn: '/'
		}
	};
	t.deepEqual(result, expected);
});
