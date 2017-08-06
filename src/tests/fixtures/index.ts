import {FormatedHddInfo} from '../../index';

export interface Fixture {
	name: string;
	output: string;
	result: FormatedHddInfo;
}

export {unixFixtures} from './unix';
export {win32Fixtures} from './win32';
export {formatFixtures} from './format';
