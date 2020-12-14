import "./style.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import QuestionCard from "./QuestionCard";
import Pyramid from "./assets/pyramid.png";
import Countdown from './Countdown/index'

const Game = () => {
  let { id } = useParams();
  const userId = useSelector((state) => state.id);
  const tokenCookie = Cookie.get("token");
  const [game, setGame] = useState({});
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [gameOn, setGameOn] = useState(false);
  const [counter, setCounter] = useState(10);
  const [newQuestionTime, setNewQuestionTime] = useState(new Date(Date.now()))

  useEffect(() => {
    console.log(questions);
    if (questions.length === 12) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setGameOn(true);
      console.log(currentQuestion);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [questions]);

  useEffect(() => {
    fetchGame();
  }, []);

  useEffect(() => {
    console.log(newQuestionTime)
  }, [newQuestionTime])

  useEffect(() => {
    setCount(count + 1);
    if (count === 1) {
      fetchQuestions();
    }
  }, [game]);

  const fetchGame = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error));
  };

  const fetchQuestions = () => {
    fetch(
      `https://opentdb.com/api.php?amount=12&category=${game.category}&difficulty=${game.difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => setQuestions(data.results));
  };

  const nextQuestion = (answer_choice, correct_answer) => {
    const data = {
      game_history: {
        user_id: userId,
        game_id: id,
        response_correct:
          (!!answer_choice && !!correct_answer && answer_choice === correct_answer),
        question_time: newQuestionTime,
        response_time: new Date(Date.now())
      },
    };
    fetch(`https://pyramid-race-api.herokuapp.com/game_histories`, {
      method: "post",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());

    if (currentQuestionIndex < 12) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCounter(10);
      setNewQuestionTime(new Date(Date.now()))
    } else {
      setGameOn(false);
      setCurrentQuestion({});
      setCurrentQuestionIndex("");
    }
  };

  return (
    <div className="game_page">
      {gameOn && (
        <>
          <Countdown onExpire={nextQuestion} resetTick={currentQuestionIndex}/>
          <QuestionCard
            question={currentQuestion.question}
            correct_answer={currentQuestion.correct_answer}
            incorrect_answers={currentQuestion.incorrect_answers}
            nextQuestion={nextQuestion}
          />
        </>
      )}
      <div className="game_content">
        <img className="pyramid" src={Pyramid} />
      </div>
    </div>
  );
};

export default Game;
