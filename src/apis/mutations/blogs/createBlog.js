import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { notifyError, notifySuccess } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { submitBlogPost } from "../../blog-api";
import { useAuth } from "../../../contexts/AuthContext.jsx";

export const useAddBlogMutation = () => {
  const { acceptedPosts, postsToDisplay, queryKeyName } = useBlogPosts();
  const { setNotificationPopup, setButtonLoading } = useGlobal();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  return useMutation((newPost) => submitBlogPost(newPost), {
    onMutate: () => {
      setButtonLoading("addBlogBtn", true);
    },
    onSuccess: (data) => {
      if (userData.role === "admin") {
        queryClient.setQueryData(
          [queryKeyName, postsToDisplay],
          [data.blogPost, ...acceptedPosts],
        );
        notifySuccess("Successfully submitted blog post");
      } else {
        setNotificationPopup({
          message: "Your Blog has been submitted for review.",
        });
      }
    },
    onError(err) {
      console.log(err);
      notifyError(handleError(err));
    },
    onSettled: () => {
      setButtonLoading("addBlogBtn", false);
    },
  });
};
