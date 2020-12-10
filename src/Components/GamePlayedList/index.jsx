import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GamePlayed from "./../GamePlayed";
import PlayerInfos from "./../PlayerInfos";
import "./style.scss";

const GamePlayedList = () => {
  const userId = useSelector((state) => state.id);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [playerStats, setPlayerStats] = useState({});

  const fetchGamesPlayed = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/users/${userId}/games`)
      .then((response) => response.json())
      .then((data) => {
        setGamesPlayed(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    fetchGamesPlayed();
    console.log(userId);
  }, []);

  useEffect(() => {
    let player_stats = {
      games_played: gamesPlayed.length,
      games_won: gamesPlayed.filter((game) => game.winner_id == userId).length,
      games_lost: gamesPlayed.filter(
        (game) => game.winner_id != userId && game.winner_id != null
      ).length,
    };
    setPlayerStats(player_stats);
  }, [gamesPlayed]);

  return (
    <div className="GameInfoContainer">
      <div className="game-info-column col-lg-8">
        <div className="list-container">
          {gamesPlayed.map((game) => {
            if (game.player1_id == userId) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player2_id}
                  winner_id={game.winner_id}
                />
              );
            } else {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player1_id}
                  winner_id={game.winner_id}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="game-info-column col-lg-3 player-infos-col">
        <PlayerInfos player_stats={playerStats} />
      </div>
    </div>
  );
};

export default GamePlayedList;
