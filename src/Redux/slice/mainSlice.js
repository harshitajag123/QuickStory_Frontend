import { createSlice } from "@reduxjs/toolkit";

import allStoriesImg from "../../assets/categoriesImgs/allStories.png";
import foodImg from "../../assets/categoriesImgs/food.png";
import fitnessImg from "../../assets/categoriesImgs/fitness.jpg";
import travelImg from "../../assets/categoriesImgs/travel.png";
import moviesImg from "../../assets/categoriesImgs/movies.png";
import educationImg from "../../assets/categoriesImgs/education.png";
import medicalImg from "../../assets/categoriesImgs/medical.png";
import worldImg from "../../assets/categoriesImgs/world.jpeg";
import indiaImg from "../../assets/categoriesImgs/india.jpeg";

import { act } from "react";
import { SET_Register } from "./userSlice";

const AllCategories = [
	{ key: "All", name: "all", img: allStoriesImg },
	{ key: "Food", name: "Food", img: foodImg },
	{ key: "Health", name: "Health", img: fitnessImg },
	{ key: "Travel", name: "Travel", img: travelImg },
	{ key: "Movie", name: "Movies", img: moviesImg },
	{ key: "Education", name: "Education", img: educationImg },
	{ key: "Medical", name: "Medical", img: medicalImg },
	{ key: "World", name: "World", img: worldImg },
	{ key: "India", name: "India", img: indiaImg },
];

export const mainSlice = createSlice({
	name: "main",
	initialState: {
		loading: false,
		showLoginPopup: false,
		showRegisterPopup: false,
		showViewStoryPopup: false,
		showAddStoryPopup: false,
		selectedCategory: AllCategories[0],
		categories: AllCategories,
	},

	reducers: {
		SET_MainLoading: (state, action) => {
			state.loading = action.payload;
		},
		SET_LoginPopup: (state, action) => {
			state.showLoginPopup = action.payload;
		},
		SET_RegisterPopup: (state, action) => {
			state.showRegisterPopup = action.payload;
		},
		SET_ViewStoryPopup: (state, action) => {
			state.showViewStoryPopup = action.payload;
		},
		SET_AddStoryPopup: (state, action) => {
			state.showAddStoryPopup = action.payload;
		},
		SET_SelectedCategory: (state, action) => {
			state.selectedCategory = action.payload;
		},
	},
});

export const {
	SET_MainLoading,
	SET_LoginPopup,
	SET_RegisterPopup,
	SET_ViewStoryPopup,
	SET_AddStoryPopup,
	SET_SelectedCategory,
} = mainSlice.actions;

export default mainSlice.reducer;

//D:\HARSHITA JAGTAP\15_Cuvette\04_webstoryProject\client\src\assets\categoriesImgs
