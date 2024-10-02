import React, { useState } from "react";
import {
	SET_AddStoryPopup,
	SET_MainLoading,
	SET_ViewStoryPopup,
} from "../../Redux/slice/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { getStoryApi } from "../../ApisSection/StoriesApi";
import {
	SET_ActiveStory,
	SET_EditingMode,
	SET_EditingStory,
} from "../../Redux/slice/storySlice";
import { MdEdit } from "react-icons/md";
import styles from "../../Styles/StoryStyles/singleStory.module.css";

function SingleStory({ story }) {
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	//to get story page
	const handleStory = async () => {
		const storyId = story._id;
		try {
			dispatch(SET_MainLoading(true));
			const res = await getStoryApi({ storyId });
			dispatch(SET_ActiveStory(res.data));
			dispatch(SET_ViewStoryPopup(true));
		} catch (err) {
			toast.error(err.message);
			dispatch(SET_ViewStoryPopup(false));
		} finally {
			dispatch(SET_MainLoading(false));
		}
	};

	//edit
	const handleEditBtnClick = () => {
		try {
			dispatch(SET_EditingMode(true));
			dispatch(SET_EditingStory(story));
			dispatch(SET_AddStoryPopup(true));
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.outerBox}>
			<div onClick={handleStory} className={styles.mainBox}>
				<div className={styles.imageBox}>
					<img
						className={!load ? `${styles.loading}` : ""}
						onLoad={() => setLoad(true)}
						loading="lazy"
						src={story.slides[0].ImageURL}
						alt=""
					/>
				</div>
				<div className={styles.storyInfo}>
					<h1 className={styles.h1}>
						{story.slides[0].Heading.length > 40
							? `${story.slides[0].Heading.substring(0, 20)}...`
							: story.slides[0].Heading}
					</h1>
					<p className={styles.p}>
						{story.slides[0].Description.length > 150
							? `${story.slides[0].Description.substring(0, 150)}...`
							: story.slides[0].Description}
					</p>
				</div>
			</div>
			{story?.addedBy === user._id && (
				<div>
					<div onClick={handleEditBtnClick} className={styles.editBtnContainer}>
						<div className={styles.editIcon}>
							<MdEdit />
						</div>
						<span>edit</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default SingleStory;
