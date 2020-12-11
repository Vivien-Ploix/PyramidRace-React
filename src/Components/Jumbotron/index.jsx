import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";

const Jumbotron = () => {
  const userId = useSelector((state) => state.id);
  const tokenCookie = Cookie.get("token");
  const history = useHistory();
  const [possibleOpponents, setPossibleOpponents] = useState([]);

  const fetchPossibleOpponents = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/users`)
      .then((response) => response.json())
      .then((data) => {
        setPossibleOpponents(
          data.filter((user) => user.id !== parseInt(userId))
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPossibleOpponents();
  }, []);

  const startGame = () => {
    const data = {
      game: {
        player1_id: userId,
        player2_id:
          possibleOpponents[
            Math.floor(Math.random() * possibleOpponents.length)
          ].id,
        difficulty: "medium",
        category: Math.floor(Math.random() * (33 - 9) + 9),
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
        console.log(response);
        history.push(`/game/${response.id}`);
      });
  };

  return (
    <div
      id="home"
      className="header-hero bg_cover"
      style={{ backgroundImage: `url(${"assets/images/header-bg.jpg"})` }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="header-content text-center">
              <h3 className="header-title">
                Bienvenue sur Pyramid <em>Race</em> !
              </h3>
              <h2>Confronte ta culture générale avec d'autres joueurs !</h2>
              <p className="text">
                Prouve que tu es le meilleur en atteignant le haut de la
                pyramide ou tu erreras dans ses labyrinthes jusqu'à ce que tu te
                transformes en burrito avarié !
              </p>
              <ul className="header-btn">
                {userId === null && (
                  <li>
                    <Link to="/sign-up" className="main-btn btn-one">
                      Je veux jouer
                    </Link>
                  </li>
                )}
                {userId !== null && (
                  <li>
                    <Link
                      to="/"
                      className="main-btn btn-one"
                      onClick={startGame}
                    >
                      Je veux jouer
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-shape">
        <img src="assets/images/header-shape.svg" alt="shape"></img>
      </div>
    </div>
  );
};

export default Jumbotron;
