import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import handleError from "../../../utils/handleError";
import { removeBlogPost } from "../../blog-api";
import { notifyError, notifySuccess } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";

const BLOG_LIST_KEY = ["acceptedPosts"];

export const useRemoveBlogMutation = (setShowModal) => {
  const queryClient = useQueryClient();
  const { setButtonLoading } = useGlobal();
  return useMutation((blogId) => removeBlogPost(blogId), {
    onMutate: async (blogId) => {
      setButtonLoading("RemoveBlogPost", true);
      await queryClient.cancelQueries(BLOG_LIST_KEY);
      const previousPost = queryClient.getQueryData(BLOG_LIST_KEY);
      queryClient.setQueryData(BLOG_LIST_KEY, (prevPosts) =>
        prevPosts
          ? {
              ...prevPosts,
              pages: (prevPosts.pages || []).map((page) => ({
                ...page,
                posts: (page.posts || []).filter(
                  (post) => post._id !== blogId
                ),
              })),
            }
          : prevPosts
      );
      return { previousPost };
    },
    onSuccess: (res) => {
      notifySuccess(res.message);
    },
    onError: (err, _, context) => {
      notifyError(handleError(err));
      logError(err.message);
      queryClient.setQueryData(BLOG_LIST_KEY, context.previousPost);
    },
    onSettled() {
      setButtonLoading("RemoveBlogPost", false);
      setShowModal(false);
    },
  });
};
