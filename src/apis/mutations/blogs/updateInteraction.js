import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { interactWithComment } from '../../blog-api';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { notifyError } from '../../../components/Notify';
import { useAuth } from '../../../contexts/AuthContext';

export const useUpdateInteractionMutation = () => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const { userData } = useAuth()

  return useMutation(({ modelType, id, action }) =>
    interactWithComment(modelType, id, action),
    {
      onMutate: async ({ id, action, modelType }) => {
        await queryClient.cancelQueries(["acceptedPosts", postsToDisplay]);
        const previousPosts = queryClient.getQueryData(["acceptedPosts", postsToDisplay]);
        const updatedValues = { likes: [], loves: [], unlikes: [] };
        if (action === "like") updatedValues.likes = [userData?.userId];
        if (action === "love") updatedValues.loves = [userData?.userId];
        if (action === "unlike") updatedValues.unlikes = [userData?.userId];

        updateInteraction(id, updatedValues, queryClient, postsToDisplay, modelType)

        return { previousPosts };
      },
      onSuccess: (res, { id, modelType }) => {
        const updatedValues = { likes: [], loves: [], unlikes: [] };
        if (res.data.likes) updatedValues.likes = res.data.likes;
        if (res.data.loves) updatedValues.loves = res.data.loves;
        if (res.data.unlikes) updatedValues.unlikes = res.data.unlikes;
        updateInteraction(id, updatedValues, queryClient, postsToDisplay, modelType);
      },
      onError: (err, { id }, context) => {
        queryClient.setQueryData(["acceptedPosts", postsToDisplay], context.previousPosts);
        logError(err);
        notifyError(handleError(err));
      }
    });
}
const updateInteraction = (id, { likes, loves, unlikes }, queryClient, postsToDisplay, modelType) => {
  if (modelType === "comment") {
    queryClient.setQueryData(['acceptedPosts', postsToDisplay], (prevBlogs) => {
      return prevBlogs.map((blog) => ({
        ...blog,
        comments: blog.comments.map((comment) => {
          if (comment._id === id) {
            return { ...comment, likes, loves, unlikes };
          }
          if (Array.isArray(comment.replies)) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply._id === id) {
                  return { ...reply, likes, loves, unlikes };
                }
                return reply;
              })
            };
          }
          return comment;
        })
      }));
    });
  }
  queryClient.setQueryData(['acceptedPosts', postsToDisplay], (prevBlogs) => {
    return prevBlogs?.map((prevBlog) => {
      if (prevBlog._id === id) {
        return {
          ...prevBlog,
          likes: likes,
          loves: loves,
          unlikes: unlikes
        };
      }
      return prevBlog;
    });
  });
};