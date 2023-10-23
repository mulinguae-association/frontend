import React from "react";
import "./BlogPopup.scss";
import { useCommentEditState } from "../../HelperComponents/useCommentEditState";
import { useAuth } from "../../../contexts/AuthContext";
import ReplyForm from "./comments/ReplyForm";
import Comment from "./comments/Comment";
import CommentReply from "./comments/CommentReply";

const BlogPopup = ({
  blog,
  show,
  showFullContent,
  showAllComments,
  handleSubmit,
  comments,
  updateLike,
  handleRemoveComment,
  updateCommentLocally,
}) => {
  const { userData } = useAuth();
  const { isEditComment, handleEdit, setIsEditComment, editCommentId } =
    useCommentEditState();

  return (
    <div className="blog_popup">
      {showFullContent && (
        <>
          <h1 className="blog_title">{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </>
      )}
      {showAllComments && (
        <div className="popup_content">
          <div className="comments_header">
            <span className="special">{blog?.title}</span>
            <h1 className="comment_title">Comments</h1>
          </div>
          {comments.map((comment) =>
            comment?.status === "accepted" ? (
              <div key={comment._id} className="comments_content">
                <div className="comment">
                  <div className="comments_content">
                    {/* Map and display all comments */}
                    <Comment
                      key={comment._id}
                      comment={comment}
                      userData={userData}
                      isEditComment={isEditComment}
                      setIsEditComment={setIsEditComment}
                      editCommentId={editCommentId}
                      handleRemoveComment={handleRemoveComment}
                      handleEdit={handleEdit}
                      updateCommentLocally={updateCommentLocally}
                      updateLike={updateLike}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                  <div className="replies">
                    {comment &&
                      comment?.replies.map((reply) =>
                        reply.status === "accepted" ? (
                          <CommentReply
                            key={reply._id}
                            comment={reply}
                            isEditComment={isEditComment}
                            setIsEditComment={setIsEditComment}
                            editCommentId={editCommentId}
                            handleRemoveComment={handleRemoveComment}
                            handleEdit={handleEdit}
                            updateCommentLocally={updateCommentLocally}
                            updateLike={updateLike}
                            handleSubmit={handleSubmit}
                          />
                        ) : (
                          ""
                        )
                      )}
                  </div>
                  <ReplyForm
                    commentsId={comment?._id}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </div>
            ) : (
              ""
            )
          )}
          <button className="popup_close" onClick={() => show(false)}>
            show less comments
          </button>
        </div>
      )}
      <button onClick={() => show(false)} className="blog_close">
        x
      </button>
    </div>
  );
};

export default React.memo(BlogPopup);
