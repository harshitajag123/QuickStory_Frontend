import React, { useState } from "react";
import styles from "../../Styles/AuthStyles/inputs.module.css";

import { GoEyeClosed } from "react-icons/go"; //closed eye icon

import { RxEyeOpen } from "react-icons/rx"; //open eye icon

function Inputs({ name, type, placeholder, register, error }) {
	const [eyeVisible, setEyeVisible] = useState(false);
	const [inputType, setInputType] = useState(type);

	//eye icon click settings if eye open set type to password else set type to text
	const handleEyeClick = () => {
		setEyeVisible((prev) => !prev);
		if (eyeVisible) {
			setInputType("password");
		} else {
			setInputType("text");
		}
	};
	return (
		<div className={styles.inputContainer}>
			<label className={styles.label} htmlFor={name}>
				{placeholder}
			</label>
			<div className={styles.container}>
				<div className={styles.inputBox}>
					<input
						type={inputType}
						className={styles.input}
						placeholder={placeholder}
						autoComplete="current-password"
						{...register(name)}
					/>
					{type === "password" && (
						<div onClick={handleEyeClick} className={styles.eyeIcon}>
							{eyeVisible ? <RxEyeOpen /> : <GoEyeClosed />}
						</div>
					)}
				</div>
				{error && <p className={styles.errorMsg}>{error}</p>}
			</div>
		</div>
	);
}

export default Inputs;

//<RxEyeOpen />
//<GoEyeClosed />
