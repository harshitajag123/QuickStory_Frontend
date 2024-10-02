import React, { useEffect } from "react";
import BookmarkStories from "../Components/StoriesSection/BookmarkStories";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Bookmarkpg() {
	const navigate = useNavigate();
	const { isLogIn } = useSelector((state) => state.user);

	useEffect(() => {
		if (!isLogIn) {
			navigate("/");
		}
	}, [isLogIn, navigate]);

	return <div>{isLogIn && <BookmarkStories />}</div>;
}

export default Bookmarkpg;
