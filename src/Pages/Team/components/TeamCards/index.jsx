import React, { useState, useEffect } from "react";
import "./style.scss";

const TeamCards = () => {
  return (
    <div class="team-boxed">
      <div class="container-team">
        <h2 class="text-center">L'équipe</h2>
      </div>
      <div class="row people">
        <div class="box col-lg-2 item">
          <img
            class="rounded-circle"
            src="https://sites.google.com/site/tzolkin16/_/rsrc/1463172104990/home/dia-de-los-suenos---28-de-agosto/sol_inca.png"
          />
          <h3 class="name">Anthony KRIEF</h3>
          <p class="title">Actuellement rang Paysan 😖</p>
          <p class="description">
            C'est a lui que l'on doit l'aspect général du site, s'il ne vous
            plait pas balancez le du haut de la pyramide pour lui remettre les
            idées en place !
          </p>
        </div>

        <div class="box col-lg-2 item">
          <img
            class="rounded-circle"
            src="https://i.pinimg.com/originals/1b/c3/fb/1bc3fbb917115be38324c9d6631e0577.jpg"
          />
          <h3 class="name">Vivien Ploix</h3>
          <p class="title">Le déterminé 😁 </p>
          <p class="description">
            Maitre du fetch, il s'est arraché les cheveux pour que vous puissiez
            avoir un jeu fonctionnel ! Il est temps de lui faire une offrande, à
            vous !
          </p>
        </div>
        <div class="box col-lg-2 item">
          <img
            class="rounded-circle"
            src="https://pbs.twimg.com/media/Df0GpkuX4AAKDYi.jpg"
          />
          <h3 class="name">Olivier FITOUSSI</h3>
          <p class="title">Le fantome de la pyramide 👻</p>
          <p class="description">
            Peut-être que vous le croiserez dans les entrailles de la pyramide !
            Ouvrez l'oeil !
          </p>
        </div>
        <div class="box col-lg-2 item">
          <img
            class="rounded-circle"
            src="https://i.pinimg.com/originals/90/1e/6c/901e6c0b315861b38cfaf18371a99f3f.jpg"
          />
          <h3 class="name">Cindy</h3>
          <p class="title">La dessinatrice ✍</p>
          <p class="description">
            Un grand merci à elle qui nous à fait les visuels de jeu (perso,
            pyramide, écran de victoire et de défaite). Oui, c'est à cause
            d'elle que votre perso se fait bouffer 😄
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
