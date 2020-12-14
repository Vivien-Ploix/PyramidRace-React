import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

const Game = () => {
  let { id } = useParams();
  const [game, setGame] = useState({});
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);

  const fetchGame = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/games/${id}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGame();
  }, []);

  useEffect(() => {
    console.log(questions);
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

  return (
    <div className= 'game_page'>
      {/* <img
        className="pyramid"
        src="/assets/images/pyramide_fond.png"
      /> */}
    </div>
  );
};

export default Game;
