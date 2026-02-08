import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import { fetchAcceptedPosts, searchBlogPosts } from "../../blog-api";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";

export const useSearchMutation = () => {
  const {
    setIsSearch,
    setIsSearching,
    setPostsToDisplay,
    postsToDisplay,
    queryKeyName,
    fetchFn,
  } = useBlogPosts();
  const queryClient = useQueryClient();
  return useMutation(
    async (searchQuery) => {
      setIsSearching(true); // Set isSearching to true when mutation starts
      if (searchQuery === "" || searchQuery.value === "") {
        setIsSearch(false);
        setPostsToDisplay(1);
        return fetchFn(1);
      }
      setIsSearch(true);
      const response = await searchBlogPosts(searchQuery);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([queryKeyName, postsToDisplay], data);
      },
      onError: (error) => logError("Error searching blog posts:", error),
      onSettled: () => {
        setIsSearching(false); // Set isSearching to false when mutation ends
      },
    },
  );
};
