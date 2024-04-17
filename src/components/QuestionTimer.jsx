import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout, onTimeout }) {

	// handle the state of the remaining time
	const [remainingTime, setRemainingTime] = useState(timeout);

	// handle the timet and the timeout
	useEffect(() => {
		console.log('SETTING TIMEOUT');
		const timer = setTimeout(onTimeout, timeout);

		 // timer cleanup function
		return () => {
			clearTimeout(timer);
		};
	}, [onTimeout, timeout]);

	// handle the interval
	useEffect(() => {
		console.log('SETTING INTERVAL');
		const interval = setInterval(() =>{
			setRemainingTime(prevRemainingTime => prevRemainingTime - 100)
		}, 100);

		// interval cleanup function
		return () => {
			clearInterval(interval);
		};
	}, []);
	

	return (
		<progress id="question-time" max={timeout} value={remainingTime} />
	);
}