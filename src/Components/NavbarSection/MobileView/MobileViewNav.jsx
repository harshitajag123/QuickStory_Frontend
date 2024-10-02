import React, { useEffect, useState } from "react";
import styles from "../../../Styles/mobileNav.module.css";
import { IoMenu } from "react-icons/io5"; //menu icon
import { FaBookmark } from "react-icons/fa6"; //bookmark icon
import userIcon from "../../../assets/categoriesImgs/userIcon.png";
import {
	SET_AddStoryPopup,
	SET_LoginPopup,
	SET_MainLoading,
	SET_RegisterPopup,
} from "../../../Redux/slice/mainSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_Logout } from "../../../Redux/slice/userSlice";
import toast from "react-hot-toast";

function MobileViewNav() {
	const { isLogIn } = useSelector((state) => state.user);
	const [showUserMenu, setShowUserMenu] = useState(false);
	const [scroll, setScroll] = useState(false);
	const { user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleRegisterBtn = () => {
		dispatch(SET_RegisterPopup(true));
		setShowUserMenu(false);
	};
	const handleLoginBtn = () => {
		dispatch(SET_LoginPopup(true));
		setShowUserMenu(false);
	};
	const handleAddStoryBtn = () => {
		dispatch(SET_AddStoryPopup(true));
		setShowUserMenu(false);
	};

	const handleUrStoryBtn = () => {
		navigate("/your-story");
		setShowUserMenu(false);
	};

	const handleBookmarkBtn = () => {
		navigate("/bookmarks");
		setShowUserMenu(false);
	};

	const handleLogoutBtn = () => {
		dispatch(SET_Logout());
		toast.success("Logged out successfully");
		setShowUserMenu(false);
	};

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
				<div
					onClick={() => {
						navigate("/");
						setShowUserMenu(false);
					}}
					className={styles.logo}>
					<h2>Web Story</h2>
				</div>
				<div>
					<div>
						<div
							onClick={() => setShowUserMenu((prev) => !prev)}
							className={`${styles.hamburgerIcon}`}>
							<IoMenu size={34} />
						</div>

						{/* user humburger menu */}
						{showUserMenu && (
							<>
								<div className={styles.userMenu}>
									{!isLogIn ? (
										<div className={styles.guestUsermenu}>
											<li
												onClick={handleRegisterBtn}
												className={`${styles.btn} ${styles.registerBtn}`}>
												<p>Register Now</p>
											</li>
											<li
												onClick={handleLoginBtn}
												className={`${styles.btn} ${styles.loginBtn}`}>
												<p>Sign In</p>
											</li>
										</div>
									) : (
										<div className={styles.loggedUserMenu}>
											<div className={styles.userDetails}>
												<li className={`${styles.profileContainer} `}>
													<img src={userIcon} className={styles.userIcon} />
												</li>
												<div>
													<p>
														{user.name.length > 20
															? `${user.name.substring(0, 20)}...`
															: user.name}
													</p>
												</div>
											</div>
											<li
												onClick={handleUrStoryBtn}
												className={`${styles.btn} ${styles.urStoryBtn}`}>
												<p>Your Story</p>
											</li>
											<li
												onClick={handleAddStoryBtn}
												className={`${styles.btn} ${styles.addStoryBtn}`}>
												<p>Add Story</p>
											</li>
											<li
												onClick={handleBookmarkBtn}
												className={`${styles.btn} ${styles.bookmarksBtn} `}>
												<FaBookmark size={15} className={styles.bookmarkIcon} />
												<p style={{marginLeft: "7px"}}>Bookmarks</p>
											</li>
											<li
												onClick={handleLogoutBtn}
												className={`${styles.btn} ${styles.logoutBtn} `}>
												<p>Logout</p>
											</li>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MobileViewNav;
