import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { notifyError, notifySuccess } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { submitBlogPost } from "../../blog-api";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import i18n from "../../../i18n";
import { isAdminRole } from "../../../utils/isAdminRole";

export const useAddBlogMutation = () => {
  const { acceptedPosts, postsToDisplay } = useBlogPosts();
  const { setNotificationPopup, setButtonLoading } = useGlobal();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  return useMutation((newPost) => submitBlogPost(newPost), {
    onMutate: () => {
      setButtonLoading("addBlogBtn", true);
    },
    onSuccess: (data) => {
      if (isAdminRole(userData?.role) && data?.blogPost) {
        queryClient.setQueryData(
          ["acceptedPosts", postsToDisplay],
          [data.blogPost, ...(acceptedPosts || [])]
        );
        notifySuccess(i18n.t("pages/blogs:successSubmittedBlog"));
      } else {
        setNotificationPopup({
          message: i18n.t("pages/blogs:blogSubmittedReview"),
        });
      }
    },
    onError(err) {
      notifyError(handleError(err));
    },
    onSettled: () => {
      setButtonLoading("addBlogBtn", false);
    },
  });
};
