import {Fixture} from './index';
import {prepareFixture} from '../helpers';

export const unixFixtures: Fixture[] = [
	{
		name: 'bananian',
		output: prepareFixture(`
			Filesystem     1K-blocks    Used Available Use% Mounted on
			rootfs          15506408 1149728  13708188   8% /
			/dev/root       15506408 1149728  13708188   8% /
			devtmpfs          447624       0    447624   0% /dev
			tmpfs              89548     208     89340   1% /run
			tmpfs               5120       0      5120   0% /run/lock
			tmpfs             179080       0    179080   0% /run/shm
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'ubuntu: russian locale',
		output: prepareFixture(`
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
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'macos',
		output: prepareFixture(`
			Filesystem    1024-blocks     Used Available Capacity  Mounted on
			/dev/disk0s2    145961032 20678788 125026244    15%    /
			devfs                 178      178         0   100%    /dev
			map -hosts              0        0         0   100%    /net
			map auto_home           0        0         0   100%    /home
		`, '\t\t\t'),
		result: {
			parts: [
				{
					size: 149464096768,
					free: 128026873856,
					place: '/',
					mountOn: '/'
				},
				{
					size: 182272,
					free: 0,
					place: '/dev',
					mountOn: '/dev'
				},
				{
					size: 0,
					free: 0,
					place: '/net',
					mountOn: '/net'
				},
				{
					size: 0,
					free: 0,
					place: '/home',
					mountOn: '/home'
				}
			],
			total: {
				size: 149464096768,
				free: 128026873856,
				place: '/',
				mountOn: '/'
			}
		}
	},

	{
		name: 'ubuntu',
		output: prepareFixture(`
			Filesystem     1024-blocks    Used Available Capacity Mounted on
			udev                446816       0    446816       0% /dev
			tmpfs                89884   10756     79128      12% /run
			/dev/mmcblk0p1    15379328 2843308  12350496      19% /
			tmpfs               449408      88    449320       1% /dev/shm
			tmpfs                 5120       4      5116       1% /run/lock
			tmpfs               449408       0    449408       0% /sys/fs/cgroup
			tmpfs               449408       8    449400       1% /tmp
			log2ram              51200    6324     44876      13% /var/log
			tmpfs                89884       8     89876       1% /run/user/1000
		`, '\t\t\t'),
		result: {
			parts: [
				{
					size: 457539584,
					free: 457539584,
					place: '/dev',
					mountOn: '/dev'
				},
				{
					size: 92041216,
					free: 81027072,
					place: '/run',
					mountOn: '/run'
				},
				{
					size: 15748431872,
					free: 12646907904,
					place: '/',
					mountOn: '/'
				},
				{
					size: 460193792,
					free: 460103680,
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
					size: 460193792,
					free: 460193792,
					place: '/sys/fs/cgroup',
					mountOn: '/sys/fs/cgroup'
				},
				{
					size: 460193792,
					free: 460185600,
					place: '/tmp',
					mountOn: '/tmp'
				},
				{
					size: 52428800,
					free: 45953024,
					place: '/var/log',
					mountOn: '/var/log'
				},
				{
					size: 92041216,
					free: 92033024,
					place: '/run/user/1000',
					mountOn: '/run/user/1000'
				}
			],
			total: {
				size: 15748431872,
				free: 12646907904,
				place: '/',
				mountOn: '/'
			}
		}
	},

	{
		name: 'ubuntu',
		output: prepareFixture(`
			Filesystem     1024-blocks       Used Available Capacity Mounted on
			udev               1013224          0   1013224       0% /dev
			tmpfs               204872       5036    199836       3% /run
			/dev/sda1        139967416   20720196 112114244      16% /
			tmpfs              1024356         80   1024276       1% /dev/shm
			tmpfs                 5120          4      5116       1% /run/lock
			tmpfs              1024356          0   1024356       0% /sys/fs/cgroup
			cgmfs                  100          0       100       0% /run/cgmanager/fs
			none            1953512444 1138175980 815336464      59% /media/sf_SharedTB
			tmpfs               204872         48    204824       1% /run/user/1000
		`, '\t\t\t'),
		result: {
			parts: [
				{
					size: 1037541376,
					free: 1037541376,
					place: '/dev',
					mountOn: '/dev'
				},
				{
					size: 209788928,
					free: 204632064,
					place: '/run',
					mountOn: '/run'
				},
				{
					size: 143326633984,
					free: 114804985856,
					place: '/',
					mountOn: '/'
				},
				{
					size: 1048940544,
					free: 1048858624,
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
					size: 1048940544,
					free: 1048940544,
					place: '/sys/fs/cgroup',
					mountOn: '/sys/fs/cgroup'
				},
				{
					size: 102400,
					free: 102400,
					place: '/run/cgmanager/fs',
					mountOn: '/run/cgmanager/fs'
				},
				{
					size: 2000396742656,
					free: 834904539136,
					place: '/media/sf_SharedTB',
					mountOn: '/media/sf_SharedTB'
				},
				{
					size: 209788928,
					free: 209739776,
					place: '/run/user/1000',
					mountOn: '/run/user/1000'
				}
			],
			total: {
				size: 143326633984,
				free: 114804985856,
				place: '/',
				mountOn: '/'
			}
		}
	},

	{
		name: 'debian: russian locale',
		output: prepareFixture(`
			Файловая система 1024-блоков Использовано Доступно Вместимость Cмонтировано в
			/dev/sda1          110386008      4867332 99888316          5% /
			udev                   10240            0    10240          0% /dev
			tmpfs                 204876         4908   199968          3% /run
			tmpfs                 512188          160   512028          1% /dev/shm
			tmpfs                   5120            4     5116          1% /run/lock
			tmpfs                 512188            0   512188          0% /sys/fs/cgroup
			tmpfs                 102440            8   102432          1% /run/user/117
			tmpfs                 102440           12   102428          1% /run/user/1000
			/dev/sr0               58100        58100        0        100% /media/cdrom0
		`, '\t\t\t'),
		result: {
			parts: [
				{
					size: 113035272192,
					free: 102285635584,
					place: '/',
					mountOn: '/'
				},
				{
					size: 10485760,
					free: 10485760,
					place: '/dev',
					mountOn: '/dev'
				},
				{
					size: 209793024,
					free: 204767232,
					place: '/run',
					mountOn: '/run'
				},
				{
					size: 524480512,
					free: 524316672,
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
					size: 524480512,
					free: 524480512,
					place: '/sys/fs/cgroup',
					mountOn: '/sys/fs/cgroup'
				},
				{
					size: 104898560,
					free: 104890368,
					place: '/run/user/117',
					mountOn: '/run/user/117'
				},
				{
					size: 104898560,
					free: 104886272,
					place: '/run/user/1000',
					mountOn: '/run/user/1000'
				},
				{
					size: 59494400,
					free: 0,
					place: '/media/cdrom0',
					mountOn: '/media/cdrom0'
				}
			],
			total: {
				size: 113035272192,
				free: 102285635584,
				place: '/',
				mountOn: '/'
			}
		}
	}
];