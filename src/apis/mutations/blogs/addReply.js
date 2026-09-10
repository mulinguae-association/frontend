import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import handleError from "../../../utils/handleError";
import { handleReplySubmit } from "../../blog-api";
import { notifyError } from "../../../components/Notify";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useCache } from "../../../contexts/BlogsCache";
import i18n from "../../../i18n";
import { isAdminRole } from "../../../utils/isAdminRole";

const NORMAL_KEY = "remaining-replies";
const PREVIEW_KEY = "remaining-replies-preview";

const setReplyData = (queryClient, parentCommentId, updater) => {
  [NORMAL_KEY, PREVIEW_KEY].forEach((base) => {
    queryClient.setQueryData([base, parentCommentId], updater);
  });
};

export const useAddReplyMutation = (setReplyContent) => {
  const { userData } = useAuth();
  const { setButtonLoading, setNotificationPopup } = useGlobal();
  const { clearCache } = useCache();
  const queryClient = useQueryClient();
  const isAdmin = isAdminRole(userData?.role);
  const newReply = {
    _id: crypto.randomUUID().toString(),
    likes: [],
    loves: [],
    unlikes: [],
    postedBy: userData,
    replies: [],
    status: isAdmin ? "accepted" : "pending",
  };

  return useMutation(
    async ({ parentCommentId, blogId, replyConetnt }) =>
      await handleReplySubmit(replyConetnt, blogId, parentCommentId),
    {
      onMutate: async ({ parentCommentId, blogId, replyConetnt }) => {
        await queryClient.cancelQueries(["remaining-replies", parentCommentId]);
        await queryClient.cancelQueries([
          "remaining-replies-preview",
          parentCommentId,
        ]);
        const previousPosts = queryClient.getQueryData([
          "remaining-replies",
          parentCommentId,
        ]);
        const buttonKey = `replyCommentBtn_${parentCommentId}`;
        setButtonLoading(buttonKey, true);
        // Handle admin case
        if (isAdmin) {
          queryClient.setQueriesData(["comments", blogId], (prevComments) => ({
            ...prevComments,
            pages: prevComments.pages.map((page) => ({
              ...page,
              totalComments: page.totalComments + 1,
            })),
          }));

          if (parentCommentId !== null) {
            setReplyData(queryClient, parentCommentId, (prevComments) => ({
              ...prevComments,
              pages: prevComments.pages.map((page) => ({
                ...page,
                remainingReplies: [
                  ...page.remainingReplies,
                  {
                    ...newReply,
                    blogId,
                    content: replyConetnt,
                    parentComment: parentCommentId,
                  },
                ],
                lastAcceptedReply: {
                  ...newReply,
                  blogId,
                  content: replyConetnt,
                  parentComment: parentCommentId,
                },
              })),
            }));
          }
        }
        clearCache();
        return { previousPosts, tempReplyId: newReply._id };
      },
      onSuccess: (res, { parentCommentId }, context) => {
        const { tempReplyId } = context;
        const newReplyRes = res.data?.comment;

        if (isAdmin) {
          setReplyData(queryClient, parentCommentId, (prevComments) => ({
            ...prevComments,
            pages: prevComments.pages.map((page) => ({
              ...page,
              remainingReplies: page.remainingReplies.map((reply) =>
                reply._id === tempReplyId ? newReplyRes : reply,
              ),
              lastAcceptedReply:
                page.lastAcceptedReply?._id === tempReplyId
                  ? newReplyRes
                  : page.lastAcceptedReply,
            })),
          }));
        } else {
          setNotificationPopup({
            message: i18n.t("pages/blogs:replySubmittedReview"),
          });
        }
      },
      onError: (error) => {
        logError("Error adding reply comment:", error);
        notifyError(handleError(error));
      },
      onSettled: (res, err, { parentCommentId }) => {
        const buttonKey = `replyCommentBtn_${parentCommentId}`;
        setReplyContent("");
        setButtonLoading(buttonKey, false);
      },
    },
  );
};
