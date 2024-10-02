import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import StoryHeader from "./StoryHeader";
import styles from "../../Styles/StoryStyles/viewStoryPopup.module.css";
import {
	SET_LoginPopup,
	SET_ViewStoryPopup,
} from "../../Redux/slice/mainSlice";
import { SET_ActiveStory } from "../../Redux/slice/storySlice";
import { bookmarkStoryApi, likeStoryApi } from "../../ApisSection/StoriesApi";

//Icons
import { FaBookmark } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { MdFileDownloadDone } from "react-icons/md";

const API_endPt = `web-story-three.vercel.app/`;

function ViewStoryPopup({ isSmallScreen }) {
	let duration = 5000;
	const { activeStory } = useSelector((state) => state.story);
	const { user } = useSelector((state) => state.user);
	const { token } = user;
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [load, setLoad] = useState(false);
	const [activeIndx, setActiveIndx] = useState(0);
	const [prog, setProg] = useState(0);
	const [likeNo, setLikeNo] = useState(activeStory?.likeCount || 0);
	const [isLike, setIsLike] = useState(activeStory?.likes?.includes(user._id));
	const [isBookmrk, setBookmark] = useState(
		activeStory?.bookmarks?.includes(user._id)
	);
	const [isDownloaded, setIsDownloaded] = useState({}); // To track downloads for each slide

	console.log("Active story:", activeStory); //debugging
	if (activeStory && activeStory.length > 0) {
		// Access properties here, knowing it's safe
		console.log(activeStory[0]);
	} else {
		console.log("activeStory is undefined or empty");
	}

	// Ensure activeStory is defined and has slides before accessing its properties
	useEffect(() => {
		if (
			!activeStory ||
			!activeStory.slides ||
			activeStory.slides.length === 0
		) {
			console.error("activeStory is undefined or has no slides");
			dispatch(SET_ActiveStory({}));
			return;
		}
	}, [activeStory, dispatch]);

	const handleForwardIconClick = useCallback(() => {
		if (activeStory?.slides && activeIndx < activeStory.slides.length - 1) {
			setProg(0);
			setLoad(false);
			setActiveIndx((activeIndx) => activeIndx + 1);
		}
	}, [activeIndx, activeStory?.slides]);

	const handleBackIconClick = useCallback(() => {
		if (activeIndx > 0) {
			setProg(0);
			setActiveIndx((activeIndx) => activeIndx - 1);
		}
	}, [activeIndx]);

	const handleCloseIconClick = useCallback(() => {
		if (location.pathname.startsWith("/view-story")) {
			dispatch(SET_ViewStoryPopup(false));
			dispatch(SET_ActiveStory({}));
			navigate("/");
		} else {
			dispatch(SET_ViewStoryPopup(false));
			dispatch(SET_ActiveStory({}));
		}
	}, [dispatch, location.pathname, navigate]);

	const handleShareIconClick = async () => {
		const copyText = `${API_endPt}view-story/${activeStory._id}`;
		await navigator.clipboard.writeText(copyText);
		toast.success("Copied to clipboard");
	};

	const handleLikeIconClick = async () => {
		if (!user || !user.token) {
			dispatch(SET_ViewStoryPopup(false));
			dispatch(SET_LoginPopup(true));
			toast.error("Please login to like the post.");
			navigate("/");
		} else {
			const storyId = activeStory._id;
			try {
				setIsLike((prev) => !prev);
				setLikeNo((prev) => {
					if (isLike === false) {
						return prev + 1;
					} else if (isLike === true) {
						return prev - 1;
					}
				});
				await likeStoryApi({ storyId, token });
			} catch (err) {
				toast.error(err.message);
				if (err.response?.status === 401) {
					toast.error("Session expired. Please log in again.");
					dispatch(SET_LoginPopup(true));
				} else {
					toast.error(err.message);
				}
			}
		}
	};

	const handleBookmarkIconClick = async () => {
		if (!user || !user.token) {
			dispatch(SET_ViewStoryPopup(false));
			dispatch(SET_LoginPopup(true));
			toast.error("Please login to bookmark the post.");
			navigate("/");
		} else {
			const storyId = activeStory._id;
			try {
				setBookmark((prev) => !prev);
				await bookmarkStoryApi({ storyId, token });
			} catch (error) {
				toast.error(error.message);
			}
		}
	};

	// Function to handle download
	const handleDownloadClick = async (slideId, imageUrl) => {
		try {
			// Use Fetch API to download image
			const response = await fetch(imageUrl);
			if (!response.ok) throw new Error("Network response was not ok");

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			// Create a temporary link to download the image
			const link = document.createElement("a");
			link.href = url;
			link.download = `slide_${slideId}.jpg`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);

			// Set the state to mark the slide as downloaded
			setIsDownloaded((prev) => ({ ...prev, [slideId]: true }));
		} catch (error) {
			toast.error("Download failed. Please try again.");
		}
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.keyCode === 37) {
				handleBackIconClick();
			} else if (event.keyCode === 39) {
				handleForwardIconClick();
			} else if (event.keyCode === 27) {
				handleCloseIconClick();
			}
		};

		const handlePopState = (event) => {
			event.preventDefault();
			handleCloseIconClick();
		};

		const handleFullScreen = () => {
			if (!document.fullscreenElement && isSmallScreen) {
				handleCloseIconClick();
			}
		};

		const storyBox = document.getElementById("storyBox");
		if (
			storyBox &&
			isSmallScreen &&
			storyBox.requestFullscreen &&
			document.fullscreenElement
		) {
			storyBox.requestFullscreen();
		}

		window.addEventListener("popstate", handlePopState);
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("fullscreenchange", handleFullScreen);

		return () => {
			window.removeEventListener("popstate", handlePopState);
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("fullscreenchange", handleFullScreen);
		};
	}, [
		handleBackIconClick,
		handleCloseIconClick,
		handleForwardIconClick,
		isSmallScreen,
	]);

	return (
		<div id="storyBoxId" className={`${styles.mainContainer}`}>
			<div className={styles.outerBox}>
				{/* Back Arrow */}
				<div className={styles.backIcon} onClick={handleBackIconClick}>
					<IoIosArrowBack />
				</div>

				<div className={styles.internalBox}>
					{/* top stories header */}
					<div className={styles.storyHeader}>
						<StoryHeader
							slides={activeStory?.slides || []}
							activeIndx={activeIndx}
							handleForward={handleForwardIconClick}
							duration={duration}
							progress={prog}
							setProgress={setProg}
							load={load}
						/>
					</div>

					{/* upper buttons */}
					<div className={styles.upperBtnBox}>
						<div onClick={handleCloseIconClick} className={styles.closeBox}>
							<IoClose size={20} className={styles.closeIcon} />
						</div>

						<div onClick={handleShareIconClick} className={styles.shareBox}>
							<CiShare2 size={15} className={styles.shareIcon} />
						</div>
					</div>

					<div className={styles.imageContainer}>
						<div
							onClick={() => {
								isSmallScreen && handleBackIconClick();
							}}
							className={styles.beforeImage}></div>
						<img
							key={activeIndx}
							className={!load ? `${styles.loading}` : ""}
							loading="eager"
							onLoad={() => setLoad(true)}
							src={
								activeStory?.slides && activeStory.slides.length > activeIndx
									? activeStory.slides[activeIndx].ImageURL
									: "Slide Image..."
							}
							// alt="Slide image"
							// src={activeStory?.slides[activeIndx]?.image || ""} // Ensure you use the correct property
							//src={activeStory?.slides?.[activeIndx]?.ImageURL || ""}
						/>
						<div
							onClick={() => {
								isSmallScreen && handleForwardIconClick();
							}}
							className={styles.afterImage}></div>
					</div>

					{/* story data */}
					<div className={styles.storyInfo}>
						<h2>
							{activeStory?.slides?.[activeIndx]?.Heading?.length > 70
								? `${activeStory?.slides?.[activeIndx]?.Heading.substring(
										0,
										70
								  )}...`
								: activeStory?.slides?.[activeIndx]?.Heading || ""}
						</h2>
						<p>
							{activeStory?.slides?.[activeIndx]?.Description?.length > 250
								? `${activeStory?.slides?.[activeIndx]?.Description.substring(
										0,
										250
								  )}...`
								: activeStory?.slides?.[activeIndx]?.Description || ""}
						</p>
					</div>

					{/* lower buttons */}
					{/* <div className={styles.lowerActionBtns}>
						

						<div
							onClick={handleLikeIconClick}
							className={`${styles.heartIcon} ${
								isLike ? styles.activeHeartIcon : ""
							}`}>
							{isLike ? (
								<FcLike size={16} className={styles.heart} />
							) : (
								<FaHeart size={16} className={styles.heart} />
							)}
							<p>{likeNo || 0}</p>
						</div>
					</div> */}
					<div className={styles.lowerActionBtns}>
						<div
							onClick={handleBookmarkIconClick}
							className={`${styles.bookMarkIcon} ${
								isBookmrk ? styles.activeBookMarkIcon : ""
							}`}>
							<FaBookmark
								size={15}
								fill={isBookmrk ? "blue" : "white"}
								className={styles.bookMarkIcon}
							/>
						</div>

						{/* Download Button */}
						<div className={styles.downloadIcon}>
							{isDownloaded[activeStory?.slides[activeIndx]._id] ? (
								<MdFileDownloadDone size={25} fill="white" />
							) : (
								<IoMdDownload
									fill="white"
									size={25}
									onClick={() =>
										handleDownloadClick(
											activeStory?.slides[activeIndx]._id,
											activeStory?.slides[activeIndx].image // Use the correct property
										)
									}
								/>
							)}
						</div>

						<div className={styles.likeBox}>
							{/* <div
								onClick={handleLikeIconClick}
								className={`${styles.likeIcon} ${
									isLike && styles.activeLikeIcon
								}`}>
								<FaHeart size={25} fill="white" className={styles.likeIcon} />
							</div> */}
							<div
								onClick={handleLikeIconClick}
								className={`${styles.likeIcon} ${
									isLike && styles.activeLikeIcon
								}`}>
								<FaHeart
									size={25}
									fill={isLike ? "red" : "white"}
									className={styles.likeIcon}
								/>
							</div>

							<span>{likeNo}</span>
						</div>
					</div>
				</div>

				{/* forward arrow */}
				<div className={styles.forwardIcon} onClick={handleForwardIconClick}>
					<IoIosArrowForward />
				</div>
			</div>
		</div>
	);
}

export default ViewStoryPopup;
