import React from "react";
import './style.scss'

const GamePlayed = () => {
  return (


<div class="container h-100">
  <div class="row align-middle">
    <div class="col-md-6 col-lg-4 column">
      <div class="card gr-1">
        <div class="txt">
          <h1>Défaite</h1>
          <p>Vous avez atteint l'étage 3 de la pyramide</p>
          <small>Adversaire : Jean</small>
        </div>
        <a href="#">Rejouer</a>
        <div class="ico-card">
        <i class="lni lni-pyramids"></i>
      </div>
      </div>
    </div>
   
    
  </div>
</div>

  );
};

export default GamePlayed;
