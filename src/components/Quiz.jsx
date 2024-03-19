import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";  
import QuestionTimer from "./QuestionTimer.jsx"; 
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {

  // manage the user's current answer state
  const [answerState, setAnswerState] = useState('');

  // manage the user's answers
  const [userAnswers, setUserAnswers] = useState([]);

  // get the index of the current question
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  // check if the quiz is complete
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  // handle the user's answer selection and answer correctness
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswerState('answered');
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });

    setTimeout(() => {
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000);
    }, 1000)
  }, [activeQuestionIndex]);

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
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
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
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          }
          )}
        </ul>

      </div>
    </div>
  );
}
