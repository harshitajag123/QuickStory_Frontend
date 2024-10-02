import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CatCorousal from "../Components/CategorySection/CatCorousal";
import CurrUserStories from "../Components/StoriesSection/CurrUserStories";
import AllCatStories from "../Components/StoriesSection/AllCatStories";
import CatStories from "../Components/StoriesSection/CatStories";
import UserStoryPg from "./UserStoryPg";

function Home({ newStoryAdded, isSmallScreen }) {
	const { isLogIn } = useSelector((state) => state.user);
	const { selectedCategory } = useSelector((state) => state.main);

	// State to manage new stories
	


	console.log("Is user logged in:", isLogIn);
	console.log("Selected category key:", selectedCategory.key);
	return (
		<div>
			<div>
				<CatCorousal />
			</div>

			<div>
				{isLogIn && selectedCategory.key === "All" && !isSmallScreen ? (
					<CurrUserStories newStoryAdded={newStoryAdded} />
				) : // <UserStoryPg />
				null}
			</div>

			<div>
				{selectedCategory.key === "All" ? (
					<AllCatStories />
				) : (
					<CatStories category={selectedCategory} />
				)}
			</div>
		</div>
	);
}

export default Home;
