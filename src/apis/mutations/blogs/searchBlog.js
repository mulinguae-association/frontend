import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import { searchBlogPosts } from "../../blog-api";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";

const BLOG_LIST_KEY = ["acceptedPosts"];

export const useSearchMutation = () => {
  const { setIsSearch, setIsSearching, resetList } = useBlogPosts();
  const queryClient = useQueryClient();
  return useMutation(
    async (searchQuery) => {
      setIsSearching(true); // Set isSearching to true when mutation starts
      if (searchQuery === "" || searchQuery.value === "") {
        setIsSearch(false);
        resetList();
        return;
      }
      setIsSearch(true);
      const response = await searchBlogPosts(searchQuery);
      queryClient.setQueryData(BLOG_LIST_KEY, {
        pages: [{ posts: response.data || [], nextCursor: undefined }],
        pageParams: [undefined],
      });
    },
    {
      onError: (error) => logError("Error searching blog posts:", error),
      onSettled: () => {
        setIsSearching(false); // Set isSearching to false when mutation ends
      },
    }
  );
};