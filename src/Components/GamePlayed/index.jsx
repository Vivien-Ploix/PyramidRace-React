import React, { useState, useEffect } from "react";
import "./style.scss";

const GamePlayed = ({ opponentId, winner_id }) => {
  const [opponent, setOpponent] = useState({});
  const getOpponentInfos = () => {
    console.log(opponentId);
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
    <div class="container card-game">
      <div class="row align-middle">
        <div class="col-md-8 col-lg-6 column">
          <div class="card gr-1">
            <div class="txt">
              {winner_id != opponentId && winner_id != null && (
                <div>
                  <h1>Victoire</h1>
                  <p>
                    Tu es le grand gagnant de cette partie ! ( calme toi quand
                    meme)
                  </p>
                </div>
              )}
              {winner_id === opponentId && (
                <div>
                  <h1>Défaite</h1>
                  <p>
                    Tu as perdu...Que tes os reposent au bas de la pyramide pour
                    que de son sommet nous te regardions avec honte et mépris
                  </p>
                </div>
              )}
              {winner_id === null && (
                <div>
                  <h1>En cours</h1>
                  <p>La partie n'est pas encore terminée ! Quel suspens !</p>
                </div>
              )}

              <small>Adversaire : {opponent.pseudo}</small>
            </div>
            <a href="#">Rejouer ?</a>
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
