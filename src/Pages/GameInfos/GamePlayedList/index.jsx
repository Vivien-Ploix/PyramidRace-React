import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GamePlayed from "./GamePlayed";
import PlayerInfos from "./../PlayerInfos";
import "./style.scss";

const GamePlayedList = () => {
  const userId = useSelector((state) => state.id);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [gamesToPlay, setGamesToPlay] = useState([]);
  const [playerStats, setPlayerStats] = useState({});
  const [gamesPlayedStats, setGamesPlayedStats] = useState([]);

  const fetchGamesPlayed = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/users/${userId}/games`)
      .then((response) => response.json())
      .then((data) => {
        setGamesPlayedStats(data);
        let slicedData = data.slice(0, 10);
        setGamesPlayed(slicedData);
      })
      .catch((error) => console.log(error));
  };

  const fetchGamesToPlay = () => {
    fetch(
      `https://pyramid-race-api.herokuapp.com/users/${userId}/games_to_play`
    )
      .then((response) => response.json())
      .then((data) => {
        setGamesPlayedStats(data);
        let slicedData = data.slice(0, 10);
        setGamesToPlay(slicedData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchGamesPlayed();
    fetchGamesToPlay();
  }, []);

  useEffect(() => {
    let player_stats = {
      games_played: gamesPlayedStats.length,
      games_won: gamesPlayedStats.filter((game) => game.winner_id === userId)
        .length,
      games_lost: gamesPlayedStats.filter(
        (game) => game.winner_id !== userId && game.winner_id !== null
      ).length,
    };
    setPlayerStats(player_stats);
    console.log(gamesPlayed);
  }, [gamesPlayed]);

  return (
    <div className="GameInfoContainer">
      <div className="game-info-column col-lg-8">
        <h1 className="text-center">Parties en cours</h1>
        <br />
        <div className="list-container">
          {gamesToPlay.map((game) => {
            if (game.winner_id === null && game.player1_id == userId) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player2_id}
                  winner_id={game.winner_id}
                  key={game.id}
                />
              );
            } else if (game.winner_id === null && game.player2_id == userId) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player1_id}
                  winner_id={game.winner_id}
                  key={game.id}
                />
              );
            }
          })}
        </div>

        <h1 className="text-center">Parties terminées</h1>
        <br />
        <div className="list-container">
          {gamesPlayed.map((game) => {
            if (game.winner_id == userId && game.player1_id == userId) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player2_id}
                  winner_id={game.winner_id}
                  key={game.id}
                />
              );
            } else if (
              game.winner_id == userId &&
              game.player2_id == userId
            ) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player1_id}
                  winner_id={game.winner_id}
                  key={game.id}
                />
              );
            } else if (
              game.winner_id &&
              game.winner_id !== userId &&
              game.player2_id == userId
            ) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player1_id}
                  winner_id={game.winner_id}
                  key={game.id}
                />
              );
            } else if (
              game.winner_id &&
              game.winner_id !== userId &&
              game.player1_id == userId
            ) {
              return (
                <GamePlayed
                  gameId={game.id}
                  opponentId={game.player2_id}
                  winner_id={game.winner_id}
                  key={game.id}
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
