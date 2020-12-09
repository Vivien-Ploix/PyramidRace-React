import React from "react";
import "./style.scss"

const SearchBar = () => {
  return (
    <div class="container searchbar">
    <input type="text" placeholder="Chercher un joueur"></input>
    <div class="search"></div>
  </div>
  );
};

export default SearchBar;



