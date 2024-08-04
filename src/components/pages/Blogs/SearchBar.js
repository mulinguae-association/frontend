import React from 'react';
import InputField from '../../HelperComponents/InputField'; // Import your InputField component
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { BiLoaderAlt } from 'react-icons/bi';

const SearchBar = (props) => {
  const { isSearching } = useBlogPosts();
  return (
    <div className={`search ${props.className}`}>
      {isSearching ?
        <div
          className='loader-icon'>
          <BiLoaderAlt />
        </div>
        : null
      }
      <InputField
        className={`input-search`}
        label="Search by title or user name"
        id={props.id}
        name={props.id}
        type="search"
        placeholder="Search by title or user name & click Enter"
        onChange={props.handleSearchChange}
        searchQuery={props.searchQuery}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
