import { useEffect, useState } from "react";
import { fetchAcceptedPosts, searchBlogPosts } from "../../../utils/blog-api";
import debounce from "lodash/debounce";
import BlogsHeader from "./BlogsHeader";
import BlogList from "./BlogList";
import ScrollDownArrow from "../../HelperComponents/ScrollDownArrow";
import "./Blogs.scss";
import { useRef } from "react";
import Footer from "../../FooterPages";

const Blogs = () => {
  const [state, setState] = useState({
    acceptedPosts: [],
    loading: true,
    allPostsLoaded: false,
    searchQuery: "",
    postsToDisplay: 1,
    errorDisplayPosts: false,
  });

  const footerRef = useRef();
  const debouncedSearch = debounce(async (query) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      searchBlogPosts(query).then((response) => {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            acceptedPosts: response.data,
          }));
        } else {
          console.error("Error searching blog posts");
        }
      });
    } catch (error) {
      console.error("Error searching blog posts:", error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, 200);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setState((prevState) => ({ ...prevState, searchQuery: query }));
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      // When Enter key is pressed, trigger the search
      debouncedSearch(state.searchQuery);
    }
  };

  useEffect(() => {
    const handleScrollToFooter = (entries) => {
      const footerEntry = entries[0];
      if (footerEntry.isIntersecting && !state.allPostsLoaded) {
        // Reached the footer, fetch and display 2 more posts
        setState((prevState) => ({
          ...prevState,
          postsToDisplay: prevState.postsToDisplay + 2,
        }));
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4, //specify position of the element
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
  }, [state.allPostsLoaded]);

  const fetchAcceptedData = async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const data = await fetchAcceptedPosts(state.postsToDisplay);
      console.log(data);
      setState((prevState) => ({
        ...prevState,
        acceptedPosts: data,
        errorDisplayPosts: state.searchQuery && data.length === 0,
        allPostsLoaded: data.length < state.postsToDisplay,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorDisplayPosts: true,
      }));
      console.log(error.message);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    fetchAcceptedData();
  }, [state.postsToDisplay]);

  return (
    <main className="Blogs">
      <div className="container">
        <BlogsHeader
          searchQuery={state.searchQuery}
          handleSearchKeyPress={handleSearchKeyPress}
          handleSearchChange={handleSearchChange}
        />
        <BlogList
          acceptedPosts={state.acceptedPosts}
          setAcceptedPosts={(newPosts) =>
            setState((prevState) => ({ ...prevState, acceptedPosts: newPosts }))
          }
        />
        {state.errorDisplayPosts ? (
          <p className="error-message">
            {"An error occurred while fetching blog posts."}
          </p>
        ) : state.acceptedPosts.length <= 0 ? (
          <p className="finished-message">No results found!</p>
        ) : state.allPostsLoaded && state.acceptedPosts.length > 0 ? (
          <p className="finished-message">All blog posts have been loaded.</p>
        ) : state.loading ? (
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
