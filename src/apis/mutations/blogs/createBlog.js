import { useMutation, useQueryClient } from "react-query";
import handleError from "../../../utils/handleError";
import { notifyError, notifySuccess } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { submitBlogPost } from "../../blog-api";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import i18n from "../../../i18n";
import { isAdminRole } from "../../../utils/isAdminRole";

const BLOG_LIST_KEY = ["acceptedPosts"];

export const useAddBlogMutation = () => {
  const { setNotificationPopup, setButtonLoading } = useGlobal();
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  return useMutation((newPost) => submitBlogPost(newPost), {
    onMutate: () => {
      setButtonLoading("addBlogBtn", true);
    },
    onSuccess: (data) => {
      if (isAdminRole(userData?.role) && data?.blogPost) {
        queryClient.setQueryData(BLOG_LIST_KEY, (prevPosts) => {
          const firstPage = prevPosts?.pages?.[0];
          const newFirstPage = {
            posts: [data.blogPost, ...((firstPage?.posts) || [])],
            nextCursor: firstPage?.nextCursor,
          };
          return {
            ...(prevPosts || { pageParams: [] }),
            pages: [newFirstPage, ...(prevPosts?.pages?.slice(1) || [])],
          };
        });
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
