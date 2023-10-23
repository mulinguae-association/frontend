import React, { useContext, useState } from "react";
import "./Blogs.scss";
import CommentForm from "./comments/CommentForm";
import BlogPopup from "./BlogPopup";
import { notifyError, notifySuccess } from "../../Notify";
import { handleReplySubmit, refuseComment, removeBlogPost } from "../../../utils/blog-api";
import "./comments/comment.scss"
import { IoMdCheckmarkCircle } from "react-icons/io";
import NotificationPopup from "../../HelperComponents/NotificationPopup";
import { AppContext, useGlobal } from "../../../contexts/AppContext";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import CommentsSection from "./comments/CommentsSection";
import { useAuth } from "../../../contexts/AuthContext";
import InteractionComponent from "./interaction/InteractionComments";
import { useEffect } from "react";

const BlogPost = ({ blog, setAcceptedPosts }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [comments, setComments] = useState(blog.comments);
  const [showAllComments, setShowAllComments] = useState(false);
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const { notificationPopup, setNotificationPopup } = useContext(AppContext);
  const { userData, isAuth } = useAuth();

  useEffect(() => {
    if (showAllComments) {
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling on the body
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAllComments]);
  // Functions
  const updateCommentLocally = (commentId, value, updatedContent) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          return { ...comment, status: updatedContent, content: value };
        } else if (comment.replies && comment.replies?.length > 0) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply._id === commentId) {
              return { ...reply, status: updatedContent, content: value };
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

  const updateLike = (id, { likes, loves, unlikes }) => {
    // Update likes, loves, and unlikes for both comments and blog post
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === id) {
          return { ...comment, likes, loves, unlikes };
        }
        if (comment.replies && comment.replies.length > 0) {
          comment.replies = comment.replies.map((reply) => {
            if (reply._id === id) {
              return { ...reply, likes, loves, unlikes };
            }
            return reply;
          });
        }
        return comment;
      });
    });

    // Update likes, loves, and unlikes for the blog post
    setAcceptedPosts((prevBlogs) => {
      return prevBlogs.map((prevBlog) => {
        if (prevBlog._id === id) {
          return {
            ...prevBlog,
            likes: likes,
            loves: loves,
            unlikes: unlikes,
          };
        }
        return prevBlog;
      });
    });
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
      setButtonLoading("RemoveBlogPost", true);
      const res = await removeBlogPost(blogId)
      if (res && res.message) {
        notifySuccess(res.message)
        setAcceptedPosts((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
      } else {
        notifyError(res.error)
      }
    } catch (err) {
      notifyError("Failed deleting blog post");
      setButtonLoading("RemoveBlogPost", false);
      console.log(err.message);
    } finally {
      setButtonLoading("RemoveBlogPost", false);
    }
  };

  const handleSubmit = async (parentCommentId, replyContent, setReplyContent) => {
    const buttonKey = `replyCommentBtn_${parentCommentId}`
    if (replyContent.trim() !== "") {
      try {
        setButtonLoading(buttonKey, true)
        const res = await handleReplySubmit(
          replyContent,
          blog._id,
          parentCommentId)
        const newComment = res.data?.comment
        if (res && res.status === 201) {
          setReplyContent("");
          const udpatedComments = comments.map((comment) => {
            if (comment._id === parentCommentId) {
              return {
                ...comment, replies: [newComment, ...comment.replies]
              }
            }
            return comment
          })
          setComments(udpatedComments)
          userData.role !== "admin" &&
            setNotificationPopup({
              message: "Your comment has been submitted for review.",
              icon: <IoMdCheckmarkCircle />,
            });
        }
        if (res && res.status === 401) {
          notifyError(res.message)
        } else {
          notifyError(res.error)
        }
      }
      catch (error) {
        setButtonLoading(buttonKey, false)
        if (error.response && error.response.status === 401) {
          notifyError(error.message)
        } else {
          console.log(error)
        }
      } finally {
        setButtonLoading(buttonKey, false)
      }
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
        updateCommentLocally={updateCommentLocally}
        handleSubmit={handleSubmit}
        updateLike={updateLike}
      />
      {showAllComments && <div className="overlay"></div>}
      {/* Delete Blog Post Button */}
      {
        (isAuth && (blog.authorId === userData?.userId || userData?.role === "admin")) &&
        <button
          onClick={() => handleRemoveBlogPost(blog._id)}
          className="remove-button"
          disabled={isBtnLoading['RemoveBlogPost']}
        >
          {isBtnLoading['RemoveBlogPost'] ? "Deleting..." : "x"}
        </button>
      }


      {/* Comment Form */}
      <CommentForm blogId={blog._id} setComments={setComments} />
      <div className="blogs_interaction">
        <InteractionComponent
          modelType="blog"
          reply={blog}
          updateLike={updateLike}
        />
      </div>
      {/* Notification Popup */}
      {
        notificationPopup && (
          <NotificationPopup
            message={notificationPopup?.message}
            setNotification={setNotificationPopup}
          />
        )
      }

      {/* Blog Popup */}
      {showFullContent && <BlogPopup show={setShowFullContent} showFullContent={showFullContent} blog={blog} />}
      {
        showAllComments && (
          <BlogPopup
            show={setShowAllComments}
            showAllComments={showAllComments}
            blog={blog}
            comments={comments}
            handleSubmit={handleSubmit}
            handleRemoveComment={handleRemoveComment}
            updateCommentLocally={updateCommentLocally}
            updateLike={updateLike}
          />
        )
      }
    </article >
  );
};

export default React.memo(BlogPost);
