import axios from "axios";
import baseURL from "../Utils/url";

//(/api/v1/stories) -- for this  only like and bookmark needs auth
const Stories_endpt = `${baseURL}stories`;

// Fetching stories based on the category, token (for auth), and pagination
export const fetchCategoryStoriesAPi = async ({ categoryKey, token, page }) => {
	try {
		const res = await axios.get(
			`${Stories_endpt}?category=${categoryKey}&page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res?.data?.data; //returning stories data
	} catch (error) {
		throw new Error(error.res?.data?.error?.message || "something went wrong");
	}
};

// Function to like a specific story based on its ID, token is needed for authentication
export const likeStoryApi = async ({ storyId, token }) => {
	try {
		const res = await axios.put(
			`${Stories_endpt}/${storyId}/like`,
			{}, // Passing an empty object as the body
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res?.data?.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.error?.message || "something went wrong"
		);
	}
};

// Function to bookmark a story based on its ID, requires authentication
export const bookmarkStoryApi = async ({ storyId, token }) => {
	try {
		const res = await axios.put(
			`${Stories_endpt}/${storyId}/bookmark`,
			{}, // Passing an empty object as the body
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return res?.data?.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.error?.message || "something went wrong"
		);
	}
};

// Fetching details of a specific story by its ID (no auth required)
export const getStoryApi = async ({ storyId }) => {
	try {
		const res = await axios.get(`${Stories_endpt}/${storyId}`);
		return res.data;
	} catch (error) {
		throw new Error(error.res?.data?.error?.message || "something went wrong");
	}
};
