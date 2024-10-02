import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import { SET_Session } from "./Redux/slice/userSlice";
import GlobalLoader from "./Components/LoaderSection/GlobalLoader";
import SigninPopup from "./Components/AuthSection/SigninPopup";
import RegisterPopup from "./Components/AuthSection/RegisterPopup";
import ViewStoryPopup from "./Components/StoriesSection/ViewStoryPopup";
import AddStoryPopup from "./Components/StoriesSection/AddStoryPopup";
import Navbar from "./Components/NavbarSection/Navbar";
import MobileViewNav from "./Components/NavbarSection/MobileView/MobileViewNav";
import Bookmarkpg from "./Screens/Bookmarkpg";
import UserStoryPg from "./Screens/UserStoryPg";
import ViewStory from "./Screens/ViewStory";
import Home from "./Screens/Home";
import Footer from "./Components/FooterSection/Footer";

function App() {
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const [newStoryAdd, setNewStoryAdd] = useState(false);
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	const dispatch = useDispatch();
	const {
		loading,
		showLoginPopup,
		showRegisterPopup,
		showViewStoryPopup,
		showAddStoryPopup,
	} = useSelector((state) => state.main);
	const decodeToken = (token) => {
		return jwtDecode(token);
	};

	//check if token is expired
	const checkedIsTokenExpired = useCallback((token) => {
		const decodedToken = decodeToken(token);
		const expiryTime = decodedToken.exp;
		const currTime = Math.floor(Date.now() / 1000);
		return expiryTime < currTime;
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (token) {
				const session = checkedIsTokenExpired(token);
				if (session) {
					dispatch(SET_Session(session));
					toast("Session expired! Please login again.", {
						style: { border: "1px solid #ff7373", color: "#ff7373" },
					});
				}
			}
		}, 5000); // check every 5 seconds
		return () => clearInterval(interval);
	}, [token, dispatch, checkedIsTokenExpired]);

	//for screen size

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.matchMedia("(max-width: 700px)").matches);
		};
		setIsSmallScreen(window.matchMedia("(max-width: 700px)").matches);
		window.addEventListener("resize", handleResize);

		//cleanup function
		return () => window.removeEventListener("resize", handleResize);
	}, [setIsSmallScreen]);

	return (
		<>
			<Toaster
				toastOptions={{
					success: {
						iconTheme: {
							primary: "#73abff",
							secondary: "white",
						},
						style: {
							color: "#73abff",
						},
					},
					error: {
						iconTheme: {
							primary: "#ff7373",
							secondary: "white",
						},
						style: {
							color: "#ff7373",
						},
					},
				}}
			/>
			{loading ? <GlobalLoader /> : null}
			<div>
				<BrowserRouter>
					{showLoginPopup ? <SigninPopup /> : null}
					{showRegisterPopup ? <RegisterPopup /> : null}
					{showViewStoryPopup ? (
						<ViewStoryPopup isSmallScreen={isSmallScreen} />
					) : null}
					{showAddStoryPopup ? (
						<AddStoryPopup setNewStoryAdd={setNewStoryAdd} />
					) : null}

					{isSmallScreen ? <MobileViewNav /> : <Navbar />}
					<Routes>
						<Route path="/bookmarks" element={<Bookmarkpg />} />

						<Route
							path="/your-story"
							element={isSmallScreen ? <UserStoryPg /> : <UserStoryPg />}
						/>

						<Route path="/view-story/:id" element={<ViewStory />} />

						<Route
							path="/*"
							element={
								<>
									<Home
										newStoryAdded={newStoryAdd}
										isSmallScreen={isSmallScreen}
									/>
								</>
							}
						/>
					</Routes>
					{<Footer />}
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
