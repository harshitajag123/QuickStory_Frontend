import { createSlice } from "@reduxjs/toolkit";

export const storySlice = createSlice({
	name: "Story",
	initialState: {
		activeStory: {},
		editingStory: {},
		editMode: false,
	},
	reducers: {
		SET_ActiveStory: (state, action) => {
			state.activeStory = action.payload;
		},
		SET_EditingMode: (state, action) => {
			state.editMode = action.payload;
		},

		SET_EditingStory: (state, action) => {
			state.editingStory = action.payload;
		},
	},
});

export const { SET_ActiveStory, SET_EditingMode, SET_EditingStory } =
	storySlice.actions;

export default storySlice.reducer;
