import { useEffect, useRef, useState } from "react";
import debounce from "lodash/debounce";

export function useBlogSearchAndScroll({
  acceptedPosts,
  allPostsLoaded,
  setPostsToDisplay,
  searchMutation,
  searchQueryRef,
}) {
  const [previousQuery, setPreviousQuery] = useState("");
  const counterRef = useRef(0);

  // Debounced search handler
  const debouncedSearch = debounce((query) => {
    if (query !== previousQuery) {
      searchMutation.mutate(query);
      setPreviousQuery(query);
    }
  }, 500);

  // Search input change handler
  const handleSearchChange = (event) => {
    const query = event.target.value.trim();
    searchQueryRef.current = query;
  };

  // Search key press handler
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      debouncedSearch(searchQueryRef.current);
    }
  };

  // Infinite scroll handler
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

  return {
    handleSearchChange,
    handleSearchKeyPress,
  };
}
