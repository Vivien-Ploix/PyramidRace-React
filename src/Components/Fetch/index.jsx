import React from "react";
import Cookie from "js-cookie";

const tokenCookie = Cookie.get("token");

export const fetchOpponent = (playerId, setOpponent) => {
  fetch(`https://pyramid-race-api.herokuapp.com/users/${playerId}`)
    .then((response) => response.json())
    .then((data) => setOpponent(data))
    .catch((error) => console.log(error));
};

export const updateScorePlayer = (playerId, initialScore, victoryStatus) => {
  let updatedScore;
  if (victoryStatus === true) {
    updatedScore = initialScore + 5;
  } else if (victoryStatus === false) {
    updatedScore = initialScore - 3;
  }
  const data = {
    user: {
      score: updatedScore,
    },
  };
  fetch(`https://pyramid-race-api.herokuapp.com/users/${playerId}`, {
    method: "put",
    headers: {
      Authorization: `${tokenCookie}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => console.log(error));
};
