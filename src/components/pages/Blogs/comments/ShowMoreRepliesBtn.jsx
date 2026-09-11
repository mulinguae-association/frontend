import { useInfiniteQuery } from "react-query";
import CommentReply from "./CommentReply";
import { getRemainingAcceptedReplies } from "../../../../apis/blog-api";
import { BiLoaderCircle } from "react-icons/bi";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const ShowMoreRepliesBtn = ({
  comments,
  commentId,
  isEditComment,
  setIsEditComment,
  editCommentId,
  handleEdit,
}) => {
  const { t } = useTranslation("pages/blogs");
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["remaining-replies", commentId],
      ({ pageParam = 1 }) =>
        getRemainingAcceptedReplies({
          parentCommentIds: commentId,
          pageParam,
          limit: 3,
        }),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.remainingReplies.length > 0
            ? allPages.length + 1
            : undefined; // Proceed to fetch the next page
        },
        staleTime: Infinity,
      },
    );

  // Compute how many replies are already shown from the paginated data
  const shownReplies =
    data?.pages?.flatMap((p) => p.remainingReplies).length || 0;
  // Find the parent comment object to read its repliesCount
  const parentComment = comments?.find((c) => c._id === commentId);

  const apiTotal = data?.pages?.[0]?.totalAcceptedReplies;
  const repliesCount =
    typeof apiTotal === "number" ? apiTotal : parentComment?.repliesCount || 0;
  const remaining = Math.max(0, repliesCount - shownReplies);

  return (
    <div>
      {data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.remainingReplies
            .slice()
            .map((reply) =>
              reply?.status === "accepted" ? (
                <CommentReply
                  key={reply._id}
                  comment={reply}
                  isEditComment={isEditComment}
                  setIsEditComment={setIsEditComment}
                  editCommentId={editCommentId}
                  handleEdit={handleEdit}
                />
              ) : null,
            )}
        </Fragment>
      ))}
      {remaining > 0 && (
        <div className="fetch_more_replies">
          {isLoading || isFetchingNextPage ? (
            <BiLoaderCircle color="#fff" className="spin-loader" />
          ) : hasNextPage ? (
            <>
              <button
                className="fetch_more_btn"
                onClick={() => !isFetching && fetchNextPage()}
                disabled={isFetchingNextPage || !hasNextPage}
              >
                {t("showMoreReplies")}
              </button>

              <p className="reply-counter">{t("remainingCounter", { remaining, total: repliesCount })}</p>
            </>
          ) : (
            <span className="replies_loaded">{t("allRepliesLoaded")}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowMoreRepliesBtn;
