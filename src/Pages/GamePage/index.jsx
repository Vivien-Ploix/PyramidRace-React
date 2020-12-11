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
    <div>
      <img
        className="pyramid"
        src="https://images-ext-1.discordapp.net/external/tF1PXlIZEKh7BcTePbgP6i3-KggPwIF-OrfVurkS5ug/https/img2.freepng.es/20180607/kct/kisspng-chichen-itza-maya-civilization-computer-icons-meso-architecture-tools-5b19d3209ce524.4773494615284191046427.jpg"
      ></img>
    </div>
  );
};

export default Game;
