import React from "react";
import "./style.scss";
import ProgressBar from "./ProgressBar/index";

const PlayerInfos = ({ player_stats }) => {
  const playerScore = player_stats.games_won * 5 - player_stats.games_lost * 3;
  return (
    <div className="card card-profil">
      <img
        className="card-profil__image"
        src="https://i.pinimg.com/originals/01/f5/53/01f553f33d606119eef6ed32476842be.jpg"
        alt=""
      ></img>
      <div className="card-body card-profil__content text-center">
        <h3 className="card-title card-profil__title">Mes statistiques</h3>
        <ProgressBar playerScore={playerScore} />

        <p className="card-text">
          Nombre de parties : {player_stats.games_played}
          <br></br>
          Nombre de victoires : {player_stats.games_won}
          <br></br>
          Nombre de défaites : {player_stats.games_lost}
        </p>
      </div>
    </div>
  );
};

export default PlayerInfos;
