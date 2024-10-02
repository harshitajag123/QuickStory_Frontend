import React from "react";
import CurrUserStories from "../Components/StoriesSection/CurrUserStories";

function UserStoryPg({ newStoryAdded }) {
	return (
		<div>
			<CurrUserStories newStoryAdded={newStoryAdded} />
		</div>
	);
}

export default UserStoryPg;
