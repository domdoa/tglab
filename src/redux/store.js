import * as toolkitRaw from '@reduxjs/toolkit';
const { configureStore } = toolkitRaw.default ?? toolkitRaw;
import filesReducer from './fileSlice.js';

export const store = configureStore({
	reducer: {
		files: filesReducer,
	},
});
