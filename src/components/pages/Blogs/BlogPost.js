import React, { useState, useEffect } from "react";
import "./Blogs.scss";
import CommentForm from "./comments/CommentForm";
import BlogPopup from "./BlogPopup";
import "./comments/comment.scss"
import { useGlobal } from "../../../contexts/AppContext";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import CommentsSection from "./comments/CommentsSection";
import { useAuth } from "../../../contexts/AuthContext";
import InteractionComponent from "./interaction/InteractionComments";
import ConfirmationModal from "../../ConfirmationModal";
import { useRemoveBlogMutation } from "../../../apis/mutations/blogs-mutations";
import { detectLanguage } from "../../../utils/detectLanguage";

const BlogPost = ({ blog }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const { isBtnLoading } = useGlobal();
  const { userData, isAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { comments } = blog;
  useEffect(() => {
    if (showAllComments || showFullContent) {
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling on the body
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAllComments, showFullContent]);

  const { mutate: refuseBlog } = useRemoveBlogMutation(setShowModal);
  const handleRemoveBlogPost = async (blogId) => {
    refuseBlog(blogId)
  };

  const checkStatus = comments[0]?.status === "accepted";

  // check language to change style and direction
  const lang = detectLanguage(blog.content.slice(0, 25) || blog.title[0] || blog.subTitle[0] || '')
  const ArUR = ["Ar", "Ur"].includes(lang);

  return (
    <article style={ArUR ? { direction: "rtl" } : { direction: "ltr" }} className="blog-post">
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} ArUR={ArUR} setShowFullContent={setShowFullContent} />
      <CommentsSection
        comments={comments}
        showAllComments={showAllComments}
        setShowAllComments={setShowAllComments}
        checkStatus={checkStatus}
        blogId={blog._id}
      />
      {showAllComments && <div className="overlay"></div>}
      {/* Delete Blog Post Button */}
      {
        (isAuth && (blog.authorId === userData?.userId || userData?.role === "admin")) &&
        <button
          style={ArUR ? { left: "15px", right: "unset" } : { left: "unset", right: "15px" }}
          onClick={() => setShowModal(true)}
          className="remove-button"
          disabled={isBtnLoading['RemoveBlogPost']}
        >
          x
        </button>
      }

      {/* Comment Form */}
      <CommentForm blogId={blog._id} />
      <div className="blogs_interaction">
        <InteractionComponent
          modelType="blog"
          reply={blog}
        />
      </div>
      {
        showFullContent &&
        <BlogPopup show={setShowFullContent}
          showFullContent={showFullContent}
          blog={blog}
        />
      }
      {
        showAllComments && (
          <BlogPopup
            show={setShowAllComments}
            showAllComments={showAllComments}
            blog={blog}
            comments={comments}

          />
        )
      }
      {
        showModal &&
        <ConfirmationModal
          message={`Are you sure you want to delete this Post?`}
          onConfirm={() => handleRemoveBlogPost(blog._id)}
          onCancel={() => setShowModal(false)}
          isLoading={isBtnLoading['RemoveBlogPost']}
        />
      }
    </article >
  );
};

export default React.memo(BlogPost);
