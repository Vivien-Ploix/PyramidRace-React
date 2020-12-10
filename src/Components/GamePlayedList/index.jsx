import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GamePlayed from "./../GamePlayed";

const GamePlayedList = () => {
  const userId = useSelector((state) => state.id);
  const [opponentId, setOpponentId] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState([]);

  const fetchGamesPlayed = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/users/${userId}/games`)
      .then((response) => response.json())
      .then((data) => {
        setGamesPlayed(data);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    fetchGamesPlayed();
    console.log(userId);
  }, []);

  return (
    <div className="row">
      {gamesPlayed.map((game) => {
        if (game.player1_id === userId) {
          return <GamePlayed gameId={game.id} opponentId={game.player2_id} />;
        } else {
          return <GamePlayed gameId={game.id} opponentId={game.player1_id} />;
        }
      })}
    </div>
  );
};

export default GamePlayedList;
