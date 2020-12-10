import React, { useState } from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.id);

  const handleInputChange = (e) => {
    if (e.currentTarget.value.length >= 2) {
      setInput(e.currentTarget.value);
      autoCompleteSearch(input);
    } else {
      setInput("");
      let suggestions = document.querySelector(".suggestions");
      suggestions.innerHTML = "";
    }
  };

  const autoCompleteSearch = (input) => {
    let suggestions = document.querySelector(".suggestions");
    let suggestedJobs = "";

    fetch(`https://pyramid-race-api.herokuapp.com/users?pseudo=${input}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          let slicedData = data.slice(0, 10);
          slicedData.forEach((result) => {
            if (result.id != userId) {
              console.log(result.id);
              suggestedJobs += `
              <div class="suggestion"><p>${result.pseudo} <button class="play-button">Jouer</button></p></div>
            `;
            }
          });
          suggestions.innerHTML = suggestedJobs;
        } else {
          suggestions.innerHTML = "";
        }
      });
  };

  const closeSearch = () => {
    let suggestions = document.querySelector(".suggestions");
    suggestions.innerHTML = "";
  };

  return (
    <div class="container searchbar navbar-form">
      <input
        type="text"
        placeholder="Chercher un joueur"
        onChange={handleInputChange}
      ></input>
      <div class="search" onClick={closeSearch}></div>
      <div className="suggestions"></div>
    </div>
  );
};

export default SearchBar;
