import React from "react";
import InputField from "../../HelperComponents/InputField"; // Import your InputField component
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { BiLoaderAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const SearchBar = (props) => {
  const { isSearching } = useBlogPosts();
  const { t } = useTranslation("pages/blogs");
  return (
    <div className={`search ${props.className}`}>
      {isSearching ? (
        <div className="loader-icon">
          <BiLoaderAlt />
        </div>
      ) : null}
      <InputField
        className={`input-search`}
        label="Search by title or user name"
        id={props.id}
        name={props.id}
        type="search"
        placeholder={t("searchPlaceholder")}
        onChange={props.handleSearchChange}
        searchQuery={props.searchQuery}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
