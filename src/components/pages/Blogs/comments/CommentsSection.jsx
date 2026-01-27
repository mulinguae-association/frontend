import React from "react";
import ReplyForm from "./ReplyForm";
import Comment from "./Comment";
import CommentReply from "./CommentReply";
import { useCommentEditState } from "../../../HelperComponents/useCommentEditState";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";

const CommentsSection = ({
  showAllComments,
  totalComments,
  setShowAllComments,
  blogId,
  list,
  comments,
  lastReplyData,
}) => {
  const { isEditComment, handleEdit, setIsEditComment, editCommentId } =
    useCommentEditState();

  const { t } = useTranslation("pages/blogs");
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);

  return (
    <section
      style={isAr_Ur ? { direction: "rtl" } : { direction: "ltr" }}
      className="comments"
    >
      <h2 className="comment_title">
        {t("commentsTitle")}
        <span className="comment_count">{totalComments || 0}</span>
      </h2>
      <div className="comments_content">
        {/* Show more comments button */}
        {totalComments > 0 && !showAllComments && (
          <button
            className="show_more"
            type="button"
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            {t("showAllComments")}
          </button>
        )}

        {/* Display comments */}
        {comments && comments.length > 0 && (
          <article className="comment">
            <Comment
              comment={comments[0]}
              editCommentId={editCommentId}
              handleEdit={handleEdit}
              setIsEditComment={setIsEditComment}
              isEditComment={isEditComment}
              list={list}
            />

            {lastReplyData &&
              (lastReplyData?.pages[0]?.lastAcceptedReply ? (
                <CommentReply
                  comment={lastReplyData.pages[0].lastAcceptedReply}
                  blogId={blogId}
                  editCommentId={editCommentId}
                  handleEdit={handleEdit}
                  isEditComment={isEditComment}
                  setIsEditComment={setIsEditComment}
                />
              ) : lastReplyData?.pages[0]?.remainingReplies[0] ? (
                <CommentReply
                  comment={lastReplyData.pages[0].remainingReplies[0]}
                  blogId={blogId}
                  editCommentId={editCommentId}
                  handleEdit={handleEdit}
                  isEditComment={isEditComment}
                  setIsEditComment={setIsEditComment}
                />
              ) : null)}

            <ReplyForm commentsId={comments[0]._id} blogId={blogId} />
          </article>
        )}
      </div>
    </section>
  );
};
export default React.memo(CommentsSection);
