import { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";
import BlogsHeader from "./BlogsHeader";
import BlogList from "./BlogList";
import ScrollDownArrow from "../../HelperComponents/ScrollDownArrow";
import "./Blogs.scss";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { useSearchMutation } from "../../../apis/mutations/blogs/searchBlog";

const Blogs = () => {
  const {
    acceptedPosts,
    loading,
    allPostsLoaded,
    errorDisplayPosts,
    searchQuery,
    setPostsToDisplay,
  } = useBlogPosts(); // Use the context hook
  // Add these debug logs
  console.log("BlogsPage Debug:", {
    hasAcceptedPosts: Boolean(acceptedPosts),
    postsLength: acceptedPosts?.length,
    isLoading: loading,
    hasError: errorDisplayPosts,
    allLoaded: allPostsLoaded,
  });
  const [previousQuery, setPreviousQuery] = useState("");
  const searchMutation = useSearchMutation(searchQuery);
  const counterRef = useRef(0);

  const debouncedSearch = debounce((query) => {
    if (query !== previousQuery) {
      searchMutation.mutate(query);
      setPreviousQuery(query);
    }
  }, 500);

  const handleSearchChange = (event) => {
    const query = event.target.value.trim();
    searchQuery.current = query;
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      debouncedSearch(searchQuery.current);
    }
  };

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setPostsToDisplay((prevPostsToDisplay) =>
        counterRef.current <= 2
          ? prevPostsToDisplay + 3
          : prevPostsToDisplay + 4,
      );
    }, 500);
  }, [setPostsToDisplay]);

  useEffect(() => {
    const timeout = loadMore();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleScrollToFooter = debounce((entries) => {
      const footerEntry = entries[0];
      if (
        footerEntry.isIntersecting &&
        !allPostsLoaded &&
        acceptedPosts?.length > 0
      ) {
        counterRef.current += 1;
        setPostsToDisplay((prevPostsToDisplay) =>
          counterRef.current <= 2
            ? prevPostsToDisplay + 3
            : prevPostsToDisplay + 4,
        );
      }
    }, 200);
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(handleScrollToFooter, options);
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [allPostsLoaded, acceptedPosts, setPostsToDisplay]);
  return (
    <main className="Blogs">
      <div className="container">
        <BlogsHeader
          searchQuery={searchQuery}
          handleSearchKeyPress={handleSearchKeyPress}
          handleSearchChange={handleSearchChange}
        />

        <BlogList acceptedPosts={acceptedPosts} loadMore={loadMore} />

        {errorDisplayPosts ? (
          <p className="finished-message">
            {"An error occurred while fetching blog posts."}
          </p>
        ) : acceptedPosts && acceptedPosts?.length <= 0 ? (
          <p className="finished-message">No results found!</p>
        ) : allPostsLoaded ? (
          <p className="finished-message">All blog posts have been loaded.</p>
        ) : loading ? ( // Check for both loading and isSearching
          <p className="finished-message">Loading....</p>
        ) : (
          <ScrollDownArrow />
        )}
      </div>
    </main>
  );
};

export default Blogs;
