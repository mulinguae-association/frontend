import React, { useRef, useCallback, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./BlogPopup.scss";
import { useCommentEditState } from "../../HelperComponents/useCommentEditState";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import ReplyForm from "./comments/ReplyForm";
import Comment from "./comments/Comment";
import sanitizeHtml from "../../../utils/sanitizeHtml";
import { useTranslation } from "react-i18next";
import SkeletonComment from "../../Skeletons/SkeletonComment";
import ShowMoreRepliesBtn from "./comments/ShowMoreRepliesBtn";
import useLockBodyScroll from "../../useLockBodyScroll.js";

const BlogPopup = ({
  blog,
  show,
  showFullContent,
  showAllComments,
  comments,
  fetchNextPage,
  isFetching,
  hasNextPage,
}) => {
  useLockBodyScroll(show);
  const { userData } = useAuth();
  const { t } = useTranslation("pages/blogs");
  const { isEditComment, handleEdit, setIsEditComment, editCommentId } =
    useCommentEditState();
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastCommentRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setLoading(true); // Set loading to true before fetching
          !isFetching && fetchNextPage().finally(() => setLoading(false)); // Set loading to false after fetching
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasNextPage, fetchNextPage, isFetching],
  );

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
            {comments.map((comment, index) =>
              comment?.status === "accepted" ? (
                <div key={comment._id} className="comments_content">
                  <div className="comment">
                    <div className="comments_content">
                      {/* Display the comment */}
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
                      <ShowMoreRepliesBtn
                        comments={comments}
                        isEditComment={isEditComment}
                        setIsEditComment={setIsEditComment}
                        editCommentId={editCommentId}
                        handleEdit={handleEdit}
                        commentId={comment._id}
                      />
                    </div>
                    <ReplyForm commentsId={comment?._id} blogId={blog._id} />
                  </div>
                </div>
              ) : (
                ""
              ),
            )}

            {loading && (
              <>
                <SkeletonComment />
                <SkeletonComment />
                <SkeletonComment />
              </>
            )}

            {/* Add a ref to the last comment to trigger infinite scroll */}
            <div ref={lastCommentRef}>
              {!hasNextPage && (
                <div className="last_comment">
                  <span className="point"></span>
                  <span>All Comments Loaded</span>
                </div>
              )}
            </div>

            <button
              className="popup_close"
              onClick={() => show(false)}
              aria-label="Close"
            >
              <FaTimes size={18} style={{ verticalAlign: "middle" }} />{" "}
              {t("showLessComments")}
            </button>
          </div>
        )}
        <button
          onClick={() => show(false)}
          className="blog_close"
          aria-label="Close"
        >
          <FaTimes size={22} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(BlogPopup);
