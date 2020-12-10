import React from "react";
import "./style.scss";

const PlayerInfos = () => {
  return (
    <div class="container-profil">
      <div class="card-profil">
        <div class="card-profil__image-container">
          <img
            class="card-profil__image"
            src="https://i.pinimg.com/originals/01/f5/53/01f553f33d606119eef6ed32476842be.jpg"
            alt=""
          ></img>
        </div>

        <svg class="card-profil__svg" viewBox="0 0 800 500">
          <path
            d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
            stroke="transparent"
            fill="#e0741b"
          />
          <path
            class="card-profil__line"
            d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
            stroke="pink"
            stroke-width="3"
            fill="transparent"
          />
        </svg>

        <div class="card-profil__content">
          <h1 class="card-profil__title">Mes statistiques</h1>
          <p>
            Nombre de parties : 10<br></br>
            Nombre de victoires : 6<br></br>
            Nombre de défaites : 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfos;
