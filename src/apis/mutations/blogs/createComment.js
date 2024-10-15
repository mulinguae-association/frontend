import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { createComment } from '../../blog-api';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { notifyError, notifySuccess } from '../../../components/Notify';
import { useGlobal } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const { userData } = useAuth();
  const { setNotificationPopup, setButtonLoading } = useGlobal()

  return useMutation(
    ({ blogId, commentData }) => createComment(blogId, commentData),
    {
      onMutate: async ({ blogId, commentData }) => {
        await queryClient.cancelQueries(["acceptedPosts", postsToDisplay]);
        const previousPosts = queryClient.getQueryData(["acceptedPosts", postsToDisplay]);
        setButtonLoading(`postComment_${blogId}`, true)
        // Optimistically update the query data
        userData?.role === "admin" &&
          queryClient.setQueryData(["acceptedPosts", postsToDisplay], (oldPosts) =>
            oldPosts.map((post) =>
            (post._id === blogId
              ? {
                ...post, comments: [commentData, ...post.comments]
              }
              : post)
            )
          )
        return { previousPosts };
      },
      onSuccess: ({ data }, { blogId, commentData }) => {
        if (userData?.role === "admin") {
          notifySuccess("Your Comment Successfully created");
          return queryClient.setQueryData(["acceptedPosts", postsToDisplay], (oldPosts) =>
            oldPosts.map((post) =>
            (post._id === blogId
              ? {
                ...post, comments: post.comments.map((comment) => {
                  if (comment._id === commentData._id) {
                    return data.comment
                  }
                  return comment;
                })
              }
              : post)
            )
          )
        }
        setNotificationPopup({ message: "Your Comment has been submitted for review" });
      },
      onError: (err, { blogId }, context) => {
        queryClient.setQueryData(["acceptedPosts", postsToDisplay], context.previousPosts);
        logError(err);
        notifyError(handleError(err));
      },
      onSettled: (data, variab, { blogId }) => {
        setButtonLoading(`postComment_${blogId}`, false)
      }
    }
  );
}