import React from "react";
import "./BlogPopup.scss";
import { useCommentEditState } from "../../HelperComponents/useCommentEditState";
import { useAuth } from "../../../contexts/AuthContext";
import ReplyForm from "./comments/ReplyForm";
import Comment from "./comments/Comment";
import CommentReply from "./comments/CommentReply";
import sanitizeHtml from "../../../utils/sanitizeHtml";
import { useTranslation } from "react-i18next";

const BlogPopup = ({
  blog,
  show,
  showFullContent,
  showAllComments,
  comments,
}) => {
  const { userData } = useAuth();
  const { t } = useTranslation("pages/blogs");
  const { isEditComment, handleEdit, setIsEditComment, editCommentId } =
    useCommentEditState();
  return (
    <div className="blog_overlay">
      <div className="blog_popup">
        {showFullContent && (
          <>
            <h1 className="blog_title">{blog.title}</h1>
            <div
              className="blog_content"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
            />
          </>
        )}
        {showAllComments && (
          <div className="popup_content">
            <div className="comments_header">
              <h1 className="comment_title">
                <span className="special">{blog?.title} </span>
                Comments
              </h1>
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
                        handleEdit={handleEdit}
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
                              handleEdit={handleEdit}
                            />
                          ) : (
                            ""
                          )
                        )}
                    </div>
                    <ReplyForm commentsId={comment?._id} blogId={blog._id} />
                  </div>
                </div>
              ) : (
                ""
              )
            )}
            <button className="popup_close" onClick={() => show(false)}>
              {t("showLessComments")}
            </button>
          </div>
        )}
        <button onClick={() => show(false)} className="blog_close">
          x
        </button>
      </div>
    </div>
  );
};

export default React.memo(BlogPopup);
