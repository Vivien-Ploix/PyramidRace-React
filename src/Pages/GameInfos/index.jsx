import React from "react";
import GamePlayed from "../../Components/GamePlayed";
import JumbotronGameInfos from "../../Components/JumbotronGameInfos";
import PlayerInfos from "../../Components/PlayerInfos";
import FriendList from "../../Components/FriendList";
import "./style.scss";
import GamePlayedList from "../../Components/GamePlayedList";

const GameInfos = () => {
  return (
<<<<<<< HEAD
    <div>
      <JumbotronGameInfos />
      <div className="GameInfoContainer">
        <GamePlayedList />
        <PlayerInfos />
        <FriendList />
=======
    <div className ='GameInfo-div'>
      <JumbotronGameInfos/>
      <div className= 'GameInfoContainer'>
      <GamePlayed />
      <PlayerInfos/>
      <FriendList/>
>>>>>>> develop
      </div>
    </div>
  );
};

export default GameInfos;
