// to display a carousel of categories. It retrieves the list of categories from the Redux store using useSelector and maps through them, rendering a Category component for each category.

import styles from "../../Styles/CategoryStyles/catCorousal.module.css";
import Category from "./Category";
import { useSelector } from "react-redux";

const CatCorousal = () => {
	const { categories } = useSelector((state) => state.main);

	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.container}>
					{categories.map((category, indx) => {
						return <Category key={indx} category={category} />;
					})}
				</div>
			</div>
		</>
	);
};

export default CatCorousal;
