import React from "react";
import JumbotronGameInfos from "../../Components/JumbotronGameInfos";
import "./style.scss";
import GamePlayedList from "../../Components/GamePlayedList";

const GameInfos = () => {
  return (
    <div>
      <JumbotronGameInfos />
      <GamePlayedList />
    </div>
  );
};

export default GameInfos;
