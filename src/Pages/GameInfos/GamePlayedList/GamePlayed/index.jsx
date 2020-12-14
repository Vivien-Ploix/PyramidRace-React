import "./style.scss";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useSelector } from 'react-redux'

const GamePlayed = ({ opponentId, winner_id, gameId }) => {
  const tokenCookie = Cookie.get('token')
  const [opponent, setOpponent] = useState({});
  const history = useHistory()
  const userId = useSelector((state) => state.id)
  const categoriesArray = [
    9,
    10,
    11,
    12,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    23,
    24,
    26,
    27,
    28,
    31,
    32,
  ];

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


  const startGame = (opponent_id) => {
    const data = {
      game: {
        player1_id: userId,
        player2_id: opponent_id,
        difficulty: "medium",
        category:
          categoriesArray[Math.floor(Math.random() * categoriesArray.length)],
      },
    };

    fetch(`https://pyramid-race-api.herokuapp.com/games`, {
      method: "post",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        history.push(`/game/${response.id}`);
      });
  };


  return (
    <div className="container card-game">
      <div className="row align-middle">
        <div className="col-md-8 col-lg-6 column">
          <div className="card gr-1">
            <div className="txt">
              {winner_id != opponentId && winner_id != null && (
                <div>
                  <h1>
                    <b>Victoire</b>
                  </h1>
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
                    Tu as perdu, à présent nous te regarderons avec le mépris
                    que tu mérites !
                  </p>
                </div>
              )}
              {winner_id === null && (
                <div>
                  <h1>
                    <b>En cours</b>
                  </h1>
                  <p>La partie n'est pas encore terminée ! Quel suspens !</p>
                </div>
              )}

              <small>Adversaire : {opponent.pseudo}</small>
            </div>
            {winner_id === null && <Link to={{pathname: `/game/${gameId}`}}>Jouer</Link>}
            {winner_id !== null && <Link to="/" onClick={() => startGame(opponentId)}>Rejouer</Link>}

            <div className="ico-card">
              <i className="lni lni-pyramids"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayed;
