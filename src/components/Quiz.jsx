import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  // manage the user's answers
  const [userAnswers, setUserAnswers] = useState([]);

  // get the index of the current question
  const activeQuestionIndex = userAnswers.length;

  // check if the quiz is complete
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // handle the user's answer selection and answer correctness
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  // handle the user's answer skip
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

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

  // render the quiz component with the current question
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
