import { useQueryClient } from 'react-query';
import { useBlogPosts } from '../../../contexts/BlogsContext';

export const useUpdateCommentLocally = () => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const updateCommentLocally = (commentId, value, updatedContent) => {
    queryClient.setQueryData(['acceptedPosts', postsToDisplay], (old) => {
      return old.map((post) => ({
        ...post,
        comments: post.comments.map((comment) => {
          if (comment._id === commentId) {
            return { ...comment, status: updatedContent, content: value };
          } else if (comment.replies && comment.replies?.length > 0) {
            const updatedReplies = comment.replies.map((reply) => {
              if (reply._id === commentId) {
                return { ...reply, status: updatedContent, content: value };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }
          return comment
        })
      }))
    })
  };
  return updateCommentLocally;
}