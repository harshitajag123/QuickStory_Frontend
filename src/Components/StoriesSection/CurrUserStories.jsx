import React, { useState } from "react";
import { useEffect } from "react";
import SingleStory from "./SingleStory";
import styles from "../../Styles/CategoryStyles/currUserStories.module.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SET_MainLoading } from "../../Redux/slice/mainSlice";
import { getUserStories } from "../../ApisSection/UserApi";
import { useLocation } from "react-router-dom";
import ContentPlaceholder from "../LoaderSection/ContentPlaceholder";
function CurrUserStories({ newStoryAdded }) {
	const [userStories, setUserStories] = useState([]);
	const [page, setPage] = useState(1);
	const [remainingCount, setRemainingCount] = useState(null);
	const [storyLoading, setStoryLoading] = useState(false);
	const [showMoreBtnClick, setShowMoreBtnClick] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	useEffect(() => {
		const getStories = async () => {
			try {
				if (!showMoreBtnClick) {
					setStoryLoading(true);
				} else {
					dispatch(SET_MainLoading(true));
				}
				const data = await getUserStories({ token, page });
				const newStories = data.data?.data;
				setUserStories((prev) => [...prev, ...newStories]);
				setRemainingCount(data?.data?.remainingCount);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setStoryLoading(false);
				dispatch(SET_MainLoading(false));
			}
		};
		getStories();
	}, [token, newStoryAdded, showMoreBtnClick]);

	useEffect(() => {
		setShowMoreBtnClick(false);
		setUserStories([]);
		setPage(1);
	}, [newStoryAdded, page, user, token]);

	return (
		<>
			{/* Always render the user's stories when logged in */}
			{userStories.length > 0 ? (
				<>
					<div className={styles.mainContainer}>
						<h1 className={styles.h1}>Your Stories</h1>
					</div>
					{!storyLoading ? (
						<>
							{userStories.length > 0 ? (
								<>
									<div className={styles.container}>
										{userStories?.map((story, index) => {
											return <SingleStory key={index} story={story} />;
										})}
									</div>

									{remainingCount > 0 && (
										<button
											onClick={() => {
												setShowMoreBtnClick(true);
												setPage((prev) => prev + 1);
											}}
											className={styles.showMoreBtn}>
											Show More
										</button>
									)}
								</>
							) : (
								<div className={styles.noStories}>No Stories Available</div>
							)}
						</>
					) : (
						<ContentPlaceholder />
					)}
				</>
			) : null}{" "}
			{/* Render nothing if no user stories */}
		</>
	);
}

export default CurrUserStories;



// {
// 	location.pathname.startsWith("/your-story") && userStories.length > 0 ? (
// 		<>
// 			<div className={styles.mainContainer}>
// 				<h1 className={styles.h1}>Your Stories</h1>
// 			</div>
// 			{!storyLoading ? (
// 				<>
// 					{userStories.length > 0 ? (
// 						<>
// 							<div className={styles.container}>
// 								{userStories?.map((story, index) => {
// 									return <SingleStory key={index} story={story} />;
// 								})}
// 							</div>

// 							{remainingCount > 0 && (
// 								<button
// 									onClick={() => {
// 										setShowMoreBtnClick(true);
// 										setPage((prev) => prev + 1);
// 									}}
// 									className={styles.showMoreBtn}>
// 									Show More
// 								</button>
// 							)}
// 						</>
// 					) : (
// 						(<>
// 							<div className={styles.noStories}>No Stories Available</div>
// 						</>)()
// 					)}
// 				</>
// 			) : (
// 				<>
// 					<ContentPlaceholder />
// 				</>
// 			)}
// 		</>
// 	) : (
// 		<></>
// 	);
// }
