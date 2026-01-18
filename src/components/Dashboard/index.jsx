import React, { useState, useEffect } from "react";
import "./Dashboard.scss";
import "../pages/Teachers";
import TeachersController from "./TeachersController";
import BlogsController from "./BlogsController";
import logError from "../../utils/logError";
import { useCreateTeacherMutation } from "../../apis/mutations/teachers/createTeacher";
import { useQueryClient } from "react-query";
import { notifySuccess } from "../../components/Notify";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [pendingComments, setPendingComments] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const defaultFormState = {
    firstName: "",
    lastName: "",
    email: "",
    jobBrief: "",
    aboutTeacher: "",
    telephone: "",
    teaching_philosophy: "",
    career_summary: "",
    teaching_methods: "",
    qualification_cert: "",
    teacher_collaboration: "",
    classroom_management: "",
    behavior_management: "",
    additional_info: "",
    image: null,
  };
  const { mutate: createTeacherMutation } =
    useCreateTeacherMutation(defaultFormState);
  const handleFormSubmit = async (e, formState, setFormState) => {
    e.preventDefault();
    const formData = new FormData();
    // Iterate over keys of formState and append to formData
    Object.entries(formState).forEach(([key, value]) => {
      if (key !== "image") {
        formData.append(key, value);
      }
    });
    formData.append("image", formState.image);
    createTeacherMutation({ formState, setFormState });
  };

  useEffect(() => {
    const fetchPendingData = async () => {
      const { fetchPendingPosts } = await import("../../apis/blog-api");
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
    const { acceptBlogPost } = await import("../../apis/blog-api");
    try {
      await acceptBlogPost(blogId);

      // Remove the approved blog from the pending posts list
      setPendingPosts((prevPosts) =>
        prevPosts.filter((blog) => blog._id !== blogId)
      );

      // Invalidate all accepted posts queries to force a refetch
      // This will make the approved blog appear in the blog list immediately
      queryClient.invalidateQueries({ queryKey: ["acceptedPosts"] });

      // Show success notification
      notifySuccess(
        "Blog post approved and will appear in the blog posts list"
      );
    } catch (error) {
      logError(error.message);
    }
  };

  const handleRefuse = async (blogId) => {
    const { removeBlogPost } = await import("../../apis/blog-api");
    try {
      await removeBlogPost(blogId);
      setPendingPosts((prevPosts) =>
        prevPosts.filter((blog) => blog._id !== blogId)
      );
    } catch (error) {
      logError(error.message);
    }
  };

  useEffect(() => {
    try {
      const fetchPendingData = async () => {
        const { fetchPendingComments } = await import("../../apis/blog-api");
        const data = await fetchPendingComments();
        setPendingComments(data);
      };
      fetchPendingData();
    } catch (err) {
      logError(err.message);
    }
  }, []);

  const handleAcceptComment = async (commentId) => {
    const { acceptComment } = await import("../../apis/blog-api");
    try {
      await acceptComment(commentId);

      // Remove the approved comment from the pending comments list
      setPendingComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
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
    const { refuseComment } = await import("../../apis/blog-api");
    try {
      await refuseComment(commentId).then((res) => {
        if (res.status === 200) {
          setPendingComments((prev) =>
            prev.filter((comment) => comment._id !== commentId)
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
    <main className="page_content dashboard">
      <div className="container">
        <TeachersController handleFormSubmit={handleFormSubmit} />
        <BlogsController
          pendingPosts={pendingPosts}
          pendingComments={pendingComments}
          handleAccept={handleAccept}
          handleRefuse={handleRefuse}
          handleAcceptComment={handleAcceptComment}
          handleRefuseComment={handleRefuseComment}
        />
      </div>
    </main>
  );
};

export default Dashboard;
