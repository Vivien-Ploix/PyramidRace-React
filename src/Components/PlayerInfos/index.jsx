import React from "react";
import "./style2.scss";

const PlayerInfos = ({ player_stats }) => {
  console.log(player_stats);
  return (
    <div class="card card-profil">
      <img
        class="card-profil__image"
        src="https://i.pinimg.com/originals/01/f5/53/01f553f33d606119eef6ed32476842be.jpg"
        alt=""
      ></img>

      <div class="card-body card-profil__content">
        <h3 class="card-title card-profil__title">Mes statistiques</h3>
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
