import { useQueryClient } from "react-query";

export const useUpdateCommentLocally = (blogId, parentComment) => {
  const queryClient = useQueryClient();
  const updateCommentLocally = (commentId, value, updatedContent) => {
    if (parentComment == null) {
      queryClient.setQueryData(["comments", blogId], (prevComments) => ({
        ...prevComments,
        pages: prevComments.pages.map((page) => ({
          ...page,
          acceptedComments: page.acceptedComments.map((comment) => {
            if (comment._id === commentId) {
              return { ...comment, status: updatedContent, content: value };
            }
            return comment;
          }),
        })),
      }));
    } else {
      queryClient.setQueriesData(
        ["remaining-replies", parentComment],
        (prevComments) => {
          if (!prevComments) return prevComments;
          return {
            ...prevComments,
            pages: prevComments.pages.map((page) => ({
              ...page,
              remainingReplies: page.remainingReplies.map((reply) =>
                reply._id === commentId
                  ? { ...reply, status: updatedContent, content: value }
                  : reply,
              ),
              lastAcceptedReply:
                page.lastAcceptedReply &&
                page.lastAcceptedReply._id === commentId
                  ? {
                      ...page.lastAcceptedReply,
                      status: updatedContent,
                      content: value,
                    }
                  : page.lastAcceptedReply,
            })),
          };
        },
      );
    }
  };
  return updateCommentLocally;
};
