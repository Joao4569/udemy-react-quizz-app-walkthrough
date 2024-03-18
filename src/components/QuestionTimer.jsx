import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeout }) {

	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log('SETTING TIMEOUT');
		 const timer = setTimeout(onTimeout, timeout);

		 // Cleanup function
		return () => {
			clearTimeout(timer);
		};
	}, [onTimeout, timeout]);

	useEffect(() => {
		console.log('SETTING INTERVAL');
		const interval = setInterval(() =>{
			setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
		}, 100);

		// Cleanup function
		return () => {
			clearInterval(interval);
		};
	}, []);
	

	return (
		<progress id="question-time" max={timeout} value={remainingTime} />
	);
}