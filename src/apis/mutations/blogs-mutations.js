import { useMutation, useQueryClient } from 'react-query';
import logError from '../../utils/logError';
import handleError from '../../utils/handleError';
import { createComment, fetchAcceptedPosts, handleReplySubmit, interactWithComment, refuseComment, removeBlogPost, searchBlogPosts } from '../blog-api';
import { useBlogPosts } from '../../contexts/BlogsContext';
import { notifySuccess } from '../../components/Notify';
import { useGlobal } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

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
      queryClient.setQueryData(['acceptedPosts', postsToDisplay], (oldPosts) => oldPosts.filter(post => post._id !== blogId));
      return { previousPost };
    },
    onSuccess: (res) => {
      notifySuccess(res.message)
    },
    onError: (err, _, context) => {
      handleError(err);
      logError(err.message);
      queryClient.setQueryData(['acceptedPosts', postsToDisplay], context.previousPost);
    },
    onSettled() {
      setButtonLoading("RemoveBlogPost", false);
      setShowModal(false);
    }
  });
}
export const useRemoveCommentMutation = () => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts()
  return useMutation(
    (commentId) => refuseComment(commentId),
    {
      onMutate: async (commentId) => {
        const previousPosts = queryClient.getQueryData(['acceptedPosts', postsToDisplay]);
        await queryClient.cancelQueries(['acceptedPosts', postsToDisplay]);
        queryClient.setQueryData(['acceptedPosts', postsToDisplay], (old) => {
          return old.map((post) => ({
            ...post,
            comments: post.comments.filter((comment) => {
              if (comment._id === commentId) {
                return false;
              }
              comment.replies = comment.replies.filter((reply) => reply._id !== commentId);
              return true;
            })
          }));
        });
        return { previousPosts }
      },
      onSuccess: (res) => {
        notifySuccess(res.data.message)
      },
      onError: (error, varia, context) => {
        queryClient.setQueryData(['acceptedPosts', postsToDisplay], context.previousPosts);
        logError('Error removing comment:', error);
        handleError(error)
      }
    }
  );
};
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
      onSuccess: (res, { blogId }) => {
        userData?.role === "admin" ?
          queryClient.setQueryData(["acceptedPosts", postsToDisplay], (oldPosts) =>
            oldPosts.map((post) =>
            (post._id === blogId
              ? {
                ...post, comments: [res.data.comment, ...post.comments]
              }
              : post)
            )
          )
          : setNotificationPopup({ message: "Your Comment has been submitted for review" });
      },
      onError: (err, { blogId }, context) => {
        queryClient.setQueryData(["acceptedPosts", postsToDisplay], context.previousPosts);
        logError(err);
        handleError(err);
      },
      onSettled: (data, variab, { blogId }) => {
        setButtonLoading(`postComment_${blogId}`, false)
      }
    }
  );
}
export const useAddReplyMutation = (setReplyContent) => {
  const { userData } = useAuth();
  const { setButtonLoading, setNotificationPopup } = useGlobal();
  const { postsToDisplay } = useBlogPosts();
  const queryClient = useQueryClient();
  const newComment = {
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
        const buttonKey = `replyCommentBtn_${parentCommentId}`
        setButtonLoading(buttonKey, true)
        userData?.role === "admin" &&
          queryClient.setQueryData(["acceptedPosts", postsToDisplay], (old) => {
            return old.map((post) => ({
              ...post,
              comments: post.comments.map((comment) => {
                if (comment._id === parentCommentId) {
                  return {
                    ...comment, replies: [{ ...newComment, blogId, content: replyConetnt, parentComment: parentCommentId }, ...comment.replies]
                  }
                }
                return comment
              })
            }))
          })
        return { previousPosts }
      },
      onSuccess: (res, { parentCommentId }) => {
        const newComment = res.data?.comment
        // const acceptedComments = queryClient.getQueryData(["acceptedComments"]);
        userData?.role === "admin" ?
          queryClient.setQueryData(["acceptedPosts", postsToDisplay], (old) => {
            return old.map((post) => ({
              ...post,
              comments: post.comments.map((comment) => {
                if (comment._id === parentCommentId) {
                  return {
                    ...comment, replies: [newComment, ...comment.replies]
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
        handleError(error)
      },
      onSettled: (res, err, { parentCommentId }) => {
        const buttonKey = `replyCommentBtn_${parentCommentId}`
        setReplyContent("");
        setButtonLoading(buttonKey, false)
      }
    }
  );
}

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
        handleError(err);
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

export const useSearchMutation = () => {
  const { setIsSearch, setIsSearching, setPostsToDisplay, postsToDisplay } = useBlogPosts();
  const queryClient = useQueryClient();
  return useMutation(
    async (searchQuery) => {
      setIsSearching(true); // Set isSearching to true when mutation starts
      if (searchQuery === "" || searchQuery.value === "") {
        setIsSearch(false);
        setPostsToDisplay(1)
        return fetchAcceptedPosts(1);
      }
      setIsSearch(true);
      const response = await searchBlogPosts(searchQuery);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["acceptedPosts", postsToDisplay], data);
      },
      onError: (error) => logError("Error searching blog posts:", error),
      onSettled: () => {
        setIsSearching(false); // Set isSearching to false when mutation ends
      }
    }
  );
}