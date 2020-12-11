import React, { useState, useEffect } from "react";
import "./style.scss";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import PlayerSuggestion from "./../PlayerSuggestion";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.id);
  const tokenCookie = Cookie.get("token");
  const history = useHistory();
  const [suggestions, setSuggestions] = useState([]);

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
        });
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const closeSearch = () => {
    setSuggestions([]);
  };

  const startGame = (opponentId) => {
    const data = {
      game: {
        player1_id: userId,
        player2_id: opponentId,
        difficulty: "medium",
        category: Math.floor(Math.random() * (33 - 9) + 9),
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
        history.push(`/game/${response.id}`);
      });
  };

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
        {suggestions.map((suggestion) => (
          <PlayerSuggestion
            pseudo={suggestion.pseudo}
            onClick={() => {
              startGame(suggestion.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
