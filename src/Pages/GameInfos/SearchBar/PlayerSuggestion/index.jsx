import React from "react";

const PlayerSuggestion = ({ pseudo, onClick }) => (
  <div className="suggestion">
    <p>
      {pseudo}
      <button className="play-button" onClick={onClick}>
        Jouer
      </button>
    </p>
  </div>
);

export default PlayerSuggestion;
