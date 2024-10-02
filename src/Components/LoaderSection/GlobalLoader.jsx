import React from "react";
import styles from "../../Styles/globalLoader.module.css";
function GlobalLoader() {
	return (
		<div className={styles.spinnerContainer}>
			<div className={styles.spinner}></div>
		</div>
	);
}

export default GlobalLoader;
