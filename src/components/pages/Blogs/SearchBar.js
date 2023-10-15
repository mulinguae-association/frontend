import React from 'react';
import InputField from '../../HelperComponents/InputField'; // Import your InputField component

const SearchBar = ({ searchQuery, handleSearchChange }) => {
  return (
    <InputField
      // className="search smSC"
      label="Search by title or user name"
      type="text"
      placeholder="Search by title or user name"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
