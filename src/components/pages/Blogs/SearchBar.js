import React from 'react';
import InputField from '../../HelperComponents/InputField'; // Import your InputField component

const SearchBar = (props) => {
  return (
    <InputField
      className={`search ${props.className}`}
      label="Search by title or user name"
      id={props.id}
      name={props.id}
      type="search"
      placeholder="Search by title or user name & click Enter"
      onChange={props.handleSearchChange}
      ref={props.searchQuery}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default SearchBar;
