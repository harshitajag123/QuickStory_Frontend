import React, { useEffect, useState } from "react";
import styles from "../../Styles/StoryStyles/bookmarkStories.module.css";
import SingleStory from "../StoriesSection/SingleStory";
import { getUserBookmarks } from "../../ApisSection/UserApi";
import ContentPlaceholder from "../../Components/LoaderSection/ContentPlaceholder";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function BookmarkStories() {
	const [userBookmarks, setUserBookmarks] = useState([]);
	const [page, setPage] = useState(1);
	const [remainingCount, setRemainingCount] = useState(null);
	const [storyLoading, setStoryLoading] = useState(false);
	const { user } = useSelector((state) => state.user);
	const { activeStory } = useSelector((state) => state.story);
	const { token } = user;
	const dispatch = useDispatch();

	//fetch bookmark stories
	useEffect(() => {
		const getBookmarkStories = async () => {
			try {
				setStoryLoading(true);
				const { data } = await getUserBookmarks({ token, page });
				const newStory = data.data;
				setRemainingCount(data.remainingCount);
				setUserBookmarks((prev) => [...prev, ...newStory]);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setStoryLoading(false);
			}
		};
		getBookmarkStories();
	}, [dispatch, page, activeStory, token]);

	
	useEffect(() => {
		setUserBookmarks([]);
	}, [activeStory]);

	return (
		<>
			<div className={styles.mainContainer}>
				<h1 className={styles.h1}>Your BookMark Stories</h1>
				{!storyLoading ? (
					<>
						<div>
							<div className={styles.box}>
								{userBookmarks.length > 0 ? (
									userBookmarks?.map((bookmrkStory, indx) => {
										return <SingleStory key={indx} story={bookmrkStory} />;
									})
								) : (
									<>
										<div className={styles.noStoriesBox}>
											No Bookmark Stories Available
										</div>
									</>
								)}
							</div>
							{remainingCount > 0 && (
								<div className ={styles.showBtnBox}>
									<button
										onClick={() => {
											// setShowMoreClicked(true);
											setPage((prev) => prev + 1);
										}}
										className={styles.showMoreBtn}>
										Show more
									</button>
								</div>
							)}
						</div>
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

export default BookmarkStories;
