import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Navigation.css";

const SearchBar = () => {
  return (
    <>
      <div className="search">
        <input type="type" placeholder="Search" className="search-bar" />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
