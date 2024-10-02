import React from "react";
import styles from "../../Styles/footer.module.css";

function Footer() {
	return (
		<div className={styles.footer}>
			Design By
			<a
				className={styles.links}
				href="https://www.linkedin.com/in/harshitajagtap/">{`Harshita Jagtap.`}</a>
		</div>
	);
}

export default Footer;
