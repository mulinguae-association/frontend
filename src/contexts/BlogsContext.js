import React, { createContext, useContext, useState, useRef } from 'react';
import { fetchAcceptedPosts } from '../apis/blog-api';
import logError from '../utils/logError';
import { useQuery, useQueryClient } from 'react-query';

const BlogPostsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const searchQuery = useRef("");
  const [postsToDisplay, setPostsToDisplay] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const queryClient = useQueryClient();
  const { data, isFetching, isError } =
    useQuery(['acceptedPosts', postsToDisplay], () => fetchAcceptedPosts(postsToDisplay), {
      keepPreviousData: true,
      cacheTime: Infinity,
      onSuccess: (data) => {
        queryClient.setQueryData(['acceptedPosts', postsToDisplay], data);
        isSearch ?
          setAllPostsLoaded(true)
          :
          setAllPostsLoaded(data?.length < postsToDisplay)
      },
      onError: (error) => {
        setAllPostsLoaded(true);
        logError(error);
      }
    });

  const contextValue = {
    acceptedPosts: data,
    loading: isFetching,
    allPostsLoaded,
    setAllPostsLoaded,
    errorDisplayPosts: isError,
    searchQuery,
    postsToDisplay,
    setPostsToDisplay,
    fetchAcceptedPosts,
    setIsSearch,
    setIsSearching,
    isSearching
  }

  return (
    <BlogPostsContext.Provider value={{ contextValue }}>
      {children}
    </BlogPostsContext.Provider>
  );
};
export const useBlogPosts = () => useContext(BlogPostsContext).contextValue;
