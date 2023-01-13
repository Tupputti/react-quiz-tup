import { Box, Button } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const QuestionContainer = styled(Box)({
  maxWidth: 1100,
  background: "#ebfeff",
  borderRadius: 10,
  border: "2px solid #0085a3",
  padding: 20,
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
});

const ButtonAnswer = styled(Button)({
  cursor: "pointer",
  userSelect: "none",
  fontSize: "0.8rem",
  width: "100%",
  height: 40,
  background: "linear-gradient(90deg, #56ccff, #6eafb4)",
  border: "2px solid #fff",
  boxShadow: "1px 2px 0px rgba(0, 0, 0, 0.1)",
  borderRadius: 10,
  padding: "0 40px",
  color: "#ffffff",
});

const ButtonCorrectAnswer = styled(Button)({
  cursor: "pointer",
  userSelect: "none",
  fontSize: "0.8rem",
  width: "100%",
  height: 40,
  background: "linear-gradient(90deg, #56ffa4, #59bc86)",
  border: "2px solid #fff",
  boxShadow: "1px 2px 0px rgba(0, 0, 0, 0.1)",
  borderRadius: 10,
  padding: "0 40px",
  color: "#ffffff",
});

const ButtonInCorrectAnswer = styled(Button)({
  cursor: "pointer",
  userSelect: "none",
  fontSize: "0.8rem",
  width: "100%",
  height: 40,
  background: "linear-gradient(90deg, #ff5656, #c16868)",
  border: "2px solid #fff",
  boxShadow: "1px 2px 0px rgba(0, 0, 0, 0.1)",
  borderRadius: 10,
  padding: "0 40px",
  color: "#ffffff",
});

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <QuestionContainer>
    <p className="number">
      Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          {userAnswer?.correctAnswer === answer && (
            <ButtonCorrectAnswer
              style={{
                marginTop: "5px",
                marginBottom: "5px",
              }}
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </ButtonCorrectAnswer>
          )}
          {userAnswer?.answer === answer &&
            userAnswer?.correctAnswer !== answer && (
              <ButtonInCorrectAnswer
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </ButtonInCorrectAnswer>
            )}
          {userAnswer?.correctAnswer !== answer &&
            userAnswer?.answer !== answer && (
              <ButtonAnswer
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </ButtonAnswer>
            )}
        </div>
      ))}
    </div>
  </QuestionContainer>
);
export default QuestionCard;
