import { useState } from 'react';

export default function Quiz() {

	const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [userAnswer, setUserAnswer] = useState([]);

	return (
		<p>Currently active question</p>
	);
}