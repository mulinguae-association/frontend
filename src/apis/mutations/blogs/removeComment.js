import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
// Removed unused import: useBlogPosts
import { notifyError, notifySuccess } from '../../../components/Notify';
import { refuseComment } from '../../blog-api';
import { useCache } from '../../../contexts/BlogsCache';

export const useRemoveCommentMutation = (blogId, parentComment) => {
  const queryClient = useQueryClient();
  // We don't need postsToDisplay for this mutation
  const { clearCache } = useCache();

  return useMutation(
    ({ commentId }) => refuseComment(commentId, blogId),
    {

      onMutate: async ({ commentId }) => {
        await queryClient.cancelQueries(['comments', blogId]);
        await queryClient.cancelQueries(['remaining-replies', parentComment]);
        // get return previous comments or replies on Error
        const previousComments = await queryClient.cancelQueries(['comments', blogId]);
        const previousReplies = await queryClient.cancelQueries(['remaining-replies', parentComment]);
        // Optimistically update the comments
        queryClient.setQueryData(['comments', blogId], (oldData) => updateComments(oldData, commentId));
        if (parentComment !== null) {
          queryClient.setQueryData(["remaining-replies", parentComment], (oldData) => updateReplies(oldData, commentId));
        }

        return { previousComments, previousReplies };
      },
      onSuccess: (res) => handleSuccess(res, blogId, queryClient, clearCache),
      onError: (error, _, context) => handleErrorCase(error, context, blogId, parentComment, queryClient)
    }
  );
};

// Update comments and calculate removed counts
const updateComments = (oldData, commentId) => {
  if (!oldData) return oldData;
  const newPages = oldData.pages.map(page => {
    let removedCount = 0; // Keep track of how many comments are removed (parent + replies)

    const updatedComments = page.acceptedComments.filter(comment => comment._id !== commentId);
    return {
      ...page,
      acceptedComments: updatedComments,
      totalComments: page.totalComments - removedCount // Adjust total comments based on the number removed
    };
  });

  return {
    ...oldData,
    pages: newPages
  };
};
const updateReplies = (oldData, commentId) => {
  if (!oldData) return oldData;
  const newPages = oldData.pages.map((page) => {
    const updateComments = {
      ...page,
      remainingReplies: page.remainingReplies.filter(reply => reply._id !== commentId)
    }
    return updateComments;
  })
  return {
    ...oldData,
    pages: newPages
  }
};

// Handle successful deletion of a comment
const handleSuccess = (res, blogId, queryClient, clearCache) => {
  if (res && res.data && res.data.message) {
    notifySuccess(res.data.message);
    queryClient.invalidateQueries(["comments", blogId]);
    clearCache();
  }
};

// Handle errors in removing a comment
const handleErrorCase = (error, context, blogId, parentComment, queryClient) => {
  if (context?.previousComments) {
    queryClient.setQueryData(['comments', blogId], context.previousComments);
  }
  if (context?.previousReplies) {
    queryClient.setQueryData(['remaining-replies', parentComment], context.previousReplies);
  }
  logError('Error removing comment:', error);
  notifyError(handleError(error));
};
