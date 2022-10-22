import fs from 'fs';

export function readDirectory(path) {
	return fs.readdirSync(path);
}

export function writeFile(name, data) {
	fs.writeFileSync(name + '.json', JSON.stringify(data, null, 2));
}
