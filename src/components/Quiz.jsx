import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";  
import QuestionTimer from "./QuestionTimer.jsx"; 
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {

  // manage the user's answers
  const [userAnswers, setUserAnswers] = useState([]);

  // get the index of the current question
  const activeQuestionIndex = userAnswers.length;

  // check if the quiz is complete
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // handle the user's answer selection
  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  // handle the user's answer skip
  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);


  // render the quiz complete message
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img
          src={quizCompleteImg}
          alt="Trophy icon - All quiz questions completed"
        />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // shuffle the answers for the current question [correct answer is always the first answer in the array, in the questions.js file]
	const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
	shuffledAnswers.sort(() => Math.random() - 0.5);

  // render the quiz component with the current question
  return (
    <div id="quiz">
      <div id="question">

        <QuestionTimer
          key={activeQuestionIndex} // When the key changes then the component is unmounted and remounted.
          timeout ={10000}
          onTimeout={handleSkipAnswer}
        />

        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
