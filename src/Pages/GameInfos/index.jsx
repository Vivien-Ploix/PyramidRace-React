import React from "react";
import JumbotronGameInfos from "./JumbotronGameInfos";
import "./style.scss";
import GamePlayedList from "./GamePlayedList";

const GameInfos = () => {
  return (
    <div>
      <JumbotronGameInfos />
      <GamePlayedList />
    </div>
  );
};

export default GameInfos;
