import "./style.scss";
import React, { useEffect } from "react";

const QuestionCard = ({
  question,
  incorrect_answers,
  correct_answer,
  nextQuestion,
}) => {
  const questionArray = incorrect_answers;
  if (questionArray.length < 4) {
    questionArray.push(correct_answer);
  }

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    shuffle(questionArray);
   
  }, [correct_answer]);

  return (
    <>
      <div className="question-card">
        <div className="card-body">
          <div className="card-text text-center">
            <h6 dangerouslySetInnerHTML={{ __html: question }} />
            <br />
            <div className="answers">
              {questionArray.map((choice) => {
                return (
                  <button
                    className="answer-button btn btn-warning"
                    onClick={() => nextQuestion(choice, correct_answer)}
                    key={questionArray.indexOf(choice)}
                  >
                    <p dangerouslySetInnerHTML={{ __html: choice }} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
