import React from "react";
import { FaSpinner } from "react-icons/fa"; // Import a spinner icon

const Loader = () => {
	return (
		<div style={{ textAlign: "center", padding: "20px" }}>
			<FaSpinner size={39} className="spin" />
		</div>
	);
};

export default Loader;
