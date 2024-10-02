import React, { useEffect } from "react";
import styles from "../../Styles/StoryStyles/storyHeader.module.css";

function StoryHeader({
	slides,
	activeIndx,
	handleForward,
	progress,
	setProgress,
	duration = 5000,
	load,
}) {
	const updateInterval = 100; // Reduced interval to make the animation smoother

	useEffect(() => {
		if (activeIndx < 0 || slides.length === 0) {
			return;
		}

		// Calculate how much progress to increment
		const totalIncre = duration / updateInterval;
		const incrementAmt = 100 / totalIncre;

		// Reset progress when a new slide becomes active
		setProgress(0);

		// Interval to update progress
		const interval = setInterval(() => {
			if (load) {
				setProgress((oldProg) => {
					if (oldProg >= 100) {
						clearInterval(interval); // Clear interval when progress is complete
						handleForward(); // Move to next slide
						return 100;
					}
					return oldProg + incrementAmt; // Increment progress
				});
			}
		}, updateInterval);

		// Cleanup interval on component unmount or slide change
		return () => {
			clearInterval(interval);
		};
	}, [activeIndx, slides.length, duration, load, handleForward, setProgress]);

	//debugging to solve the progress bar issue
	// useEffect(() => {
	// 	console.log("Active Index:", activeIndx);
	// 	console.log("Progress:", progress);
	// }, [activeIndx, progress]);

	return (
		<div className={styles.storyProgContainer}>
			{slides.map((_, indx) => {
				let storyProg = 0;
				let className = `${styles.storyProgItem}`; // Default class

				// Completed slides
				if (indx < activeIndx) {
					storyProg = 100;
					className = `${styles.storyProgItem} ${styles.completed}`;
				}
				// Active slide
				else if (indx === activeIndx) {
					storyProg = progress;
					className = `${styles.storyProgItem} ${styles.active}`;
				}

				return (
					<div key={indx} className={className}>
						<div
							className={styles.storyProgBar}
							style={{ width: `${storyProg}%` }}></div>
					</div>
				);
			})}
		</div>
	);
}

export default StoryHeader;
