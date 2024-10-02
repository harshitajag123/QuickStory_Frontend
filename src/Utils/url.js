// utils/url.js

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://webstory-app.onrender.com/api/v1/"
		: "http://localhost:5000/api/v1";

export default baseURL;
