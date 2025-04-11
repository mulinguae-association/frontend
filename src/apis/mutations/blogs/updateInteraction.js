import { useMutation, useQueryClient } from 'react-query';
import logError from '../../../utils/logError';
import handleError from '../../../utils/handleError';
import { interactWithComment } from '../../blog-api';
import { useBlogPosts } from '../../../contexts/BlogsContext';
import { notifyError } from '../../../components/Notify';
import { useAuth } from '../../../contexts/AuthContext';

export const useUpdateInteractionMutation = ({ blogId, parentCommentId }) => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const { userData } = useAuth();

  return useMutation(({ modelType, id, action }) =>
    interactWithComment(modelType, id, action),
    {
      onMutate: async ({ id, action, modelType }) => {
        await queryClient.cancelQueries(["comments", blogId]);
        await queryClient.cancelQueries(["acceptedPosts", postsToDisplay]);
        await queryClient.cancelQueries(["remaining-replies", parentCommentId]);
        const previousPosts = queryClient.getQueryData(["acceptedPosts", postsToDisplay]);
        const previousComments = queryClient.getQueryData(["comments", blogId]);

        const currentState = getCurrentState(id, queryClient, postsToDisplay, modelType, blogId);
        const updatedValues = getUpdatedValues(action, currentState, userData?.userId);

        updateInteraction(id, updatedValues, queryClient, postsToDisplay, modelType, blogId, parentCommentId);

        return { previousPosts, previousComments };
      },
      onSuccess: (res, { id, modelType }) => {
        const updatedValues = {
          likes: res.data.likes || [],
          loves: res.data.loves || [],
          unlikes: res.data.unlikes || []
        };
        updateInteraction(id, updatedValues, queryClient, postsToDisplay, modelType, blogId, parentCommentId);
      },
      onError: (err, { id }, context) => {
        queryClient.setQueryData(["acceptedPosts", postsToDisplay], context.previousPosts);
        queryClient.setQueryData(["comments", blogId], context.previousComments);
        logError(err);
        notifyError(handleError(err));
      }
    }
  );
};

const getCurrentState = (id, queryClient, postsToDisplay, modelType, blogId,) => {
  if (modelType === "comment") {
    const comments = queryClient.getQueryData(["comments", blogId]);
    for (const page of comments?.pages || []) {
      for (const comment of page.acceptedComments) {
        if (comment._id === id) return getInteractionState(comment);
        if (comment.replies) {
          for (const reply of comment.replies) {
            if (reply._id === id) return getInteractionState(reply);
          }
        }
      }
    }
  } else {
    const blogs = queryClient.getQueryData(['acceptedPosts', postsToDisplay]);
    const blog = blogs?.find(blog => blog._id === id);
    if (blog) return getInteractionState(blog);
  }
  return { likes: [], loves: [], unlikes: [] };
};

const getInteractionState = (item) => ({
  likes: item.likes || [],
  loves: item.loves || [],
  unlikes: item.unlikes || []
});

const getUpdatedValues = (action, currentState, userId) => {
  const { likes, loves, unlikes } = currentState;
  const updatedValues = { likes, loves, unlikes };

  if (action === "like") {
    updatedValues.likes = toggleValue(likes, userId);
    updatedValues.loves = removeValue(loves, userId);
    updatedValues.unlikes = removeValue(unlikes, userId);
  } else if (action === "love") {
    updatedValues.loves = toggleValue(loves, userId);
    updatedValues.likes = removeValue(likes, userId);
    updatedValues.unlikes = removeValue(unlikes, userId);
  } else if (action === "unlike") {
    updatedValues.unlikes = toggleValue(unlikes, userId);
    updatedValues.likes = removeValue(likes, userId);
    updatedValues.loves = removeValue(loves, userId);
  }

  return updatedValues;
};

const toggleValue = (array, value) =>
  array.includes(value) ? array.filter(item => item !== value) : [...array, value];

const removeValue = (array, value) =>
  array.filter(item => item !== value);

const updateInteraction = (id, updatedValues, queryClient, postsToDisplay, modelType, blogId, parentCommentId) => {
  const { likes, loves, unlikes } = updatedValues;

  if (modelType === "comment") {
    queryClient.setQueryData(["comments", blogId], (prevComments) => ({
      ...prevComments,
      pages: prevComments?.pages.map(page => ({
        ...page,
        acceptedComments: updateComments(page.acceptedComments, id, updatedValues)
      })) || []
    }));

    // updateBlogLastComment(id, updatedValues, queryClient, postsToDisplay, blogId);
    // console.log(parentCommentId)
  }
  if (parentCommentId) {

    queryClient.setQueryData(["remaining-replies", parentCommentId], (prevReplies) => ({
      // console.log(parentCommentId)
      // console.log(prevReplies)
      ...prevReplies,
      pages: prevReplies?.pages.map(page => ({
        ...page,
        remainingReplies: updateReplies(page.remainingReplies, id, updatedValues) // Update the replies interaction
      }))
    }));
  }
  queryClient.setQueryData(['acceptedPosts', postsToDisplay], (prevBlogs) =>
    prevBlogs?.map(blog =>
      blog._id === id ? { ...blog, likes, loves, unlikes } : blog
    )
  );
}

const updateComments = (comments, id, updatedValues) =>
  comments.map(comment => {
    if (comment._id === id) return { ...comment, ...updatedValues };
    // if (comment.replies) { ??? for blogs please reveiew it after fix replies
    //   return {
    //     ...comment,
    //     replies: comment.replies.map(reply =>
    //       reply._id === id ? { ...reply, ...updatedValues } : reply
    //     )
    //   };
    // }
    return comment;
  });

// Helper function to update replies
const updateReplies = (replies, id, updatedValues) =>
  replies.map(reply => {
    if (reply._id === id) return { ...reply, ...updatedValues };
    return reply;
  });

// const updateBlogLastComment = (id, updatedValues, queryClient, postsToDisplay, blogId) => {
//   queryClient.setQueryData(['acceptedPosts', postsToDisplay], (prevBlogs) =>
//     prevBlogs?.map(blog => {
//       if (blog._id === blogId) {
//         const lastComment = blog.lastComment || {};

//         // Ensure lastComment is defined and check for both lastComment and lastReply
//         const isLastComment = lastComment?._id === id;
//         const isLastReply = lastComment?.lastReply?._id === id;

//         if (isLastComment || isLastReply) {
//           return {
//             ...blog,
//             lastComment: {
//               ...lastComment,
//               ...(isLastComment && updatedValues), // Update if it's the last comment
//               lastReply: isLastReply
//                 ? { ...lastComment.lastReply, ...updatedValues } // Update if it's the last reply
//                 : lastComment.lastReply // Otherwise, leave lastReply as is
//             }
//           };
//         }
//       }
//       return blog;
//     })
//   );
// };
