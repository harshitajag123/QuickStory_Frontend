import React, { useEffect, useState } from "react";
import styles from "../../Styles/AuthStyles/signIn.module.css";
//import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5"; // import close icon
//import { FaSpinner } from "react-icons/fa"; // Import a spinner icon
import { loginSchema } from "../../Utils/valids";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SET_LoginPopup, SET_MainLoading } from "../../Redux/slice/mainSlice";
import {
	SET_Login,
	SET_ErrorMsg,
	SET_Loading,
} from "../../Redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserApi } from "../../ApisSection/AuthApi";
import Inputs from "./Inputs";
import Loader from "../LoaderSection/Loader";

function SigninPopup() {
	const dispatch = useDispatch();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});
	const { loading: userLoading, error } = useSelector((state) => state.user);
	const [closeBtnClicked, setCloseBtnClicked] = useState(false);
	const navigate = useNavigate();

	// Handle form submission
	const onSubmit = async (values) => {
		dispatch(SET_MainLoading(true));
		dispatch(SET_Loading(true));

		try {
			let res = await loginUserApi(values);
			console.log("Login response:", res); // Log for debugging
			dispatch(SET_Login(res));
			handleCloseLoginPopup();
			toast.success("Login Successfully.");
		} catch (error) {
			console.error("Login error:", error); // Log the error
			dispatch(SET_ErrorMsg(error.message));
			toast.error("Login failed.");
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

	// Handle closing of the login popup
	const handleCloseLoginPopup = () => {
		setCloseBtnClicked(true);
		setTimeout(() => {
			dispatch(SET_LoginPopup(false));
		}, 500);
	};

	return (
		<div
			className={`${styles.mainContain} entryAnimation ${
				closeBtnClicked && "exitAnimation"
			}`}>
			<div className={styles.container}>
				{/* closeBtnIcon */}
				<div onClick={handleCloseLoginPopup}>
					<IoClose size={35} className={styles.closeIcon} />
				</div>

				<div className={styles.heading}>
					<h2>Login </h2>
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
					)} */}
					{errors.password && (
						<p className={styles.errorMsg}>{errors.password.message}</p>
					)}
					{/* {error ? (
						<div>
							<p className={styles.errorMsg}>{error}</p>
						</div>
					) : null} */}

					<button className={styles.btn} type="submit">
						{userLoading === true ? "Loading..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default SigninPopup;
