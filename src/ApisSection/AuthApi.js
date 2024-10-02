import axios from "axios";
import baseURL from "../Utils/url";

const Auth_endpt = `${baseURL}auth`;
//https://webstory-app.onrender.com/api/v1

// Function to log in a user by sending their credentials to the backend
export const loginUserApi = async (values) => {
	try {
		const response = await axios.post(`${Auth_endpt}/login`, values);
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.error?.message || "something went wrong"
		);
	}
};


// Function to register a new user by sending their details to the backend
export const registerUserApi = async (values) => {
	try {
		const response = await axios.post(`${Auth_endpt}/register`, values);
		console.log(response.data); // Log response to debug
		return response.data;
	} catch (error) {
		throw new Error(
			error.response?.data?.error?.message || "something went wrong"
		);
	}
};
