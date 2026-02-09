import React from "react";
import BlogsHeader from "./BlogsHeader";
import BlogList from "./BlogList";
import ScrollDownArrow from "../../HelperComponents/ScrollDownArrow";

const BlogListSection = ({
  posts = [],
  loading = false,
  error = false,
  allLoaded = false,
  searchQuery,
  onSearchChange,
  onSearchKeyPress,
  headerProps = {},
  errorMessage = "An error occurred while fetching blog posts.",
  emptyMessage = "No results found!",
  allLoadedMessage = "All blog posts have been loaded.",
  loadingMessage = "Loading....",
  showScrollArrow = true,
}) => {
  return (
    <>
      {/* <BlogsHeader
        searchQuery={searchQuery}
        handleSearchChange={onSearchChange}
        handleSearchKeyPress={onSearchKeyPress}
        {...headerProps}
      /> */}
      <BlogList acceptedPosts={posts} />
      {error ? (
        <p className="finished-message">{errorMessage}</p>
      ) : posts && posts.length <= 0 ? (
        <p className="finished-message">{emptyMessage}</p>
      ) : allLoaded ? (
        <p className="finished-message">{allLoadedMessage}</p>
      ) : loading ? (
        <p className="finished-message">{loadingMessage}</p>
      ) : (
        showScrollArrow && <ScrollDownArrow />
      )}
    </>
  );
};

export default BlogListSection;
