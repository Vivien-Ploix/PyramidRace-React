import "./style.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import QuestionCard from "../../Components/QuestionCard";
import Countdown from "../../Components/Countdown/test2";

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
  const [counter, setCounter] = useState(15);

  const fetchGame = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    console.log(counter);
  }, [counter]);

  useEffect(() => {
    fetchGame();
  }, []);

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
    setCount(count + 1);
    if (count === 1) {
      fetchQuestions();
    }
  }, [game]);

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
        response_correct: answer_choice === correct_answer ? true : false,
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
      setCounter(15);
    } else {
      setGameOn(false);
      setCurrentQuestion({});
      setCurrentQuestionIndex("");
    }
  };

  return (
    <div>
      <div>Countdown: {counter}</div>
      {gameOn && (
        <QuestionCard
          question={currentQuestion.question}
          correct_answer={currentQuestion.correct_answer}
          incorrect_answers={currentQuestion.incorrect_answers}
          nextQuestion={nextQuestion}
        />
      )}

      <img
        className="pyramid"
        src="https://images-ext-1.discordapp.net/external/tF1PXlIZEKh7BcTePbgP6i3-KggPwIF-OrfVurkS5ug/https/img2.freepng.es/20180607/kct/kisspng-chichen-itza-maya-civilization-computer-icons-meso-architecture-tools-5b19d3209ce524.4773494615284191046427.jpg"
      ></img>
    </div>
  );
};

export default Game;
