import React from 'react'

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <input
      className="search smSC"
      type="text"
      placeholder="Search by title or user name"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};


export default SearchBar