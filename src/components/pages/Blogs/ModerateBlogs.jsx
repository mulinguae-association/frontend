import React, { useEffect, useState } from "react";
import BlogsController from "../../Dashboard/BlogsController";
import "./ModerateBlogs.scss";
import { useQueryClient } from "react-query";

const ModerateBlogs = () => {
  const queryClient = useQueryClient();
  const [pendingComments, setPendingComments] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);

  useEffect(() => {
    const fetchPendingData = async () => {
      const { fetchPendingPosts } = await import("../../../apis/blog-api");
      try {
        const data = await fetchPendingPosts();
        setPendingPosts(data);
      } catch (error) {
        logError(error.message);
      }
    };
    fetchPendingData();
  }, []);

  const handleAccept = async (blogId) => {
    const { acceptBlogPost } = await import("../../../apis/blog-api");
    try {
      await acceptBlogPost(blogId);

      // Remove the approved blog from the pending posts list
      setPendingPosts((prevPosts) =>
        prevPosts.filter((blog) => blog._id !== blogId),
      );

      // Invalidate all accepted posts queries to force a refetch
      // This will make the approved blog appear in the blog list immediately
      queryClient.invalidateQueries({ queryKey: ["acceptedPosts"] });

      // Show success notification
      notifySuccess(
        "Blog post approved and will appear in the blog posts list",
      );
    } catch (error) {
      logError(error.message);
    }
  };

  const handleRefuse = async (blogId) => {
    const { removeBlogPost } = await import("../../../apis/blog-api");
    try {
      await removeBlogPost(blogId);
      setPendingPosts((prevPosts) =>
        prevPosts.filter((blog) => blog._id !== blogId),
      );
    } catch (error) {
      logError(error.message);
    }
  };

  useEffect(() => {
    try {
      const fetchPendingData = async () => {
        const { fetchPendingComments } = await import("../../../apis/blog-api");
        const data = await fetchPendingComments();
        setPendingComments(data);
      };
      fetchPendingData();
    } catch (err) {
      logError(err.message);
    }
  }, []);

  const handleAcceptComment = async (commentId) => {
    const { acceptComment } = await import("../../../apis/blog-api");
    try {
      await acceptComment(commentId);

      // Remove the approved comment from the pending comments list
      setPendingComments((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );

      // Invalidate all comments queries to force a refetch
      // This will make the approved comment appear in the comments list immediately
      queryClient.invalidateQueries({ queryKey: ["comments"] });

      // Show success notification
      notifySuccess("Comment approved and will appear in the comments list");
    } catch (error) {
      logError(error.message);
    }
  };

  const handleRefuseComment = async (commentId) => {
    const { refuseComment } = await import("../../../apis/blog-api");
    try {
      await refuseComment(commentId).then((res) => {
        if (res.status === 200) {
          setPendingComments((prev) =>
            prev.filter((comment) => comment._id !== commentId),
          );
        } else {
          logError("error refusing comment");
        }
      });
    } catch (error) {
      logError(error.message);
    }
  };
  return (
    <div>
      <BlogsController
        pendingPosts={pendingPosts}
        pendingComments={pendingComments}
        handleAccept={handleAccept}
        handleRefuse={handleRefuse}
        handleAcceptComment={handleAcceptComment}
        handleRefuseComment={handleRefuseComment}
      />
    </div>
  );
};

export default ModerateBlogs;
