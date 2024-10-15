import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import {
  removeBlogPost
} from '../../blog-api';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { notifyError, notifySuccess } from '../../../components/Notify';
import { useGlobal } from '../../../contexts/AppContext';

export const useRemoveBlogMutation = (setShowModal) => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const { setButtonLoading } = useGlobal();
  return useMutation(
    (blogId) => removeBlogPost(blogId), {
    onMutate: async (blogId) => {
      setButtonLoading("RemoveBlogPost", true);
      await queryClient.cancelQueries(['acceptedPosts', postsToDisplay]);
      const previousPost = queryClient.getQueryData(['acceptedPosts', postsToDisplay]);
      queryClient.setQueryData(['acceptedPosts', postsToDisplay], (oldPosts) =>
        oldPosts.filter(post => post._id !== blogId));
      return { previousPost };
    },
    onSuccess: (res) => {
      notifySuccess(res.message)
    },
    onError: (err, _, context) => {
      notifyError(handleError(err));
      logError(err.message);
      queryClient.setQueryData(['acceptedPosts', postsToDisplay], context.previousPost);
    },
    onSettled() {
      setButtonLoading("RemoveBlogPost", false);
      setShowModal(false);
    }
  });
}