import { useEffect, useRef, useState } from "react";
import { searchBlogPosts } from "../../../utils/blog-api";
import debounce from "lodash/debounce";
import BlogsHeader from "./BlogsHeader";
import BlogList from "./BlogList";
import ScrollDownArrow from "../../HelperComponents/ScrollDownArrow";
import "./Blogs.scss";
import Footer from "../../FooterPages";
import { useBlogPosts } from "../../../contexts/BlogsContext";
import logError from "../../../utils/logError";

const Blogs = () => {
  const {
    acceptedPosts,
    loading,
    setLoading,
    setAcceptedPosts,
    allPostsLoaded,
    setAllPostsLoaded,
    errorDisplayPosts,
    searchQuery,
    setPostsToDisplay,
    fetchAcceptedData
  } = useBlogPosts(); // Use the context hook
  const [fetchedFirstBlog, setFetchedFirstBlog] = useState(false);
  const [previousQuery, setPreviousQuery] = useState('');

  const footerRef = useRef();
  const debouncedSearch = async (query) => {
    try {
      // Check if the current search query is the same as the previous one
      if (query === previousQuery) {
        return;
      } else if (query?.value === "" || query === "") {
        if (!fetchedFirstBlog) {
          fetchAcceptedData(1);
          setFetchedFirstBlog(true)
          setPreviousQuery(query);
          return;
        }
        return;
      }
      searchBlogPosts(query).then((response) => {
        if (response.status === 200) {
          setAcceptedPosts(response.data);
          setAllPostsLoaded(true)
          setPreviousQuery(query);
          setFetchedFirstBlog(false);
        } else {
          logError("Error searching blog posts");
        }
      });

    } catch (error) {
      logError("Error searching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.trim();
    searchQuery.current = query;
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      debouncedSearch(searchQuery.current);
    }
  };

  useEffect(() => {
    const handleScrollToFooter = debounce((entries) => {
      const footerEntry = entries[0];
      if (footerEntry.isIntersecting && !allPostsLoaded) {
        // Reached the footer, fetch and display 2 more posts
        setPostsToDisplay((prevPostsToDisplay) => prevPostsToDisplay + 2);
      }
    }, 200);

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4 // specify position of the element
    };

    const observer = new IntersectionObserver(handleScrollToFooter, options);

    // Attach the observer to the footer element
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      // Disconnect the observer when the component unmounts
      observer.disconnect();
    };
  }, [allPostsLoaded]);

  return (
    <main className="Blogs">
      <div className="container">
        <BlogsHeader
          searchQuery={searchQuery}
          handleSearchKeyPress={handleSearchKeyPress}
          handleSearchChange={handleSearchChange}
        />
        <BlogList
          acceptedPosts={acceptedPosts}
          setAcceptedPosts={(newPosts) => setAcceptedPosts(newPosts)}
        />
        {errorDisplayPosts ? (
          <p className="finished-message">
            {"An error occurred while fetching blog posts."}
          </p>
        ) : acceptedPosts?.length <= 0 ? (
          <p className="finished-message">No results found!</p>
        ) : allPostsLoaded && acceptedPosts?.length > 0 ? (
          <p className="finished-message">All blog posts have been loaded.</p>
        ) : loading ? (
          <p className="finished-message">Loading....</p>
        ) : (
          <ScrollDownArrow />
        )}
      </div>
      <Footer footerRef={footerRef} />
    </main>
  );
};

export default Blogs;