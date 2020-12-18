import "./style.scss";
import React from "react";
import GameOver from "./assets/game_over.png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Defeat = () => {
  return (
    <div className="Defeat-Page">
      <h1 className="text-center"> Tu as perdu, gros naze !</h1>
      <br />
      <button className="Defeat-button">
        <Link to="/gameInfos">Revenir à mon profil ( En rampant )</Link>
      </button>

      <img className="defeat-image" src={GameOver} />
      <br />
    </div>
  );
};

export default Defeat;
