import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { notifyError, notifySuccess } from '../../../components/Notify';
import { refuseComment } from '../../blog-api';

export const useRemoveCommentMutation = () => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts()
  return useMutation(
    (commentId) => refuseComment(commentId),
    {
      onMutate: async (commentId) => {
        await queryClient.cancelQueries(['acceptedPosts', postsToDisplay]);
        const previousPosts = queryClient.getQueryData(['acceptedPosts', postsToDisplay]);
        queryClient.setQueryData(['acceptedPosts', postsToDisplay], (old) => {
          return old.map((post) => ({
            ...post,
            comments: post.comments.map((comment) => {
              if (String(comment._id) === String(commentId)) {
                return null;
              }
              return {
                ...comment,
                replies: comment.replies.filter((reply) => String(reply._id) !== String(commentId))
              };
            }).filter(comment => comment !== null)
          }))
        });
        return { previousPosts }
      },
      onSuccess: (res) => {
        notifySuccess(res.data.message)
      },
      onError: (error, varia, context) => {
        queryClient.setQueryData(['acceptedPosts', postsToDisplay], context.previousPosts);
        logError('Error removing comment:', error);
        notifyError(handleError(error))
      }
    }
  );
};