import { createContext, useContext, useState, useRef, useEffect } from "react";
import { fetchAcceptedPosts } from "../apis/blog-api";
import logError from "../utils/logError";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "./AuthContext.jsx";
import socket from "../utils/socket.js";
import useNotificationSound from "../hooks/userNotificationSound.js";

export const BlogPostsContext = createContext();

export const BlogPostsProvider = ({
  children,
  queryKeyName = "acceptedPosts",
  fetchFn = fetchAcceptedPosts,
}) => {
  const { userData, isAuth } = useAuth();
  const notificationSound = useNotificationSound();

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

  // --- Real-time Notification Handler ---
  useEffect(() => {
    if (!isAuth || !userData) return;
    const handler = (notification) => {
      const id = notification._id;
      notificationSound.play(id);
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) {
          return {
            pages: [{ notifications: [notification], unread: 1 }],
            pageParams: [],
          };
        }
        const exists = oldData.pages.some((page) =>
          page.notifications.some((n) => n._id === id),
        );
        if (exists) return oldData;
        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              notifications: [notification, ...oldData.pages[0].notifications],
              unread: (oldData.pages[0].unread || 0) + 1,
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [queryKeyName] });
      }, 1000);
    };
    socket.on("newBlogPost", handler);
    return () => socket.off("newBlogPost", handler);
  }, [queryClient, isAuth, userData, notificationSound]);

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
