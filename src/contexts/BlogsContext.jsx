import { createContext, useContext, useState, useRef, useEffect } from "react";
import { fetchAcceptedPosts } from "../apis/blog-api";
import logError from "../utils/logError";
import { useQuery, useQueryClient } from "react-query";
import socket from "../utils/socket.js";

export const BlogPostsContext = createContext();

export const BlogPostsProvider = ({
  children,
  queryKeyName = "acceptedPosts",
  fetchFn = fetchAcceptedPosts,
}) => {
  // --- Blog List State ---
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const searchQuery = useRef("");
  const [postsToDisplay, setPostsToDisplay] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const queryClient = useQueryClient();

  // --- Blog List Query ---
  const { data, isFetching, isError } = useQuery(
    [queryKeyName, postsToDisplay],
    () => fetchFn(postsToDisplay),
    {
      keepPreviousData: true,
      cacheTime: Infinity,
      onSuccess: (data) => {
        queryClient.setQueryData([queryKeyName, postsToDisplay], data);
        isSearch
          ? setAllPostsLoaded(true)
          : setAllPostsLoaded(data?.length < postsToDisplay);
      },
      onError: (error) => {
        setAllPostsLoaded(true);
        logError(error);
      },
    },
  );

  // --- Context Value ---
  const contextValue = {
    acceptedPosts: data,
    loading: isFetching,
    allPostsLoaded,
    setAllPostsLoaded,
    errorDisplayPosts: isError,
    searchQuery,
    postsToDisplay,
    setPostsToDisplay,
    fetchAcceptedPosts: fetchFn,
    queryKeyName,
    setIsSearch,
    fetchFn,
    setIsSearching,
    isSearching,
    socket,
  };

  return (
    <BlogPostsContext.Provider value={contextValue}>
      {children}
    </BlogPostsContext.Provider>
  );
};

export const useBlogPosts = () => useContext(BlogPostsContext);
