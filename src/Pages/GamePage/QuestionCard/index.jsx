import "./style.scss";
import React from "react";

const QuestionCard = ({
  question,
  incorrect_answers,
  correct_answer,
  nextQuestion,
}) => {
  console.log(correct_answer)
  const questionArray = incorrect_answers
  if( questionArray.length < 4) {
    questionArray.push(correct_answer)
  }

  const shuffle = (array) => {


    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffle(questionArray);
  
  return (
    <>
      <div className="card question-card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="card-text">
            <span dangerouslySetInnerHTML={{__html:question}}/>
            <br />
            <div className="answers">
              {questionArray.map((choice) => {
                return (
                  <button
                    className="answer-button"
                    onClick = {() => nextQuestion(choice, correct_answer)}
                  >
                    <span dangerouslySetInnerHTML={{__html:choice}}/>
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
