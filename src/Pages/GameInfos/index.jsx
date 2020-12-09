import React from "react";
import GamePlayed from "../../Components/GamePlayed";
import JumbotronGameInfos from '../../Components/JumbotronGameInfos'


const GameInfos = () => {
  return (
    <div>
      <JumbotronGameInfos/>
      <GamePlayed />
      
    </div>
  );
};

export default GameInfos;
