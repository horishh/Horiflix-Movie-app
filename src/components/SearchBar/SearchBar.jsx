import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./searchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <FiSearch className="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
