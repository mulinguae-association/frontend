import React, { useContext, useState } from "react";
import "./Blogs.scss";
import CommentForm from "./CommentForm";
import BlogPopup from "./BlogPopup";
import { notifyError, notifySuccess } from "../../Notify";
import { handleReplySubmit, refuseComment, removeBlogPost } from "../../../utils/blog-api";
import { useCommentEditState } from "../../HelperComponents/useCommentEditState";
import "./comment.scss"
import { IoMdCheckmarkCircle } from "react-icons/io";
import NotificationPopup from "../../HelperComponents/NotificationPopup";
import { AppContext } from "../../../contexts/AppContext";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import CommentsSection from "./CommentsSection";

const BlogPost = ({ blog, isAdmin, setAcceptedPosts }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [comments, setComments] = useState(blog.comments);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { notificationPopup, setNotificationPopup } = useContext(AppContext)
  const {
    isEditComment,
    handleEdit,
    setIsEditComment,
    editCommentId,
  } = useCommentEditState();

  // Functions
  const updateCommentLocally = (commentId, updatedContent) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, status: updatedContent };
        } else if (comment.replies && comment.replies?.length > 0) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply._id === commentId) {
              return { ...reply, status: updatedContent };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        } else {
          return comment;
        }
      });
    });
  };

  const clearReplyContent = (commentId) => {
    setReplyContent((prevReplyContent) => ({
      ...prevReplyContent,
      [commentId]: "",
    }));
  };

  const handleRemoveComment = async (commentId) => {
    try {
      await refuseComment(commentId).then((res) => {
        if (res.status === 200) {
          setComments((prev) => {
            const updatedComments = prev.filter((comment) => comment._id !== commentId);
            updatedComments.forEach((comment) => {
              comment.replies = comment.replies.filter((reply) => reply._id !== commentId);
            });
            return updatedComments;
          });
        } else {
          console.log("error refusing comment");
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRemoveBlogPost = async (blogId) => {
    try {
      setIsDeleting(true);
      await removeBlogPost(blogId);
      setAcceptedPosts((prevBlogs) =>
        prevBlogs.filter((blog) => blog._id !== blogId)
      );
      notifySuccess("Successfully deleted blog post");
    } catch (err) {
      notifyError("Failed deleting blog post");
      console.log(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (parentCommentId) => {
    try {
      if (replyContent.trim() !== "") {
        const response = await handleReplySubmit(
          replyContent,
          blog._id,
          parentCommentId
        );

        if (response.status === 201) {
          setReplyContent("");
          setNotificationPopup({
            message: "Your comment has been submitted for review.",
            icon: <IoMdCheckmarkCircle />,
          });
        } else {
          notifyError("Failed sending reply comment");
          console.error(response.error);
        }
      }
    } catch (err) {
      notifyError("Failed creating your comment");
      console.error(err);
    }
  };

  const checkStatus = comments[0]?.status === "accepted";

  return (
    <article className="blog-post">
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} setShowFullContent={setShowFullContent} />
      <CommentsSection
        comments={comments}
        setComments={setComments}
        showAllComments={showAllComments}
        setShowAllComments={setShowAllComments}
        checkStatus={checkStatus}
        handleRemoveComment={handleRemoveComment}
        isEditComment={isEditComment}
        setIsEditComment={setIsEditComment}
        editCommentId={editCommentId}
        handleEdit={handleEdit}
        updateCommentLocally={updateCommentLocally}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        handleSubmit={handleSubmit}
      />

      {/* Delete Blog Post Button */}
      <button
        onClick={() => handleRemoveBlogPost(blog._id)}
        className="remove-button"
      >
        {isDeleting ? "Deleting..." : "Delete Post"}
      </button>

      {/* Comment Form */}
      <CommentForm blogId={blog._id} />
      {/* Notification Popup */}
      {notificationPopup && (
        <NotificationPopup
          message={notificationPopup?.message}
          duration={notificationPopup?.duration}
          setNotification={setNotificationPopup}
        />
      )}

      {/* Blog Popup */}
      {showFullContent && <BlogPopup show={setShowFullContent} showFullContent={showFullContent} blog={blog} />}
      {showAllComments && (
        <BlogPopup
          show={setShowAllComments}
          showAllComments={showAllComments}
          blog={blog}
          comments={comments}
          handleSubmit={handleSubmit}
          replyContent={replyContent}
          setReplyContent={setReplyContent}
          handleRemoveComment={handleRemoveComment}
          clearReply={clearReplyContent}
          handleEdit={handleEdit}
          updateCommentLocally={updateCommentLocally}
        />
      )}
    </article>
  );
};

export default React.memo(BlogPost);
