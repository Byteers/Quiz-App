// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Select 15 random questions
  useState(() => {
    const shuffledData = shuffleArray(data).slice(0, 15);
    setSelectedQuestions(shuffledData);
    setQuestion(shuffledData[index]);
  }, []);

  const checkAns = (e, ans) => {
    if (!answered) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setCorrectAnswers(correctAnswers + 1);
      } else {
        e.target.classList.add("incorrect");
        const correctOption = e.target.parentNode.querySelector(`li:nth-child(${question.ans})`);
        correctOption.classList.add("correct");
      }
      setAnswered(true);
    }
  };

  const handleNext = () => {
    if (index < selectedQuestions.length - 1) {
      setIndex(index + 1);
      setQuestion(selectedQuestions[index + 1]);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
    }
    // Reset classes for all options
    const options = document.querySelectorAll(".container li");
    options.forEach(option => {
      option.classList.remove("correct", "incorrect");
    });
  };

  const handleReset = () => {
    const shuffledData = shuffleArray(data).slice(0, 15);
    setSelectedQuestions(shuffledData);
    setQuestion(shuffledData[0]);
    setIndex(0);
    setCorrectAnswers(0);
    setQuizCompleted(false);
    setAnswered(false);
  };

  const getResultEmoji = () => {
    const percentage = (correctAnswers / selectedQuestions.length) * 100;
    if (percentage === 100) {
      return (
        <span role="img" aria-label="Party Emoji">🎉</span>
      );
    } else if (percentage >= 80) {
      return (
        <span role="img" aria-label="Happy Emoji">😊</span>
      );
    } else if (percentage >= 60) {
      return (
        <span role="img" aria-label="Smile Emoji">😄</span>
      );
    } else {
      return (
        <span role="img" aria-label="Sad Emoji">😔</span>
      );
    }
  };

  if (quizCompleted) {
    return (
      <div className="container">
        <h1>Quiz Result {getResultEmoji()}</h1>
        <hr />
        <p>You scored {correctAnswers} out of {selectedQuestions.length} questions.</p>
        <button onClick={handleReset}>Reset Quiz</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Quiz</h1>
      <hr />
      <h2>
        Question {index + 1}. {question.question}
      </h2>
      <ul>
        <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
        <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
        <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
        <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
      </ul>

      <button onClick={handleNext}>Next</button>
      <div className="index">
        {index + 1} of 15 questions
      </div>
    </div>
  );
};

export default Quiz;
