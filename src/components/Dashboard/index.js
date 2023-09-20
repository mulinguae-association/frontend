import React, { useState, useEffect } from 'react';
import "./Dashboard.scss"
import "../pages/Teachers"
import { createTeacher } from '../../utils/apiUtility';
import { notifySuccess, notifyError } from '../Notify';
import { acceptBlogPost, acceptComment, fetchPendingPosts, fetchPendingComments, refuseComment, removeBlogPost } from "../../utils/blog-api";
import TeachersController from './TeachersController';
import BlogsController from './BlogsController';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingComments, setPendingComments] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);


  const handleFormSubmit = async (e, formState, setFormState) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('firstName', formState.firstName);
    formData.append('lastName', formState.lastName);
    formData.append('email', formState.email);
    formData.append('jobBrief', formState.jobBrief);
    formData.append('aboutTeacher', formState.aboutTeacher);
    formData.append('telephone', formState.telephone); // Add telephone to formData
    formData.append('teaching_philosophy', formState.teaching_philosophy);
    formData.append('career_summary', formState.career_summary);
    formData.append('teaching_methods', formState.teaching_methods);
    formData.append('qualification_cert', formState.qualification_cert);
    formData.append('teacher_collaboration', formState.teacher_collaboration);
    formData.append('classroom_management', formState.classroom_management);
    formData.append('behavior_management', formState.behavior_management);
    formData.append('additional_info', formState.additional_info);
    formData.append('image', formState.selectedImage);

    try {
      const res = await createTeacher(formData);
      if (res.success) {
        notifySuccess("Successfully added teacher");
        setFormState({
          firstName: '',
          lastName: '',
          email: '',
          jobBrief: '',
          aboutTeacher: '',
          telephone: '',
          teaching_philosophy: '',
          career_summary: '',
          teaching_methods: '',
          qualification_cert: '',
          teacher_collaboration: '',
          classroom_management: '',
          behavior_management: '',
          additional_info: '',
          selectedImage: null,
        });
      } else {
        notifyError("Error adding teacher. Please try again.");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchPendingData = async () => {
      try {
        const data = await fetchPendingPosts();
        setPendingPosts(data)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPendingData();
  }, []);

  const handleAccept = async (blogId) => {
    try {
      await acceptBlogPost(blogId);
      setPendingPosts((prevPosts) =>
        prevPosts.filter((blog) => blog._id !== blogId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRefuse = async (blogId) => {
    try {
      await removeBlogPost(blogId);
      setPendingPosts((prevPosts) =>
        prevPosts.filter((blog) => blog._id !== blogId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    try {
      const fetchPendingData = async () => {
        const data = await fetchPendingComments()
        setPendingComments(data)
      }
      fetchPendingData()
    } catch (err) {
      console.log(err.message)
    }
  }, [])

  const handleAcceptComment = async (commentId) => {
    console.log(commentId);
    try {
      await acceptComment(commentId);
      setPendingComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRefuseComment = async (commentId) => {
    try {
      await refuseComment(commentId).then((res) => {
        console.log(res)
        if (res.status === 200) {
          setPendingComments((prev) =>
            prev.filter((comment) => comment._id !== commentId)
          );
        } else {
          console.log("error refusing comment")
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="page_content dashboard">
      <div className='container'>
        <TeachersController
          handleFormSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
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
}

export default Dashboard;
