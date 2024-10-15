import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { handleReplySubmit } from '../../blog-api';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { notifyError } from '../../../components/Notify';
import { useGlobal } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';


export const useAddReplyMutation = (setReplyContent) => {
  const { userData } = useAuth();
  const { setButtonLoading, setNotificationPopup } = useGlobal();
  const { postsToDisplay } = useBlogPosts();
  const queryClient = useQueryClient();
  const newComment = {
    _id: crypto.randomUUID().toString(),
    likes: [],
    loves: [],
    unlikes: [],
    postedBy: userData,
    replies: [],
    status: "accepted"
  }
  return useMutation(
    async ({ replyConetnt, blogId, parentCommentId }) =>
      await handleReplySubmit(replyConetnt, blogId, parentCommentId),
    {
      onMutate: async ({ parentCommentId, blogId, replyConetnt }) => {
        await queryClient.cancelQueries(["acceptedPosts", postsToDisplay]);
        const previousPosts = queryClient.getQueryData(["acceptedPosts", postsToDisplay]);
        const buttonKey = `replyCommentBtn_${parentCommentId}`;
        setButtonLoading(buttonKey, true)
        userData?.role === "admin" &&
          queryClient.setQueryData(["acceptedPosts", postsToDisplay], (old) => {
            return old.map((post) => ({
              ...post,
              comments: post.comments.map((comment) => {
                if (comment._id === parentCommentId) {
                  return {
                    ...comment,
                    replies: [
                      { ...newComment, blogId, content: replyConetnt, parentComment: parentCommentId },
                      ...comment.replies
                    ]
                  }
                }
                return comment
              })
            }))
          })
        return { previousPosts }
      },
      onSuccess: (res, { parentCommentId }) => {
        const newCommentRes = res.data?.comment;
        userData?.role === "admin" ?
          queryClient.setQueryData(["acceptedPosts", postsToDisplay], (old) => {
            return old.map((post) => ({
              ...post,
              comments: post.comments.map((comment) => {
                if (comment._id === parentCommentId) {
                  return {
                    ...comment, replies: comment.replies.map((reply) => {
                      if (reply._id === newComment._id) {
                        return newCommentRes;
                      }
                      return reply;
                    })
                  }
                }
                return comment
              })
            }))
          })
          : setNotificationPopup({ message: "Your reply Comment has been submitted for review" });
      },
      onError: (error) => {
        logError('Error removing comment:', error);
        notifyError(handleError(error))
      },
      onSettled: (res, err, { parentCommentId }) => {
        const buttonKey = `replyCommentBtn_${parentCommentId}`
        setReplyContent("");
        setButtonLoading(buttonKey, false)
      }
    }
  );
}