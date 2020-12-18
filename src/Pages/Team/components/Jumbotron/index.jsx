import React, { useState, useEffect } from "react";

const TeamJumbotron = () => {
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
                Bienvenue sur la page de l'équipe !
              </h3>

              <p className="text">
                Pendant deux semaines nous avons travaillé d'arrache pieds afin
                de vous proposer ce jeu. Nous espérons qu'il vous plaira, et que
                vous vous tiendrez au sommet de la pyramide !
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="header-shape">
        <img src="assets/images/header-shape.svg" alt="shape" />
      </div>
    </div>
  );
};

export default TeamJumbotron;
