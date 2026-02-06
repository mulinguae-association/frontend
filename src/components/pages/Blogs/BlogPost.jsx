import React, { useState, useEffect } from "react";
import "./Blogs.scss";
import CommentForm from "./comments/CommentForm";
import "./comments/comment.scss";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import BlogHeader from "./BlogHeader";
import ShareButton from "../../UI/ShareButton/index.jsx";
import BlogContent from "./BlogContent";
import CommentsSection from "./comments/CommentsSection";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import InteractionComponent from "./interaction/InteractionComments";
import { useRemoveBlogMutation } from "../../../apis/mutations/blogs/removeBlog";
import { detectLanguage } from "../../../utils/detectLanguage";
import { BiLoaderAlt, BiPencil } from "react-icons/bi";
import {
  getAcceptedComments,
  getRemainingAcceptedReplies,
} from "../../../apis/blog-api";
import { useInfiniteQuery } from "react-query";
import { useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
const BlogPopup = React.lazy(() => import("./BlogPopup"));
const ConfirmationModal = React.lazy(() => import("../../ConfirmationModal"));

const BlogPost = ({ blog }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const { isBtnLoading } = useGlobal();
  const { userData, isAuth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // get accepted comments
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    ["comments", blog?._id],
    ({ pageParam = 1 }) =>
      getAcceptedComments({ blogId: blog?._id, pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.acceptedComments.length
          ? allPages.length + 1
          : undefined;
      },
    },
  );
  const comments = data?.pages.flatMap((page) => page.acceptedComments);
  // Fetch the remaining replies of the last comment
  const lastCommentId = comments && comments.length > 0 && comments[0]._id;

  const { data: lastReplyData } = useInfiniteQuery(
    ["remaining-replies", lastCommentId],
    ({ pageParam = 1 }) =>
      getRemainingAcceptedReplies({
        parentCommentIds: lastCommentId,
        pageParam,
        limit: 1,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.remainingReplies.length
          ? allPages.length + 1
          : undefined;
      },
      enabled: !!lastCommentId, // Enable query only if there's a last comment
    },
  );

  // Extract the last reply
  // const lastReply = lastReplyData?.pages?.[0]?.remainingReplies?.[0];

  const totalComments = data?.pages[0].totalComments;

  useEffect(() => {
    if (showAllComments || showFullContent) {
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [showAllComments, showFullContent]);

  const { mutate: refuseBlog } = useRemoveBlogMutation(setShowModal);
  const handleRemoveBlogPost = async (blogId) => {
    refuseBlog(blogId);
    // clearCache();
  };
  const checkStatus = comments && comments[0]?.status === "accepted";
  // const checkStatus = blog?.status === "accepted";

  // check language to change style and direction
  const lang = detectLanguage(
    blog?.content.slice(0, 25) || blog?.title[0] || blog?.subTitle[0] || "",
  );
  const ArUR = ["ar", "ur"]?.includes(lang);
  const blogUrl = window.location.origin + `/${lang}/pages/blogs/` + blog._id;
  // const blogImage = blog.image || blog.coverImage || blog.thumbnail || "";
  const blogDescription = blog?.subTitle || blog?.content.slice(0, 100);

  return (
    <article
      style={ArUR ? { direction: "rtl" } : { direction: "ltr" }}
      className="blog-post"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BlogHeader blog={blog} />
      </div>
      <BlogContent
        blog={blog}
        ArUR={ArUR}
        setShowFullContent={setShowFullContent}
      />
      <CommentsSection
        lastReplyData={lastReplyData}
        comments={comments}
        lastComment={blog?.lastComment}
        showAllComments={showAllComments}
        setShowAllComments={setShowAllComments}
        totalComments={totalComments}
        checkStatus={checkStatus}
        blogId={blog._id}
      />
      {showAllComments && <div className="overlay"></div>}
      {console.log(blog)}
      {console.log("BlogUserId", blog.userId, "UserDataId", userData?.userId)}
      {/* action Blog Post Buttons */}
      <div className="blog-action-btns">
        <ShareButton
          url={blogUrl}
          title={blog.title}
          description={blogDescription}
          blogId={blog._id}
        />
        {isAuth &&
          (blog.postedBy._id === userData?.userId ||
            userData?.role === "admin") && (
            <>
              <button
                className="edit-button"
                onClick={() =>
                  navigate("/en/pages/blogs/create-new-blog", {
                    state: { blog },
                  })
                }
              >
                <BiPencil size={20} />
              </button>
              <button
                style={
                  ArUR
                    ? { left: "15px", right: "unset" }
                    : { left: "unset", right: "15px" }
                }
                onClick={() => setShowModal(true)}
                className="remove-button"
                disabled={isBtnLoading["RemoveBlogPost"]}
              >
                <FaTrash size={15} />
              </button>
            </>
          )}
      </div>

      {/* Comment Form */}
      <CommentForm blogId={blog._id} />
      <div className="blogs_interaction">
        <InteractionComponent modelType="blog" reply={blog} />
      </div>
      {showFullContent && (
        <React.Suspense
          fallback={<BiLoaderAlt className="spin-loader" color="#fff" />}
        >
          <BlogPopup
            show={setShowFullContent}
            showFullContent={showFullContent}
            blog={blog}
          />
        </React.Suspense>
      )}
      {showAllComments && (
        <React.Suspense
          fallback={
            <div className="blog_overlay">
              <div className="blog_popup">
                <BiLoaderAlt
                  color="green"
                  className="spin-loader"
                  size="50px"
                />
              </div>
            </div>
          }
        >
          <BlogPopup
            show={setShowAllComments}
            showAllComments={showAllComments}
            blog={blog}
            comments={comments}
            fetchNextPage={fetchNextPage}
            isFetching={isFetching}
            hasNextPage={hasNextPage}
          />
        </React.Suspense>
      )}
      {showModal && (
        <React.Suspense
          fallback={<BiLoaderAlt className="spin-loader" color="#fff" />}
        >
          <ConfirmationModal
            message={`Are you sure you want to delete this Post?`}
            onConfirm={() => handleRemoveBlogPost(blog._id)}
            onCancel={() => setShowModal(false)}
            isLoading={isBtnLoading["RemoveBlogPost"]}
          />
        </React.Suspense>
      )}
    </article>
  );
};

export default React.memo(BlogPost);
