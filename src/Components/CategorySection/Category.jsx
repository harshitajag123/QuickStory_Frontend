import React, { useState } from "react";
import styles from "../../Styles/CategoryStyles/category.module.css";
import { SET_SelectedCategory } from "../../Redux/slice/mainSlice";
import { useDispatch, useSelector } from "react-redux";
function Category({ category }) {
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);
	const { selectedCategory } = useSelector((state) => state.main);

	//handle category change on click
	const handleCategoryChange = () => {
		dispatch(SET_SelectedCategory(category));
	};

	return (
		<div>
			<div
				onClick={handleCategoryChange}
				className={`${styles.mainContainer} ${
					selectedCategory.key === category.key && styles.active
				}`}>
				<img
					src={category.img}
					alt=""
					onLoad={() => setLoad(true)}
					className={!load ? `${styles.loading}` : ""}
				/>
				<p>{category.name}</p>
			</div>
		</div>
	);
}

export default Category;
