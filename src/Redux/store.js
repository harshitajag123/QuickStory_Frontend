import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slice/mainSlice";
import userSlice from "./slice/userSlice";
import storySlice from "./slice/storySlice";

const loadingStateFrmLocalStorage = () => {
	try {
		const data = localStorage.getItem("userState");
		if (data == null) {
			return undefined;
		}
		return JSON.parse(data);
	} catch (error) {
		return undefined;
	}
};

const savingStateIntoLocalStorage = (state) => {
	try {
		const updateState = { ...state, error: null, loading: false };
		const data = JSON.stringify(updateState);
		localStorage.setItem("userState", data);
	} catch (error) {
		return undefined;
	}
};

const persistUserState = loadingStateFrmLocalStorage();

const store = configureStore({
	reducer: {
		user: userSlice,
		main: mainSlice,
		story: storySlice,
	},
	preloadedState: {
		user: persistUserState,
	},
});

store.subscribe(() => {
	savingStateIntoLocalStorage(store.getState().user);
});

export default store;
