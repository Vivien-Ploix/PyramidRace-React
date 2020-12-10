import React, { useState, useEffect } from "react";
import "./style.scss";

const GamePlayed = ({ gameId, opponentId }) => {
  const [opponent, setOpponent] = useState({});
  const getOpponentInfos = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/users/${opponentId}`)
      .then((response) => response.json())
      .then((data) => {
        setOpponent(data);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getOpponentInfos();
  }, []);

  return (
    <div class="container h-100">
      <div class="row align-middle">
        <div class="col-md-8 col-lg-6 column">
          <div class="card gr-1">
            <div class="txt">
              <h1>Défaite</h1>
              <p>Vous avez atteint l'étage 3 de la pyramide</p>
              <small>Adversaire : {opponent.pseudo}</small>
            </div>
            <a href="#">Rejouer</a>
            <div class="ico-card">
              <i class="lni lni-pyramids"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayed;
