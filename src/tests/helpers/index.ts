export function prepareFixture(fixture: string, prefix: string | RegExp): string {
	return fixture
		.trim()
		.split('\n')
		.map(line => line.replace(prefix, ''))
		.join('\n');
}
