import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// components
import QuestionCard from "./components/QuestionCard";
// Types
import { QuestionState, Difficulty } from "./API";
// styles
import { GlobalStyle, Wrapper } from "./App.styles";
import { Box, FormControl, Input, styled, TextField } from "@mui/material";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const QuestionNumberContainer = styled(Box)({
  maxWidth: 1100,
  background: "#ebfeff",
  borderRadius: 10,
  border: "2px solid #0085a3",
  padding: 20,
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
});

const App = () => {
  const [totalQuestions, setTotalQuestions] = useState<number>(10);
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
    console.log("newQuestions", newQuestions);

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

  const changeQuestionsNumber = (questionNumber: any) => {
    setTotalQuestions(questionNumber);
  };

  const resetQuestion = (questionNumber: any) => {
    setTotalQuestions(10);
    setLoading(false);
    setQuestions([]);
    setNumber(0);
    setUserAnswers([]);
    setScore(0);
    setQuizOver(true);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {/* {quizOver ? (
          <QuestionNumberContainer>
            <TextField
              required
              id="outlined-required"
              label="Questions Amount"
              type="number"
              error={!totalQuestions || totalQuestions > 20}
              helperText="Questions must be less than 20"
              defaultValue="10"
              onChange={(e) => changeQuestionsNumber(e.target.value)}
            />
          </QuestionNumberContainer>
        ) : null} */}
        {!quizOver ? <p className="score">Score: {score}</p> : null}
        {/* {quizOver || Number(userAnswers.length) === Number(totalQuestions) ? (
          <button
            disabled={!totalQuestions || totalQuestions > 20}
            className="start"
            onClick={resetQuestion}
          >
            Reset
          </button>
        ) : null} */}
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

export default App;
