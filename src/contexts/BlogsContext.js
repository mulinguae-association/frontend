import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAcceptedPosts } from '../utils/blog-api';

const BlogPostsContext = createContext();


export const BlogPostsProvider = ({ children }) => {
  const [acceptedPosts, setAcceptedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [errorDisplayPosts, setErrorDisplayPosts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [postsToDisplay, setPostsToDisplay] = useState(1);

  const fetchAcceptedData = async (postsToDisplay) => {
    try {
      setLoading(true);
      const data = await fetchAcceptedPosts(postsToDisplay);
      if (data) {
        setAcceptedPosts(data);
        setErrorDisplayPosts(searchQuery && data.length === 0);
        setAllPostsLoaded(data.length < postsToDisplay);

      } else {
        setErrorDisplayPosts(true);
      }
    } catch (error) {
      setErrorDisplayPosts(true);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const contextValue = {
    acceptedPosts,
    loading,
    allPostsLoaded,
    errorDisplayPosts,
    searchQuery,
    setSearchQuery,
    postsToDisplay,
    setPostsToDisplay,
    setLoading,
    setAcceptedPosts,
    fetchAcceptedData
  }

  // console.log(acceptedPosts)
  useEffect(() => {
    fetchAcceptedData(postsToDisplay);
  }, [postsToDisplay]);


  return (
    <BlogPostsContext.Provider value={{ contextValue }}>
      {children}
    </BlogPostsContext.Provider>
  );
};
export const useBlogPosts = () => useContext(BlogPostsContext).contextValue;
