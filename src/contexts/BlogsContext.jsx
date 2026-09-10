import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
} from "react";
import { fetchAcceptedPosts } from "../apis/blog-api";
import logError from "../utils/logError";
import { useInfiniteQuery, useQueryClient } from "react-query";

const BlogPostsContext = createContext();

export const BlogPostsProvider = ({ children }) => {
  const searchQuery = useRef("");
  const [isSearch, setIsSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const queryClient = useQueryClient();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["acceptedPosts"],
    ({ pageParam }) => fetchAcceptedPosts({ cursor: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage?.nextCursor || undefined,
      onError: (error) => {
        logError(error);
      },
    }
  );

  const acceptedPosts = data?.pages.flatMap((page) => page.posts || []) || [];

  const contextValue = useMemo(
    () => ({
      acceptedPosts,
      loading: isFetching && !isFetchingNextPage,
      hasMore: hasNextPage,
      allPostsLoaded: isSearch ? true : !hasNextPage,
      errorDisplayPosts: isError,
      fetchNextPage,
      isFetchingNextPage,
      searchQuery,
      isSearch,
      setIsSearch,
      setIsSearching,
      isSearching,
      resetList: () => {
        queryClient.setQueryData(["acceptedPosts"], {
          pages: [],
          pageParams: [],
        });
        queryClient.invalidateQueries(["acceptedPosts"]);
      },
    }),
    [
      acceptedPosts,
      isFetching,
      isFetchingNextPage,
      isError,
      hasNextPage,
      isSearch,
      isSearching,
      queryClient,
    ]
  );

  return (
    <BlogPostsContext.Provider value={contextValue}>
      {children}
    </BlogPostsContext.Provider>
  );
};

export const useBlogPosts = () => useContext(BlogPostsContext);