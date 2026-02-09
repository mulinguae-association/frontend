import React, { useEffect, useRef, useState } from "react";
import InteractionComponent from "../interaction/InteractionComments";
import { formatRelativeTime } from "../../../HelperComponents/RelativeDate";
import { useAuth } from "../../../../contexts/AuthContext";
import { isTextTruncated } from "../../../../utils/isTextTruncated";
import { useRemoveCommentMutation } from "../../../../apis/mutations/blogs/removeComment";
const EllipsisMenu = React.lazy(() => import("../EllipsisMenu"));
const UpdateComment = React.lazy(() => import("./UpdateComment"));

const CommentReply = ({
  comment,
  editCommentId,
  handleEdit,
  isEditComment,
  setIsEditComment,
}) => {
  const { userData, isAuth } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef(null);
  const { mutate: handleRemoveComment } = useRemoveCommentMutation(
    comment.blogId,
    comment.parentComment,
  );
  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        setIsTruncated(isTextTruncated(contentRef.current));
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [comment?.content]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="nested_comments_container">
      <div
        style={
          isEditComment && editCommentId._id === comment._id
            ? { width: "100%" }
            : { width: "fit-content" }
        }
        key={comment._id}
        className="nested_comments"
      >
        {isAuth &&
          (comment?.postedBy._id === userData?.userId ||
            ["admin", "superadmin"].includes(userData?.role)) && (
            <React.Suspense className="Loading...">
              <EllipsisMenu
                handleDelete={() =>
                  handleRemoveComment({
                    commentId: comment._id,
                    blogId: comment.blogId,
                  })
                }
                handleEdit={(state) => handleEdit(comment, state)}
              />
            </React.Suspense>
          )}
        {isEditComment && editCommentId._id === comment._id ? (
          <UpdateComment
            editComment={comment}
            comments={comment}
            setIsEditComment={setIsEditComment}
            initialValue={comment?.content}
          />
        ) : (
          <>
            <div className="comment_author_container">
              <div className="img_container">
                <img
                  width="30px"
                  height="30px"
                  src={
                    comment?.postedBy?.profileImage ||
                    "/images/fallBackUser.png"
                  }
                  alt="personal avatar"
                  onError={(e) => {
                    e.target.src = "/images/fallBackUser.png";
                  }}
                  loading="lazy"
                />
              </div>
              <div className="comment_author">@{comment?.postedBy?.name}</div>
            </div>
            <div className="">
              <p
                style={!isTruncated ? { margin: 0 } : { marginTop: 0 }}
                ref={contentRef}
                className={`comment_content ${isExpanded ? "expanded" : "truncated"}`}
              >
                {comment?.content}
              </p>
              {isTruncated && (
                <button className="read-more-button" onClick={toggleReadMore}>
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            <span>{formatRelativeTime(comment.createdAt)}</span>
            <InteractionComponent modelType="comment" reply={comment} />
          </>
        )}
      </div>
    </div>
  );
};

export default CommentReply;
