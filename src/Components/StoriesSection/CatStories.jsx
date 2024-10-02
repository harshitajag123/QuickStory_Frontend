import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleStory from "./SingleStory";
import toast from "react-hot-toast";
import ContentPlaceholder from "../../Components/LoaderSection/ContentPlaceholder";
import CurrUserStories from "./CurrUserStories";
import { SET_MainLoading } from "../../Redux/slice/mainSlice";
import { fetchCategoryStoriesAPi } from "../../ApisSection/StoriesApi";
import { getUserStories } from "../../ApisSection/UserApi";
import styles from "../../Styles/CategoryStyles/catStories.module.css";
import UserStoryPg from "../../Screens/UserStoryPg";

function CatStories({ category }) {
	const [page, setPage] = useState(1);
	const [stories, setStories] = useState([]);
	const { user } = useSelector((state) => state.user);
	const [remainingCount, setRemainingCount] = useState(null);
	const [storyLoading, setStoryLoading] = useState(false);
	const [showMoreBtnClick, setShowMoreBtnClick] = useState(false);
	const [yourStories, setYourStories] = useState([]); // New state for user stories
	const [hasError, setHasError] = useState(false); // New state to track error
	//const navigate = useNavigate();
	const dispatch = useDispatch();
	const { token } = user;
	const { isLogIn } = useSelector((state) => state.user);

	// Fetch category stories
	useEffect(() => {
		const fetchStories = async () => {
			const categoryKey = category.key;
			try {
				setHasError(false); // Reset error flag before fetch attempt
				if (!showMoreBtnClick) {
					setStoryLoading(true);
				} else {
					dispatch(SET_MainLoading(true));
				}

				const data = await fetchCategoryStoriesAPi({
					categoryKey,

					page,
				});
				const newStory = data.data;
				setStories((prev) => [...prev, ...newStory]);
				setRemainingCount(data?.remainingCount);
			} catch (error) {
				if (!hasError) {
					// Check if an error has been shown before
					toast.error("Something went wrong. Please try again later.");
					setHasError(true); // Set error flag to true to prevent multiple toasts
				}
			} finally {
				setStoryLoading(false);
				dispatch(SET_MainLoading(false));
			}
		};
		fetchStories();
	}, [category.key, page, showMoreBtnClick]);

	

	// Reset stories when category changes
	useEffect(() => {
		setShowMoreBtnClick(false);
		setStories([]);
		setYourStories([]); // Reset yourStories instead of stories
		setPage(1);
	}, [category.key]);

	return (
		<>
			<div className={styles.mainContainer}>
				<div>
					{/* Section for "Your Stories" */}
					{/* {token && <CurrUserStories newStoryAdded={yourStories.length} />} */}

					{/* {token && <UserStoryPg />} */}
				</div>
				{/* Section for Category Stories */}
				<h2 className={styles.h2}>
					Stories of category{" "}
					<span className={styles.categoryName}>{category.name}</span>
				</h2>
				{!storyLoading ? (
					<>
						{stories.length > 0 ? (
							<>
								<div className={styles.container}>
									{stories.map((story, index) => (
										<SingleStory key={index} story={story} />
									))}
								</div>
								{remainingCount > 0 && (
									<button
										onClick={() => {
											setShowMoreBtnClick(true);
											setPage((prev) => prev + 1);
										}}
										className={styles.showMoreButton}>
										show more
									</button>
								)}
							</>
						) : (
							<div className={styles.noStories}>No Stories Available</div>
						)}
					</>
				) : (
					<>
						<ContentPlaceholder />
					</>
				)}
			</div>
		</>
	);
}

export default CatStories;
