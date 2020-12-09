import React from "react";
import SearchBar from "../SearchBar";

const JumbotronGameInfos = () => {
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
              <h3 className="header-title">Bonjour Anthony</h3>
              <br></br>
              <h4>Bienvenue sur ta page d'information</h4>
              <p className="text">
                C'est ici que tu peux consulter tes statistiques (ne déprime pas
                en voyant ton niveau), ajouter des amis et lancer une nouvelle
                partie !<br></br>
                Que la Pyramid Race Commence !
              </p>
              <ul className="header-btn">
                <li>
                  <SearchBar />
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

export default JumbotronGameInfos;
