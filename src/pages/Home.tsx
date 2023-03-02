import React, { useEffect, useState } from "react";
import { fetchQuizQuestions, QuestionState } from "../API";
import { GlobalStyle, Wrapper } from "../App.styles";
import QuestionCard from "../components/QuestionCard";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Home = () => {
  const [totalQuestions, _setTotalQuestions] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setQuizOver(false);

    const newQuestions = await fetchQuizQuestions();

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);

    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      //users answer
      const answer = e.currentTarget.value;
      // check answer agianst correct answer
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((currentScore) => currentScore + 1);
      }
      // save answer in the array gor user answer
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((currentAnswers) => [...currentAnswers, AnswerObject]);
    }
  };

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (Number(nextQuestion) === Number(totalQuestions)) {
      setQuizOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  useEffect(() => {
    if (quizOver) {
      startQuiz();
    }
  });

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {!quizOver ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !quizOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={totalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!quizOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== totalQuestions - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}

        {quizOver || Number(userAnswers.length) === Number(totalQuestions) ? (
          <button
            disabled={!totalQuestions || totalQuestions > 20}
            className="start"
            onClick={startQuiz}
          >
            {!quizOver ? "start agian" : "start"}
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default Home;
