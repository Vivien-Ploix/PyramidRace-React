import React from "react";
import GamePlayed from "../../Components/GamePlayed";
import JumbotronGameInfos from "../../Components/JumbotronGameInfos";
import PlayerInfos from "../../Components/PlayerInfos";
import FriendList from "../../Components/FriendList";
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
