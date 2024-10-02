import React, { useEffect, useRef, useState } from "react";
import Loader from "../LoaderSection/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
	SET_AddStoryPopup,
	SET_MainLoading,
} from "../../Redux/slice/mainSlice";
import { addStoryApi, updateStory } from "../../ApisSection/UserApi";
import toast from "react-hot-toast";
import {
	SET_EditingMode,
	SET_EditingStory,
} from "../../Redux/slice/storySlice";
import { IoClose } from "react-icons/io5"; // import close icon
import styles from "../../Styles/StoryStyles/addStoryPopup.module.css";
const initialSlide = {
	Heading: "",
	Description: "",
	ImageURL: "",
};

function AddStoryPopup({ setNewStoryAdd }) {
	const dispatch = useDispatch();
	const { loading, categories } = useSelector((state) => state.main);
	const [slides, setSlides] = useState([
		initialSlide,
		initialSlide,
		initialSlide,
	]);
	const [closedBtnClick, setClosedBtnClick] = useState(false);
	const [category, setCategory] = useState(categories[1]?.key);
	const [activeIndx, setActiveIndx] = useState(0);
	const [err, setErr] = useState("");
	const formRef = useRef(null);
	const { user } = useSelector((state) => state.user);
	const { editMode, editingStory } = useSelector((state) => state.story);
	const { token } = user;

	//handle close button click
	const handleClosedBtn = () => {
		if (editMode) {
			dispatch(SET_EditingMode(false));
			dispatch(SET_EditingStory({}));
		}
		setClosedBtnClick(true);
		setTimeout(() => {
			dispatch(SET_AddStoryPopup(false));
		}, 400);
	};

	//handle add slide button click
	const handleAddNewSlide = () => {
		if (slides.length > 6) return;
		setSlides((prev) => [...prev, initialSlide]);
	};

	//handle remove slide button click
	const handleRemoveSlide = (indx) => {
		setSlides((prev) => prev.filter((_, i) => i !== indx));
	};

	//handle slide click -- user click on it
	const handleSlideClick = (indx) => {
		setActiveIndx(indx);
	};

	//handle input change -- user type in the input field
	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setSlides((prev) => {
			const updateSlides = [...prev];
			updateSlides[activeIndx] = { ...prev[activeIndx], [id]: value };
			return updateSlides;
		});
	};

	//handle category change -- user selects a category
	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	//handle prev button click
	const handleprevBtnClick = () => {
		setErr("");
		if (activeIndx > 0) {
			setActiveIndx((prev) => prev - 1);
		}
	};

	//handle next button click
	const handleNextBtnClick = () => {
		setErr("");
		if (activeIndx < slides.length - 1) {
			setActiveIndx((prev) => prev + 1);
		}
	};

	//handle post button click
	const postBtnClick = () => {
		try {
			slides.forEach((slide, indx) => {
				if (!slide.Heading) throw new Error("Please provide heading");
				if (!slide.Description) throw new Error("Please provide description");
				if (!slide.ImageURL) throw new Error("Please provide imageURL");
				if (!isValidUrl(slide.ImageURL))
					throw new Error("Please provide valid imageURL");
			});

			if (!category) {
				throw new Error("Please provide category");
			}
			handleSubmit();
			setErr("");
		} catch (error) {
			setErr(error.message);
		}
	};

	//check if the url is valid
	const isValidUrl = (url) => {
		return url.startsWith("http://") || url.startsWith("https://");
	};

	//handle submit button click
	const handleSubmit = async () => {
		dispatch(SET_MainLoading(true));
		try {
			const values = { slides, category: category };
			if (editMode) {
				const storyId = editingStory._id;
				const res = await updateStory({ storyId, values, token });
				toast.success("Story updated successfully");
			} else {
				const res = await addStoryApi({ values, token });
				toast.success("Story created successfully");
				setNewStoryAdd(true); // Notify that a new story has been added
			}
			handleClosedBtn();
			window.location.reload();
			setNewStoryAdd(false);
		} catch (error) {
			toast.error(error.message);
		} finally {
			dispatch(SET_MainLoading(false));
		}
	};

	//handle edit mode
	useEffect(() => {
		if (editMode && editingStory) {
			setCategory(editingStory.category);

			const slideData = editingStory.slides.map((slide) => ({
				Heading: slide.Heading,
				Description: slide.Description,
				ImageURL: slide.ImageURL,
			}));
			setSlides(slideData);
		}
	}, [editMode, editingStory]);

	return (
		<div
			className={`${styles.mainContainer} entryAnimation ${
				closedBtnClick && "exitAnimation"
			}`}>
			<div className={styles.container}>
				<div onClick={handleClosedBtn}>
					<IoClose size={35} className={styles.closeIcon} />
				</div>
				<div className={styles.innerBox}>
					<div className={styles.slideAddMsg}>Add Upto 6 Slides</div>
					<div className={styles.slideBox}>
						{slides.map((slide, indx) => (
							<div key={indx}>
								<div
									onClick={() => handleSlideClick(indx)}
									className={`${styles.slide} ${
										indx === activeIndx && styles.activeSlide
									}`}>
									{`Slide ${indx + 1}`}
									{indx > 2 && (
										<div
											onClick={() => handleRemoveSlide(indx)}
											className={styles.slideCloseIcon}>
											<IoClose size={20} />
										</div>
									)}
								</div>
							</div>
						))}
						{slides.length < 6 && (
							<div onClick={handleAddNewSlide} className={styles.addBtn}>
								Add +
							</div>
						)}
					</div>

					{/* Form Conatiner  */}
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className={styles.formBox}>
						<div className={styles.inputBox}>
							<label htmlFor="Heading" className={styles.label}>
								Heading
							</label>
							<input
								placeholder="Heading"
								className={styles.input}
								type="text"
								id="Heading"
								autoFocus
								value={slides[activeIndx]?.Heading || ""}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.inputBox}>
							<label htmlFor="Description" className={styles.label}>
								Description
							</label>
							<textarea
								placeholder="Description"
								className={styles.textarea}
								id="Description"
								value={slides[activeIndx]?.Description || ""}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.inputBox}>
							<label htmlFor="Image" className={styles.label}>
								Image
							</label>
							<input
								placeholder="Image Url"
								className={styles.input}
								type="text"
								id="ImageURL"
								value={slides[activeIndx]?.ImageURL || ""}
								onChange={handleInputChange}
							/>
						</div>

						<div className={styles.inputBox}>
							<label htmlFor="Category" className={styles.label}>
								Category
							</label>
							<select
								onChange={handleCategoryChange}
								className={styles.select}
								id="Category"
								value={category}>
								{categories.slice(1).map((category, indx) => (
									<option
										className={styles.option}
										key={indx}
										value={category.key}>
										{category.name}
									</option>
								))}
							</select>
						</div>
					</form>
				</div>
				<div>{err && <p className={styles.err}>{err}</p>}</div>

				{/* buttons  */}
				<div className={styles.actionBtnBox}>
					<div className={styles.prevNextBtnBox}>
						<button
							onClick={handleprevBtnClick}
							className={`${styles.btn} ${styles.prevBtn}`}
							type="button">
							Previous
						</button>
						<button
							onClick={handleNextBtnClick}
							className={`${styles.btn} ${styles.nextBtn}`}
							type="button">
							Next
						</button>
					</div>

					<button
						onClick={postBtnClick}
						className={`${styles.btn} ${styles.postBtn}`}
						type="button">
						{loading === true ? "Wait..." : editMode ? "Update" : "Post"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default AddStoryPopup;
