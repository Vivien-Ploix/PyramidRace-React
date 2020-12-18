import React, { useState, useEffect } from "react";
import "./style.scss";

const TeamCards = () => {
  return (
    <div className="team-boxed">
      <div className="container-team">
        <h2 className="text-center">L'équipe</h2>
      </div>
      <div className="row people">
        <div className="box col-lg-2 item">
          <img
            className="rounded-circle"
            src="https://sites.google.com/site/tzolkin16/_/rsrc/1463172104990/home/dia-de-los-suenos---28-de-agosto/sol_inca.png"
          />
          <h3 className="name">Anthony KRIEF</h3>
          <p className="title">Actuellement rang Paysan 😖</p>
          <p className="description">
            C'est à lui que l'on doit l'aspect général du site. S'il ne vous
            plait pas, balancez-le du haut de la pyramide pour lui remettre les
            idées en place !
          </p>
        </div>

        <div className="box col-lg-2 item">
          <img
            className="rounded-circle"
            src="https://i.pinimg.com/originals/1b/c3/fb/1bc3fbb917115be38324c9d6631e0577.jpg"
          />
          <h3 className="name">Vivien Ploix</h3>
          <p className="title">Le déterminé 😁 </p>
          <p className="description">
            Maître du 'fetch', il s'est arraché les cheveux pour que vous
            puissiez avoir un jeu fonctionnel ! Il est temps de lui faire une
            offrande... À vous !
          </p>
        </div>
        <div className="box col-lg-2 item">
          <img
            className="rounded-circle"
            src="https://pbs.twimg.com/media/Df0GpkuX4AAKDYi.jpg"
          />
          <h3 className="name">Olivier FITOUSSI</h3>
          <p className="title">Le fantôme de la pyramide 👻</p>
          <p className="description">
            Peut-être que vous le croiserez dans les entrailles de la pyramide !
            Ouvrez l'oeil !
          </p>
        </div>
        <div className="box col-lg-2 item">
          <img
            className="rounded-circle"
            src="https://i.pinimg.com/originals/90/1e/6c/901e6c0b315861b38cfaf18371a99f3f.jpg"
          />
          <h3 className="name">Cindy</h3>
          <p className="title">La dessinatrice ✍</p>
          <p className="description">
            Un grand merci à elle, qui nous à fait les visuels de jeu (persos,
            pyramide, écrans de victoire et de défaite). Oui, c'est à cause
            d'elle que votre perso se fait bouffer 😄
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
