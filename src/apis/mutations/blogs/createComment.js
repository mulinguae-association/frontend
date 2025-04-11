import { useMutation, useQueryClient } from 'react-query';
import { createComment } from '../../blog-api';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { useGlobal } from '../../../contexts/AppContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useCache } from '../../../contexts/BlogsCache';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { notifyError, notifySuccess } from '../../../components/Notify';

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { userData } = useAuth();
  const { setNotificationPopup, setButtonLoading } = useGlobal();
  const { clearCache } = useCache();

  // Assuming userData contains user roles or privileges
  const isAdmin = userData?.role === 'admin'; // Or any other logic to determine admin role
  const commentStatus = isAdmin ? 'accepted' : 'pending';

  const updateCommentsData = (blogId, commentData) => {
    queryClient.setQueryData(["comments", blogId], (prevComments) => ({
      ...prevComments,
      pages: prevComments.pages.map((page) => ({
        ...page,
        totalComments: page.totalComments + 1,
        acceptedComments: [commentData, ...page.acceptedComments],
      })),
    }));
  };

  return useMutation(
    ({ blogId, commentData }) => createComment(blogId, commentData),
    {
      onMutate: async ({ blogId, commentData }) => {
        await queryClient.cancelQueries(["comments", blogId]);
        const previousComments = queryClient.getQueryData(["comments", blogId]);
        setButtonLoading(`postComment_${blogId}`, true);

        // Add a temporary ID to the comment for optimistic update
        const tempComment = {
          ...commentData,
          _id: crypto.randomUUID().toString(),
          status: commentStatus, // Use dynamic comment status
        };

        if (isAdmin) {
          updateCommentsData(blogId, tempComment);
        }
        // updateQueryData(blogId, tempComment); // update last comment in the blog post
        clearCache();

        return { previousComments, tempCommentId: tempComment._id };
      },
      onSuccess: ({ data }, { blogId, commentData }, context) => {
        const { tempCommentId } = context;
        if (isAdmin) {
          queryClient.setQueryData(["comments", blogId], (prevComments) => ({
            ...prevComments,
            pages: prevComments.pages.map((page) => ({
              ...page,
              acceptedComments: page.acceptedComments.map((comment) =>
                comment._id === tempCommentId ? data.comment : comment
              ),
            })),
          }));
        } else {
          setNotificationPopup({ message: "Your comment has been submitted for review" });
        }
      },
      onError: (err, { blogId }, context) => {
        queryClient.setQueryData(["comments", blogId], context.previousComments);
        logError(err);
        notifyError(handleError(err));
      },
      onSettled: (data, error, { blogId }) => {
        setButtonLoading(`postComment_${blogId}`, false);
      },
    }
  );
};
