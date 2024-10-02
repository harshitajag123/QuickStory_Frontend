import React from "react";
import styles from "../../Styles/contentPlaceholder.module.css";

const skeletonArray = [1, 2, 3, 4];
const ContentPlaceholder = () => {
	return (
		<div className={styles.holderContainer}>
			{skeletonArray.map((item) => (
				<div key={item} className={styles.item}>
					<div className={styles.heading}></div>
					<div className={styles.description}></div>
				</div>
			))}
		</div>
	);
};

export default ContentPlaceholder;
