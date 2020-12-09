import React from "react";
import GamePlayed from "../../Components/GamePlayed";
import JumbotronGameInfos from '../../Components/JumbotronGameInfos'
import PlayerInfos from '../../Components/PlayerInfos'
import FriendList from '../../Components/FriendList'
import './style.scss'

const GameInfos = () => {
  return (
    <div>
      <JumbotronGameInfos/>
      <div className= 'GameInfoContainer'>
      <GamePlayed />
      <PlayerInfos/>
      <FriendList/>
      </div>
      
    </div>
  );
};

export default GameInfos;
