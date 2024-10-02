import React from "react";
import { useState, useEffect } from "react";
import styles from "../../Styles/navbar.module.css";
import { IoMenu } from "react-icons/io5"; //menu icon
import { FaBookmark } from "react-icons/fa6"; //bookmark icon
import userIcon from "../../assets/categoriesImgs/userIcon.png";
import {
	SET_AddStoryPopup,
	SET_LoginPopup,
	SET_MainLoading,
	SET_RegisterPopup,
} from "../../Redux/slice/mainSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_Logout } from "../../Redux/slice/userSlice";
import toast from "react-hot-toast";

function Navbar() {
	const { isLogIn } = useSelector((state) => state.user);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [scroll, setScroll] = useState(false);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//handle register button click
	const handleRegisterBtn = () => {
		dispatch(SET_RegisterPopup(true));
	};

	//handle login button click
	const handleLoginBtn = () => {
		dispatch(SET_LoginPopup(true));
	};

	//handle add story button click
	const handleAddStoryBtn = () => {
		dispatch(SET_AddStoryPopup(true));
	};

	//handle logout button click
	const handleLogoutBtn = () => {
		dispatch(SET_MainLoading(true));
		dispatch(SET_Logout());
		toast.success("Logged out successfully");
		setShowUserMenu(false);
		dispatch(SET_MainLoading(false));
	};

	//handle scroll event
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={`${styles.mainContainer} ${scroll ? styles.scroll : ""}`}>
			<div className={styles.container}>
				<div onClick={() => navigate("/")} className={styles.logo}>
					<h2>Web Story</h2>
				</div>
				<div className={styles.menubox}>
					<ul>
						{!isLogIn ? (
							<>
								<div className={styles.guestUsermenu}>
									<li
										onClick={handleRegisterBtn}
										className={`${styles.btn} ${styles.registerBtn}`}>
										<p>Register Now</p>
									</li>

									<li
										onClick={handleLoginBtn}
										className={`${styles.btn} ${styles.loginBtn}`}>
										<p>Sign In </p>
									</li>
								</div>
							</>
						) : (
							<>
								<div className={styles.LoggedUserMenu}>
									<li
										onClick={() => navigate("/bookmarks")}
										className={`${styles.btn} ${styles.bookmarksBtn} `}>
										<FaBookmark className={styles.bookmarkIcon} size={16} />
										<p style={{ marginLeft: "10px" }}> Bookmarks</p>
									</li>

									<li
										onClick={handleAddStoryBtn}
										className={`${styles.btn} ${styles.addStoryBtn}`}>
										<p>Add Story</p>
									</li>
									<li className={`${styles.profileContainer} `}>
										<img src={userIcon} className={styles.userIcon} />
									</li>
									<div
										onClick={() => {
											setShowUserMenu((prev) => !prev);
										}}
										className={`${styles.hamburgerIcon}`}>
										<IoMenu size={35} />
									</div>

									{/* user humburger menu */}
									{showUserMenu && (
										<div className={styles.userMenu}>
											<p>
												{user.name.length > 20
													? `${user.name.substring(0, 20)}...`
													: user.name}
											</p>
											<div
												onClick={handleLogoutBtn}
												className={`${styles.btn} ${styles.logoutBtn} `}>
												Logout
											</div>
										</div>
									)}
								</div>
							</>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Navbar;

//<IoMenu />
//<FaBookmark />
