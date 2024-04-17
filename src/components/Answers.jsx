import { useRef } from 'react';

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {

	// manage the users current answer state
	const shuffledAnswers = useRef();


	// shuffle the answers for the current question [correct answer is always the first answer in the array, in the questions.js file]
	if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
	  shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

	return (
		<ul id="answers">
			{shuffledAnswers.current.map((answer) => {
				const isSelected = selectedAnswer === answer;
				let cssClass = '';

				if (answerState === 'answered' && isSelected) {
					cssClass ='selected';
				}

				if ((answerState === 'correct' || answerState === 'wrong') &&  isSelected) {
					cssClass = answerState;
				}

				return (
					<li key={answer} className="answer">
						<button
							onClick={() => onSelect(answer)}
							className={cssClass}
							disabled={answerState !== ''}
						>
							{answer}
						</button>
					</li>
				);
			}
			)}
		</ul>
	);
}