import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { handleReplySubmit } from '../../blog-api';
import { notifyError } from '../../../components/Notify';
import { useGlobal } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useCache } from '../../../contexts/BlogsCache';

export const useAddReplyMutation = (setReplyContent) => {
  const { userData } = useAuth();
  const { setButtonLoading, setNotificationPopup } = useGlobal();
  const { clearCache } = useCache();
  const queryClient = useQueryClient();
  const isAdmin = userData?.role === "admin";
  const newReply = {
    _id: crypto.randomUUID().toString(),
    likes: [],
    loves: [],
    unlikes: [],
    postedBy: userData,
    replies: [],
    status: isAdmin ? "accepted" : "pending"
  };

  return useMutation(
    async ({ parentCommentId, blogId, replyConetnt }) =>
      await handleReplySubmit(replyConetnt, blogId, parentCommentId),
    {
      onMutate: async ({ parentCommentId, blogId, replyConetnt }) => {
        await queryClient.cancelQueries(["remaining-replies", parentCommentId]);
        const previousPosts = queryClient.getQueryData(["remaining-replies", parentCommentId]);
        const buttonKey = `replyCommentBtn_${parentCommentId}`;
        setButtonLoading(buttonKey, true);
        // Handle admin case
        if (isAdmin) {
          queryClient.setQueriesData(["comments", blogId], (prevComments) => ({
            ...prevComments,
            pages: prevComments.pages.map((page) => ({
              ...page,
              totalComments: page.totalComments + 1,
            }))
          }));

          if (parentCommentId !== null) {
            queryClient.setQueryData(["remaining-replies", parentCommentId], (prevComments) => ({
              ...prevComments,
              pages: prevComments.pages.map((page) => ({
                ...page,
                remainingReplies: [{
                  ...newReply,
                  blogId,
                  content: replyConetnt,
                  parentComment: parentCommentId
                },
                ...page.remainingReplies
                ]
              }))
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
          queryClient.setQueryData(["remaining-replies", parentCommentId], (prevComments) => ({
            ...prevComments,
            pages: prevComments.pages.map((page) => ({
              ...page,
              remainingReplies: page.remainingReplies.map((reply) =>
                reply._id === tempReplyId ?
                  newReplyRes
                  : reply
              )
            }))
          }));
        } else {
          setNotificationPopup({
            message: "Your reply comment has been submitted for review"
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
      }
    }
  );
};
