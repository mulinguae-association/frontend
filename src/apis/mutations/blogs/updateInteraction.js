import { useMutation, useQueryClient } from "react-query";
import logError from "../../../utils/logError";
import handleError from "../../../utils/handleError";
import { interactWithComment } from "../../blog-api";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { notifyError } from "../../../components/Notify";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { getCurrentUserId } from "../../../utils/getCurrentUserId";

const NORMAL_KEY = "remaining-replies";
const PREVIEW_KEY = "remaining-replies-preview";

export const useUpdateInteractionMutation = ({ blogId, parentCommentId }) => {
  const queryClient = useQueryClient();
  const { postsToDisplay } = useBlogPosts();
  const { userData } = useAuth();

  return useMutation(
    ({ modelType, id, action }) => interactWithComment(modelType, id, action),
    {
      onMutate: async ({ id, action, modelType }) => {
        await queryClient.cancelQueries(["comments", blogId]);
        await queryClient.cancelQueries(["acceptedPosts", postsToDisplay]);
        await queryClient.cancelQueries([NORMAL_KEY, parentCommentId]);
        await queryClient.cancelQueries([PREVIEW_KEY, parentCommentId]);
        const previousPosts = queryClient.getQueryData([
          "acceptedPosts",
          postsToDisplay,
        ]);
        const previousComments = queryClient.getQueryData(["comments", blogId]);

        const currentState = getCurrentState(
          id,
          queryClient,
          postsToDisplay,
          modelType,
          blogId
        );
        const updatedValues = getUpdatedValues(
          action,
          currentState,
          getCurrentUserId(userData)
        );

        updateInteraction(
          id,
          updatedValues,
          queryClient,
          postsToDisplay,
          modelType,
          blogId,
          parentCommentId
        );

        return { previousPosts, previousComments };
      },
      onSuccess: (res, { id, modelType }) => {
        // Only reconcile fields the server actually returned; otherwise keep
        // the optimistic values so the filled state and count never flicker.
        const payload = res.data || {};
        const updatedValues = {};
        if (Array.isArray(payload.likes)) updatedValues.likes = normalizeIds(payload.likes);
        if (Array.isArray(payload.loves)) updatedValues.loves = normalizeIds(payload.loves);
        if (Array.isArray(payload.unlikes)) updatedValues.unlikes = normalizeIds(payload.unlikes);
        if (Object.keys(updatedValues).length === 0) return;
        updateInteraction(
          id,
          updatedValues,
          queryClient,
          postsToDisplay,
          modelType,
          blogId,
          parentCommentId
        );
      },
      onError: (err, _, context) => {
        queryClient.setQueryData(
          ["acceptedPosts", postsToDisplay],
          context.previousPosts
        );
        queryClient.setQueryData(
          ["comments", blogId],
          context.previousComments
        );
        logError(err);
        notifyError(handleError(err));
      },
    }
  );
};

// Keep arrays as plain ids so `.includes(userId)` always works even when the
// server returns populated user objects.
const normalizeIds = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .map((item) =>
      typeof item === "string" ? item : item?._id || item?.id || item
    )
    .filter(Boolean);

const getCurrentState = (
  id,
  queryClient,
  postsToDisplay,
  modelType,
  blogId
) => {
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
    const replyState = findReplyState(id, queryClient);
    if (replyState) return replyState;
  } else {
    const blogs = queryClient.getQueryData(["acceptedPosts", postsToDisplay]);
    const blog = blogs?.find((blog) => blog._id === id);
    if (blog) return getInteractionState(blog);
  }
  return { likes: [], loves: [], unlikes: [] };
};

// Replies loaded via "show more" live in the remaining-replies caches, so
// look there too when the id is not found inside the accepted comments.
const findReplyState = (id, queryClient) => {
  for (const base of [NORMAL_KEY, PREVIEW_KEY]) {
    for (const key of queryClient.getQueryCache().getAll()) {
      if (Array.isArray(key.queryKey) && key.queryKey[0] === base) {
        const data = key.state?.data;
        for (const page of data?.pages || []) {
          if (page.lastAcceptedReply?._id === id) {
            return getInteractionState(page.lastAcceptedReply);
          }
          for (const reply of page.remainingReplies || []) {
            if (reply._id === id) return getInteractionState(reply);
          }
        }
      }
    }
  }
  return null;
};

const getInteractionState = (item) => ({
  likes: normalizeIds(item.likes),
  loves: normalizeIds(item.loves),
  unlikes: normalizeIds(item.unlikes),
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
  parentCommentId
) => {
  // Only apply the keys that were provided so a partial server response can
  // never wipe an interaction back to zero.
  const applyValues = (item) => ({
    ...item,
    ...(updatedValues.likes !== undefined && { likes: updatedValues.likes }),
    ...(updatedValues.loves !== undefined && { loves: updatedValues.loves }),
    ...(updatedValues.unlikes !== undefined && { unlikes: updatedValues.unlikes }),
  });

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
            applyValues
          ),
        })) || [],
    }));
  }
  if (parentCommentId) {
    [NORMAL_KEY, PREVIEW_KEY].forEach((base) => {
      queryClient.setQueryData([base, parentCommentId], (prevReplies) =>
        prevReplies
          ? updateReplyLists(prevReplies, id, updatedValues, applyValues)
          : null
      );
    });
  }
  queryClient.setQueryData(["acceptedPosts", postsToDisplay], (prevBlogs) =>
    prevBlogs?.map((blog) =>
      blog._id === id ? applyValues(blog) : blog
    )
  );
};

const updateComments = (comments, id, updatedValues, applyValues) =>
  comments.map((comment) => {
    if (comment._id === id) return applyValues(comment);
    if (Array.isArray(comment.replies) && comment.replies.length) {
      return {
        ...comment,
        replies: updateComments(
          comment.replies,
          id,
          updatedValues,
          applyValues
        ),
      };
    }
    return comment;
  });

const updateReplyLists = (prevReplies, id, updatedValues, applyValues) => ({
  ...prevReplies,
  pages: (prevReplies?.pages || []).map((page) => ({
    ...page,
    lastAcceptedReply:
      page.lastAcceptedReply?._id === id
        ? applyValues(page.lastAcceptedReply)
        : page.lastAcceptedReply,
    remainingReplies: updateReplies(
      page.remainingReplies,
      id,
      updatedValues,
      applyValues
    ),
  })),
});

// Helper function to update replies
const updateReplies = (replies, id, updatedValues, applyValues) =>
  replies.map((reply) => {
    if (reply._id === id) return applyValues(reply);
    return reply;
  });