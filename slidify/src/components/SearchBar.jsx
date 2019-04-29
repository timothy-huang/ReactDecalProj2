import React from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <input
      type="text"
      name="search-bar"
      placeholder="Search"
      className="searchBarContainer"
    />
  );
};

export default SearchBar;
