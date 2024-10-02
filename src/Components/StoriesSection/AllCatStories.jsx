import React from "react";
import CatStories from "./CatStories";
import { useSelector } from "react-redux";

function AllCatStories() {
	const { categories } = useSelector((state) => state.main);
	return (
		<div>
			<div>
				{categories.slice(1).map((category) => (
					<CatStories key={category.key} category={category} />
				))}
			</div>
		</div>
	);
}

export default AllCatStories;
