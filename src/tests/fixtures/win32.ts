import {Fixture} from './index';
import {prepareFixture} from '../helpers';

export const win32Fixtures: Fixture[] = [
	{
		name: 'windows 7',
		output: prepareFixture(`
			Caption  FreeSpace	Size
			C:	   1286164480   34359734272
			D:	   1864638464   50925137920
			E:
			F:	   77553082368  990202818560
			G:
			L:
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'windows xp',
		output: prepareFixture(`
			Caption  FreeSpace     Size
			C:       627703808     10725732352
			D:       0             699783168
			E:       25851797504   107496861696
			F:       834660716544  2000396742656
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'windows server 2008',
		output: prepareFixture(`
			Caption  FreeSpace    Size
			C:       22377099264  53580132352
			D:       0            58601472
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'windows 8',
		output: prepareFixture(`
			Caption  FreeSpace     Size
			C:       498562174976  539028877312
			D:       0             59494400
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'windows 10',
		output: prepareFixture(`
			Caption  FreeSpace     Size
			C:       159345410048  171204145152
			D:       0             4001759232
		`, '\t\t\t'),
		result: {
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
		}
	},

	{
		name: 'labels',
		output: prepareFixture(`
			Caption  FreeSpace     Size          VolumeName
			C:       497654161408  539028877312  System
		`, '\t\t\t'),
		result: {
			parts: [
				{
					place: 'C:',
					letter: 'C:',
					free: 497654161408,
					size: 539028877312,
					label: 'System'
				}
			],
			total: {
				size: 539028877312,
				free: 497654161408
			}
		}
	}
];
