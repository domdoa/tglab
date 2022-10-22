import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice } = toolkitRaw.default ?? toolkitRaw;

const fileSlice = createSlice({
	name: 'files',
	initialState: [],
	reducers: {
		addFile(state, action) {
			state.push({
				name: action.payload,
				active: true,
			});
		},
		toggleActive(state, action) {
			const file = state.find(file => file.name === action.payload);
			file.active = !file.active;
		},
	},
});
export const { addFile, toggleActive } = fileSlice.actions;

export default fileSlice.reducer;
