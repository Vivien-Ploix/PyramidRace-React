import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Jumbotron = () => {
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
                <li>
                  <Link to="/sign-up" className="main-btn btn-one">
                    Je veux jouer, caramba !
                  </Link>
                </li>
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
