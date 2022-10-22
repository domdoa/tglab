import express from 'express';
import { readDirectory, writeFile } from './fileModule.js';
import { addFile, toggleActive } from './redux/fileSlice.js';
import { store } from './redux/store.js';

// Read directory and save it to redux state
readDirectory('./files').forEach(file => {
	store.dispatch(addFile(file));
});

const app = express();

app.get('/list', (req, res) => {
	res.json(store.getState().files);
});

app.get('/scan', (req, res) => {
	const scanedDirectory = readDirectory('./files');
	const stateFiles = store.getState().files;

	// Add new files to state
	scanedDirectory.forEach(file => {
		!stateFiles.find(stateFile => stateFile.name === file) &&
			store.dispatch(addFile(file));
	});

	// Modify state
	stateFiles.forEach(stateFile => {
		scanedDirectory.find(file => file === stateFile.name)
			? !stateFile.active && store.dispatch(toggleActive(stateFile.name))
			: stateFile.active && store.dispatch(toggleActive(stateFile.name));
	});

	res.json({ message: 'Scan completed' });
});

app.get('/download-state', (req, res) => {
	const fileName = 'download-state';
	const state = store.getState().files;
	writeFile(fileName, state);
	res.download(`${fileName}.json`);
});

app.listen(3000);
