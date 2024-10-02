import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		isLogIn: false,
		err: null,
		loading: false,
		user: {
			_id: "",
			name: "",
			token: "",
			bookmarks: [],
		},
	},

	reducers: {
		SET_Logout: (state) => {
			(state.isLogIn = false),
				(state.loading = false),
				(state.err = null),
				(state.user = {
					_id: "",
					name: "",
					token: "",
					bookmarks: [],
				});
		},
		SET_Login: (state, action) => {
			const userDetails = action.payload;
			state.isLogIn = true;
			state.user._id = userDetails?.user?._id;
			state.user.name = userDetails?.user?.name;
			state.user.token = userDetails?.user?.token;
			state.user.bookmarks = userDetails?.user?.bookmarks;
		},

		SET_Register: (state, action) => {
			const userDetails = action.payload;
			console.log("User details from registration:", userDetails); // Debugging
			state.isLogIn = true;
			state.user._id = userDetails?.user?._id;
			state.user.name = userDetails?.user?.name;
			state.user.token = userDetails?.user?.token;
			state.user.bookmarks = userDetails?.user?.bookmarks;
			state.err = "";
		},
		SET_ErrorMsg: (state, action) => {
			state.err = action.payload;
		},
		SET_Loading: (state, action) => {
			state.loading = action.payload;
		},
		SET_Session: (state, action) => {
			if (action.payload) {
				(state.isLogIn = false),
					(state.err = null),
					(state.loading = false),
					(state.user = {
						_id: "",
						name: "",
						token: "",
						bookmarks: [],
					});
			}
		},
	},
});

export const {
	SET_Register,
	SET_ErrorMsg,
	SET_Loading,
	SET_Login,
	SET_Logout,
	SET_Session,
} = userSlice.actions;

export default userSlice.reducer;
