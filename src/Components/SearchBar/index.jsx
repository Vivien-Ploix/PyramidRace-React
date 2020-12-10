import React, { useState } from "react";
import "./style.scss";

const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    if (e.currentTarget.value.length >= 3) {
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
    console.log(suggestions);

    fetch(`http://api.dataatwork.org/v1/jobs/autocomplete?begins_with=${input}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          let slicedData = data.slice(0, 10);
          slicedData.forEach((result) => {
            console.log(result);
            suggestedJobs += `
        <div class="suggestion"><a href="/job/${result.uuid}">${result.suggestion}</a></div>
        `;
          });
          suggestions.innerHTML = suggestedJobs;
        } else {
          suggestions.innerHTML = "";
        }
      });
  };

  return (
    <div class="container searchbar navbar-form">
      <input
        type="text"
        placeholder="Chercher un joueur"
        onChange={handleInputChange}
      ></input>
      <div class="search"></div>
      <div className="suggestions"></div>
    </div>
  );
};

export default SearchBar;
