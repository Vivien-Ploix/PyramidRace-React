import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
//@ts-ignore

const ProgressBar = ({ playerScore }) => {
  const [width, setWidth] = useState(0);
  const [level, setLevel] = useState("");
  useEffect(() => {
    if (playerScore < 0) {
      setLevel("Cafard de la pyramide");
      setWidth(playerScore + 100);
    } else if (playerScore >= 0 && playerScore < 100) {
      setLevel("Paysan");
      setWidth(playerScore);
    } else if (playerScore >= 100 && playerScore < 200) {
      setLevel("Guerrier");
      setWidth(playerScore - 100);
    } else if (playerScore >= 200 && playerScore < 300) {
      setLevel("Grand pretre");
      setWidth(playerScore - 200);
    } else if (playerScore >= 300 && playerScore < 400) {
      setLevel("Noble");
      setWidth(playerScore - 300);
    } else if (playerScore >= 400) {
      setLevel("Roi");
      setWidth(playerScore - 400);
    }
  }, [playerScore]);

  return (
    <div className="container-progress">
      <div className="progress">
        <div
          className="progress-bar progress-bar-danger progress-bar-striped active"
          style={{ width: `${width}%` }}
        ></div>
      </div>
      <h5 className="mb-3">Rang : {level}</h5>
    </div>
  );
};

export default ProgressBar;
