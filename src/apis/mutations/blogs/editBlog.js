import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { notifyError, notifySuccess } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { submitBlogPost } from "../../blog-api";
import { useAuth } from "../../../contexts/AuthContext.jsx";

export const useEditBlogMutation = () => {
  const { postsToDisplay, queryKeyName } = useBlogPosts();
  const { setNotificationPopup, setButtonLoading } = useGlobal();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  return useMutation((editPost) => submitBlogPost(editPost), {
    onMutate: () => {
      setButtonLoading("editBlogBtn", true);
    },
    onSuccess: (data) => {
      if (["admin", "superadmin"].includes(userData.role)) {
        queryClient.setQueryData(
          [queryKeyName, postsToDisplay],
          (oldPosts = []) => {
            // Replace the updated post in the cache
            return [
              data.blogPost,
              ...oldPosts.filter((post) => post._id !== data.blogPost._id),
            ];
          },
        );
        notifySuccess("Successfully updated blog post");
      } else {
        setNotificationPopup({
          message: "Your Blog update has been submitted for review.",
        });
      }
    },
    onError(err) {
      notifyError(handleError(err));
    },
    onSettled: () => {
      setButtonLoading("editBlogBtn", false);
    },
  });
};
