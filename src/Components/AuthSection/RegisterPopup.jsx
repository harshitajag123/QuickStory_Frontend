import React, { useState, useEffect } from "react";
import styles from "../../Styles/AuthStyles/registerPop.module.css";
import { registerSchema } from "../../Utils/valids";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_LoginPopup,
	SET_MainLoading,
	SET_RegisterPopup,
} from "../../Redux/slice/mainSlice";
import {
	SET_Login,
	SET_Register,
	SET_ErrorMsg,
	SET_Loading,
} from "../../Redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUserApi } from "../../ApisSection/AuthApi";
import Inputs from "./Inputs";
import { IoClose } from "react-icons/io5";
import Loader from "../LoaderSection/Loader";
import axios from "axios";

function RegisterPopup() {
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	});
	const { loading: userLoading, error } = useSelector((state) => state.user);
	const [closeBtnClicked, setCloseBtnClicked] = useState(false);
	const navigate = useNavigate();

	// Handle form submission
	const onSubmit = async (values) => {
		dispatch(SET_Loading(true));
		dispatch(SET_MainLoading(true));

		try {
			let res;
			res = await registerUserApi(values);
			console.log("Registration response:", res); // Log for debugging
			dispatch(SET_Register(res));
			handleCloseRegisterPopup();
			toast.success("Register Successfully.");
		} catch (error) {
			console.error("Registration error:", error); // Log the error
			dispatch(SET_ErrorMsg(error.message));
			toast.error("Registration failed.");
		} finally {
			dispatch(SET_Loading(false));
			dispatch(SET_MainLoading(false));
		}
	};

	// Display validation errors in toast
	useEffect(() => {
		if (errors.name) {
			toast.error(errors.name.message);
		}
		if (errors.password) {
			toast.error(errors.password.message);
		}
	}, [errors]);

	// Handle closing of the register popup
	const handleCloseRegisterPopup = () => {
		setCloseBtnClicked(true);
		setTimeout(() => {
			dispatch(SET_RegisterPopup(false));
		}, 500);
	};

	// Fetch user state from Redux store
	const { user, isLogIn } = useSelector((state) => state.user);
	useEffect(() => {
		console.log("Updated user state:", user, isLogIn); // Debugging
	}, [user, isLogIn]);

	return (
		<div
			className={`${styles.mainContain} entryAnimation ${
				closeBtnClicked && "exitAnimation"
			}`}>
			<div className={styles.container}>
				{/* closeBtnIcon */}
				<div onClick={handleCloseRegisterPopup}>
					<IoClose size={35} className={styles.closeIcon} />
				</div>

				<div className={styles.heading}>
					<h2>Register </h2>
				</div>

				{/* form container  */}

				<form onSubmit={handleSubmit(onSubmit)} className={styles.formBox}>
					<Inputs
						name="name"
						type="text"
						placeholder="Username"
						register={register}
						error={errors?.name?.message}
					/>

					<Inputs
						name="password"
						type="password"
						placeholder="Password"
						register={register}
						error={error?.password?.message}
					/>

					{/* if error occur */}

					{/* {errors.name && (
						<p className={styles.errorMsg}>{errors.name.message}</p>
					)}
					{errors.password && (
						<p className={styles.errorMsg}>{errors.password.message}</p>
					)} */}
					{/* {error ? (
						<div>
							<p className={styles.errorMsg}>{error}</p>
						</div>
					) : null} */}

					<button className={styles.btn} type="submit">
						{userLoading === true ? "Loading..." : "Register"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterPopup;
