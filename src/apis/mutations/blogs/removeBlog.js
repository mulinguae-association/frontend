import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import handleError from "../../../utils/handleError";
import { removeBlogPost } from "../../blog-api";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { notifyError, notifySuccess } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";

export const useRemoveBlogMutation = (setShowModal) => {
  const queryClient = useQueryClient();
  const { postsToDisplay, queryKeyName } = useBlogPosts();
  const { setButtonLoading } = useGlobal();
  return useMutation((blogId) => removeBlogPost(blogId), {
    onMutate: async (blogId) => {
      setButtonLoading("RemoveBlogPost", true);
      await queryClient.cancelQueries([queryKeyName, postsToDisplay]);
      const previousPost = queryClient.getQueryData([
        queryKeyName,
        postsToDisplay,
      ]);
      queryClient.setQueryData([queryKeyName, postsToDisplay], (oldPosts) =>
        oldPosts.filter((post) => post._id !== blogId),
      );
      return { previousPost };
    },
    onSuccess: (res) => {
      notifySuccess(res.message);
    },
    onError: (err, _, context) => {
      notifyError(handleError(err));
      logError(err.message);
      queryClient.setQueryData(
        [queryKeyName, postsToDisplay],
        context.previousPost,
      );
    },
    onSettled() {
      setButtonLoading("RemoveBlogPost", false);
      setShowModal(false);
    },
  });
};
