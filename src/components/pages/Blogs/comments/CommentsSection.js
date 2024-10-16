import React from 'react'
import ReplyForm from './ReplyForm';
import Comment from './Comment';
import CommentReply from './CommentReply';
import { useCommentEditState } from '../../../HelperComponents/useCommentEditState';
import i18n from '../../../../i18n';
import { useTranslation } from 'react-i18next';

const CommentsSection = ({
  comments,
  showAllComments,
  setShowAllComments,
  checkStatus,
  blogId,
  list
}) => {
  const {
    isEditComment,
    handleEdit,
    setIsEditComment,
    editCommentId
  } = useCommentEditState();
  const { t } = useTranslation("pages/blogs");
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);
  return (
    <section style={isAr_Ur ? { direction: "rtl" } : { direction: "ltr" }} className="comments">
      <h2 className="comment_title">
        {t("commentsTitle")}
        <span className="comment_count">
          {comments.filter((comment) => comment?.status === "accepted").length}
        </span>
      </h2>
      <div className="comments_content">
        {/* Show more comments button */}
        {comments?.length > 0 && !showAllComments && (
          <button
            className="show_more"
            type="button"
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            {t("showAllComments")}
          </button>
        )}

        {/* Display comments */}
        {comments && checkStatus && comments?.length > 0 && (
          <article className="comment">
            {comments && checkStatus && comments?.length > 0 && (
              <Comment
                comment={comments[0]} // Pass the first comment as a prop
                editCommentId={editCommentId}
                handleEdit={handleEdit}
                setIsEditComment={setIsEditComment}
                isEditComment={isEditComment}
                list={list}
              />
            )}

            {/* Display the reply form conditionally */}

            {comments[0].replies[0]?.status === "accepted" &&
              comments[0].replies?.length > 0 && (
                <CommentReply
                  comment={comments[0].replies[0]} // Pass the first comment as a prop
                  editCommentId={editCommentId}
                  handleEdit={handleEdit}
                  isEditComment={isEditComment}
                  setIsEditComment={setIsEditComment}
                />
              )}

            {/* Reply form */}
            <ReplyForm commentsId={comments[0]._id}
              blogId={blogId}
            />
          </article>
        )}
      </div>
    </section>
  );
};
export default React.memo(CommentsSection)