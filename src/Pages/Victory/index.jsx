import React from "react";
import "./style.scss";
import Win from "./assets/win.png";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const Victory = () => {
  return (
    <div className="victory-page">
      <h2 className="text-center">
        Victoire !!! Tu as vaincu ton adversaire ! Regardons le avec mépris du
        haut de la pyramide !
      </h2>
      <button className="victory-button">
        <Link to="/gameInfos">
          Revenir à mon profil ( En bombant le torse !)
        </Link>
      </button>
      <img className="image-victory" src={Win} alt="victory" />
    </div>
  );
};

export default Victory;
