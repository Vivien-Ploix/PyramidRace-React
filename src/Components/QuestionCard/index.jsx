import "./style.scss";
import React from "react";

const QuestionCard = ({
  question,
  incorrect_answers,
  correct_answer,
  nextQuestion,
}) => {
  return (
    <>
      <div className="card question-card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="card-text">
            {question}
            <br />
            <div className="answers">
              {incorrect_answers.map((choice) => {
                return (
                  <button
                    className="answer-button"
                    onClick={() => nextQuestion(choice, correct_answer)}
                  >
                    {choice}
                  </button>
                );
              })}
              <button
                className="answer-button"
                onClick={() => nextQuestion(correct_answer, correct_answer)}
              >
                {correct_answer}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
