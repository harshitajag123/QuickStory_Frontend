import React, { useEffect } from "react";
import ViewStoryPopup from "../Components/StoriesSection/ViewStoryPopup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getStoryApi } from "../ApisSection/StoriesApi";
import { SET_ViewStoryPopup } from "../Redux/slice/mainSlice";
import { SET_ActiveStory } from "../Redux/slice/storySlice";

function ViewStory() {
	const { id: storyId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchStory = async () => {
			try {
				const data = await getStoryApi({ storyId });
				dispatch(SET_ViewStoryPopup(true));
				dispatch(SET_ActiveStory(data.data));
			} catch (error) {
				toast.error(error.message);
				dispatch(SET_ViewStoryPopup(false));
			}
		};
		fetchStory();
	}, [dispatch, storyId]);

	return <div><ViewStoryPopup/> </div>;
}

export default ViewStory;
