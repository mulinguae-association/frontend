import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import handleError from "../../../utils/handleError";
import { interactWithComment } from "../../blog-api";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { notifyError } from "../../../components/Notify";
import { useAuth } from "../../../contexts/AuthContext.jsx";

export const useUpdateInteractionMutation = ({ blogId, parentCommentId }) => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const { queryKeyName } = useBlogPosts();
  const { userData } = useAuth();

  return useMutation(
    ({ modelType, id, action }) => interactWithComment(modelType, id, action),
    {
      onMutate: async ({ id, action, modelType }) => {
        await queryClient.cancelQueries(["comments", blogId]);
        await queryClient.cancelQueries([queryKeyName, postsToDisplay]);
        await queryClient.cancelQueries(["remaining-replies", parentCommentId]);
        const previousPosts = queryClient.getQueryData([
          queryKeyName,
          postsToDisplay,
        ]);
        const previousComments = queryClient.getQueryData(["comments", blogId]);

        const currentState = getCurrentState(
          id,
          queryClient,
          postsToDisplay,
          modelType,
          blogId,
          queryKeyName,
          parentCommentId,
        );
        const updatedValues = getUpdatedValues(
          action,
          currentState,
          userData?.userId,
        );

        updateInteraction(
          id,
          updatedValues,
          queryClient,
          postsToDisplay,
          modelType,
          blogId,
          parentCommentId,
          queryKeyName,
        );

        return { previousPosts, previousComments };
      },
      onSuccess: (res, { id, modelType }) => {
        const updatedValues = {
          likes: res.data.likes || [],
          loves: res.data.loves || [],
          unlikes: res.data.unlikes || [],
        };
        updateInteraction(
          id,
          updatedValues,
          queryClient,
          postsToDisplay,
          modelType,
          blogId,
          parentCommentId,
          queryKeyName,
        );
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(
          [queryKeyName, postsToDisplay],
          context.previousPosts,
        );
        queryClient.setQueryData(
          ["comments", blogId],
          context.previousComments,
        );
        logError(err);
        notifyError(handleError(err));
      },
    },
  );
};

const getCurrentState = (
  id,
  queryClient,
  postsToDisplay,
  modelType,
  blogId,
  queryKeyName,
  parentCommentId,
) => {
  if (modelType === "comment") {
    const comments = queryClient.getQueryData(["comments", blogId]);
    for (const page of comments?.pages || []) {
      for (const comment of page.acceptedComments || []) {
        if (comment._id === id) return getInteractionState(comment);
        if (comment.replies) {
          for (const reply of comment.replies) {
            if (reply._id === id) return getInteractionState(reply);
          }
        }
      }
    }

    // If not found in acceptedComments, check remaining-replies (used for last reply)
    if (parentCommentId) {
      const remaining = queryClient.getQueryData([
        "remaining-replies",
        parentCommentId,
      ]);
      for (const page of remaining?.pages || []) {
        if (page.lastAcceptedReply && page.lastAcceptedReply._id === id) {
          return getInteractionState(page.lastAcceptedReply);
        }
        for (const reply of page.remainingReplies || []) {
          if (reply._id === id) return getInteractionState(reply);
        }
      }
    }
  } else {
    const blogs = queryClient.getQueryData([queryKeyName, postsToDisplay]);
    const blog = blogs?.find((b) => b._id === id);
    if (blog) return getInteractionState(blog);
  }
  return { likes: [], loves: [], unlikes: [] };
};

const getInteractionState = (item) => ({
  likes: item.likes || [],
  loves: item.loves || [],
  unlikes: item.unlikes || [],
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
  array.includes(value)
    ? array.filter((item) => item !== value)
    : [...array, value];

const removeValue = (array, value) => array.filter((item) => item !== value);

const updateInteraction = (
  id,
  updatedValues,
  queryClient,
  postsToDisplay,
  modelType,
  blogId,
  parentCommentId,
  queryKeyName,
) => {
  const { likes, loves, unlikes } = updatedValues;

  if (modelType === "comment") {
    queryClient.setQueryData(["comments", blogId], (prevComments) => ({
      ...prevComments,
      pages:
        prevComments?.pages.map((page) => ({
          ...page,
          acceptedComments: updateComments(
            page.acceptedComments,
            id,
            updatedValues,
          ),
        })) || [],
    }));
  }
  if (parentCommentId) {
    queryClient.setQueryData(
      ["remaining-replies", parentCommentId],
      (prevReplies) => {
        if (!prevReplies) return prevReplies;
        return {
          ...prevReplies,
          pages:
            prevReplies.pages?.map((page) => ({
              ...page,
              remainingReplies: updateReplies(
                page.remainingReplies,
                id,
                updatedValues,
              ),
              lastAcceptedReply:
                page.lastAcceptedReply && page.lastAcceptedReply._id === id
                  ? { ...page.lastAcceptedReply, ...updatedValues }
                  : page.lastAcceptedReply,
            })) || [],
        };
      },
    );
  }
  if (modelType === "blog") {
    queryClient.setQueryData([queryKeyName, postsToDisplay], (prevBlogs) =>
      prevBlogs?.map((blog) =>
        blog._id === id ? { ...blog, likes, loves, unlikes } : blog,
      ),
    );
  }
};

// Replace updateComments to also update nested replies
const updateComments = (comments = [], id, updatedValues) =>
  comments.map((comment) => {
    if (comment._id === id) return { ...comment, ...updatedValues };
    if (Array.isArray(comment.replies) && comment.replies.length > 0) {
      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          reply._id === id ? { ...reply, ...updatedValues } : reply,
        ),
      };
    }
    return comment;
  });

// updateReplies is okay, but keep the default param guard
const updateReplies = (replies = [], id, updatedValues) =>
  replies.map((reply) =>
    reply._id === id ? { ...reply, ...updatedValues } : reply,
  );
