import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import PlayerSuggestion from "./PlayerSuggestion";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.id);
  const tokenCookie = Cookie.get("token");
  const history = useHistory();
  const [suggestions, setSuggestions] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);

  //Enables selecting the range of categories in the API and excluding the ones not containing enough questions
  const arrayQuestions = [...Array(32 - 9 + 1)].map((item, index) => 9 + index);
  const categoriesToBeRemoved = [13, 20, 25, 29, 30];
  const categoriesArray = arrayQuestions.filter(
    (item) => !categoriesToBeRemoved.includes(item)
  );

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setInput(value.replace(/\s/, ""));
  };

  useEffect(() => {
    if (input.length >= 3) {
      fetch(`https://pyramid-race-api.herokuapp.com/users?pseudo=${input}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data || []);
        })
        .catch((error) => console.log(error));
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const closeSearch = () => {
    setSuggestions([]);
  };

  const startGame = (opponentId) => {
    let difficulty;
    if (playerScore < 200) {
      difficulty = "easy";
    } else if (playerScore >= 200 && playerScore < 400) {
      difficulty = "medium";
    } else if (playerScore >= 400) {
      difficulty = "hard";
    }
    const data = {
      game: {
        player1_id: userId,
        player2_id: opponentId,
        difficulty: difficulty,
        category:
          categoriesArray[Math.floor(Math.random() * categoriesArray.length)],
      },
    };

    fetch(`https://pyramid-race-api.herokuapp.com/games`, {
      method: "post",
      headers: {
        Authorization: `${tokenCookie}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        history.push(`/games/${response.id}`);
      })
      .catch((error) => console.log(error));
  };

  const fetchPlayerScore = () => {
    fetch(`https://pyramid-race-api.herokuapp.com/users/${userId}/games`)
      .then((response) => response.json())
      .then((data) => {
        let games_won = data.filter((game) => game.winner_id === userId).length;
        let games_lost = data.filter(
          (game) => game.winner_id != userId && game.winner_id !== null
        ).length;
        let playerScore = games_won * 5 - games_lost * 3;
        setPlayerScore(playerScore);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchPlayerScore();
  }, []);

  return (
    <div className="container searchbar navbar-form">
      <input
        type="text"
        placeholder="Chercher un joueur"
        onChange={handleInputChange}
        value={input}
      />
      <div className="search" onClick={closeSearch}></div>
      <div className="suggestions">
        {suggestions.map((suggestion) => {
          if (suggestion.id != userId) {
            return (
              <PlayerSuggestion
                pseudo={suggestion.pseudo}
                onClick={() => {
                  startGame(suggestion.id);
                }}
                key={suggestion.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchBar;
