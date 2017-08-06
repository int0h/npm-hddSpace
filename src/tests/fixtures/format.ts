import {Fixture} from './index';
import {prepareFixture} from '../helpers';

export const formatFixtures: Fixture[] = [
	{
		name: 'unix',
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
			parts: [{
					free: '13.07 GB',
					size: '14.79 GB',
					place: '/',
					mountOn: '/'
				},
				{
					free: '13.07 GB',
					size: '14.79 GB',
					place: '/',
					mountOn: '/'
				},
				{
					free: '437.13 MB',
					size: '437.13 MB',
					place: '/dev',
					mountOn: '/dev'
				},
				{
					free: '87.25 MB',
					size: '87.45 MB',
					place: '/run',
					mountOn: '/run'
				},
				{
					free: '5.00 MB',
					size: '5.00 MB',
					place: '/run/lock',
					mountOn: '/run/lock'
				},
				{
					free: '174.88 MB',
					size: '174.88 MB',
					place: '/run/shm',
					mountOn: '/run/shm'
				}
			],
			total: {
				free: '13.07 GB',
				size: '14.79 GB'
			}
		}
	},

	{
		name: 'win32',
		output: prepareFixture(`
			Caption  FreeSpace    Size
			C:       22377099264  53580132352
			D:       0            58601472
		`, '\t\t\t'),
		result: {
			parts: [{
					free: '20.84 GB',
					size: '49.90 GB',
					place: 'C:',
					letter: 'C:'
				},
				{
					free: '0.00 Bytes',
					size: '55.89 MB',
					place: 'D:',
					letter: 'D:'
				}
			],
			total: {
				free: '20.84 GB',
				size: '49.95 GB'
			}
		}
	}
];