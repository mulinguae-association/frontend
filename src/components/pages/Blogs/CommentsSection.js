import React from 'react'
import EllipsisMenu from './EllipsisMenu';
import UpdateComment from './UpdateComment';
import { formatRelativeTime } from '../../HelperComponents/RelativeDate';

const CommentsSection = ({
  comments,
  showAllComments,
  setShowAllComments,
  checkStatus,
  handleRemoveComment,
  isEditComment,
  setComments,
  setIsEditComment,
  editCommentId,
  handleEdit,
  updateCommentLocally,
  replyContent,
  setReplyContent,
  handleSubmit,
}) => {
  return (
    <section className="comments">
      <h1 className="comment_title">
        Comments
        <span className="comment_count">
          {comments.filter((comment) => comment.status === "accepted").length}
        </span>
      </h1>
      <div className="comments_content">
        {/* Show more comments button */}
        {comments?.length > 0 && !showAllComments && (
          <button
            className="show_more"
            type="button"
            onClick={() => setShowAllComments((prev) => !prev)}
          >
            Show All Comments
          </button>
        )}

        {/* Display comments */}
        {comments && checkStatus && comments?.length > 0 && (
          <article className="comment">
            {/* Comment ellipsis menu */}
            <EllipsisMenu
              handleDelete={() => handleRemoveComment(comments[0]?._id)}
              handleEdit={(state) => handleEdit(comments[0]._id, state)}
            />
            <div className="comment_head">
              <h2>@{comments[0]?.author}</h2>
              <span className="comment_date">
                {formatRelativeTime(comments[0]?.createdAt)}
              </span>
            </div>
            {/* Display edited comment or edit form */}
            {isEditComment && editCommentId === comments[0]?._id ? (
              <div className="update_parent">
                <UpdateComment
                  initialValue={comments[0]?.content}
                  editCommentId={comments[0]._id}
                  setIsEditComment={setIsEditComment}
                  setComments={setComments}
                  updateCommentLocally={updateCommentLocally}
                />
              </div>
            ) : (
              <p className="comment_content">{comments[0]?.content}</p>
            )}

            {/* Display the reply form conditionally */}
            {comments[0].replies[0]?.status === "accepted" &&
              comments[0].replies?.length > 0 && (
                <div
                  style={
                    isEditComment && editCommentId === comments[0].replies[0]?._id
                      ? { width: "90%" }
                      : { width: "fit-content" }
                  }
                  className="nested_comments"
                >
                  <EllipsisMenu
                    handleDelete={() => handleRemoveComment(comments[0].replies[0]?._id)}
                    handleEdit={(state) => handleEdit(comments[0].replies[0]._id, state)}
                  />
                  {isEditComment && editCommentId === comments[0].replies[0]?._id ? (
                    <div className="update_parent">
                      <UpdateComment
                        initialValue={comments[0].replies[0]?.content}
                        editCommentId={comments[0].replies[0]._id}
                        setIsEditComment={setIsEditComment}
                        updateCommentLocally={updateCommentLocally}
                      />
                    </div>
                  ) : (
                    <p>{comments[0].replies[0]?.content}</p>
                  )}
                </div>
              )}

            {/* Reply form */}
            <div className="reply_form">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                required
              />
              <button onClick={() => handleSubmit(comments[0]?._id)}>
                Submit Reply
              </button>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
export default React.memo(CommentsSection)