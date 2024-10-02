import axios from "axios";
import baseURL from "../Utils/url";

//(/api/v1/users) and for user activiites auth is required
const User_endpt = `${baseURL}users`;

// Function to add a new story for the logged-in user, requires auth token
export const addStoryApi = async ({ values, token }) => {
	try {
		const res = await axios.post(
			`${User_endpt}/stories`,
			{ ...values },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data;
	} catch (error) {
		throw new Error(error.res?.data?.error?.message || "something went wrong");
	}
};

// Function to update an existing story, requires auth token
export const updateStory = async ({ values, token, storyId }) => {
	try {
		const res = await axios.put(
			`${User_endpt}/stories/${storyId}`,
			{ ...values },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data;
	} catch (error) {
		throw new Error(error.res?.data?.error?.message || "something went wrong");
	}
};


// Function to fetch stories created by the logged-in user, requires auth token
export const getUserStories = async ({ token, page }) => {
	try {
		const res = await axios.get(`${User_endpt}/stories?page=${page}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Cache-Control": "no-cache",
			},
		});
		return res.data;
	} catch (error) {
		throw new Error(error.res?.data?.error?.message || "something went wrong");
	}
};

// Function to fetch user's bookmarked stories, requires auth token
export const getUserBookmarks = async ({ token, page }) => {
	try {
		const res = await axios.get(
			`${User_endpt}/stories/bookmarks?page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res.data;
	} catch (error) {
		throw new Error(error.res?.data?.error?.message || "something went wrong");
	}
};
