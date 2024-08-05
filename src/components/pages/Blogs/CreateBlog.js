import React, { useEffect, useState } from "react";
import TextEditor from "../../../TextEditor";
import "./Blogs.scss";
import { submitBlogPost } from "../../../apis/blog-api";
import { notifyError, notifySuccess } from "../../Notify";
import NotificationPopup from "../../HelperComponents/NotificationPopup";
import { useAuth } from "../../../contexts/AuthContext";
import { useBlogPosts } from "../../../contexts/BlogsContext";
import InputField from "../../HelperComponents/InputField";
import sanitizeHtml from "../../../utils/sanitizeHtml";
import logError from "../../../utils/logError";
import { useMutation, useQueryClient } from "react-query";
import i18n from "../../../i18n";
import { useNavigate } from "react-router";
import handleError from "../../../utils/handleError";

const CreateBlog = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState(""); // New subtitle state
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(false);
  const { acceptedPosts, postsToDisplay } = useBlogPosts();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const avatar = userData?.profileImage;

  useEffect(() => {
    if (!userData) navigate(`/${i18n.language}/login`);
  }, [userData, navigate])
  // Function to toggle between preview and edit mode
  const togglePreview = () => {
    if (title !== "" && content !== "") {
      setPreview(!preview);
    } else if (content === "") {
      alert("Please write blog content.");
    }
    alert("Please write the title of the blog.");

  };

  // Function to render content based on preview state
  const renderContent = () => {
    if (preview && content.length > 1) {
      return (
        <>
          <h1>{title}</h1>
          <h2>{subtitle}</h2> {/* Display subtitle */}
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}></div>
        </>
      );
    }
    return <TextEditor content={content} setContent={setContent} />;

  };

  // Function to render the preview/edit button
  const renderPreviewButton = () => {
    return (
      <button
        style={{ zIndex: 99 }}
        className="preview-button"
        type="button"
        onClick={togglePreview}
      >
        {preview ? "Edit" : "Preview"}
      </button>
    );
  };

  // Function to handle form submission
  const AddBlogMutation = useMutation((newPost) => submitBlogPost(newPost),
    {
      onSuccess: (data) => {
        if (userData.role === "admin") {
          queryClient.setQueryData(['acceptedPosts', postsToDisplay], [data.blogPost, ...acceptedPosts]);
          notifySuccess("Successfully submitted blog post");
        } else {
          setNotification(true);
        }
      },
      onError(err) {
        notifyError(handleError(err))
      }
    }
  )
  const queryClient = useQueryClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      AddBlogMutation.mutate({ title, subtitle, content, avatar });
    } catch (error) {
      notifyError(error.message)
      logError("Error submitting blog post:", error);
    } finally {
      setIsSubmitting(false);
      setContent("");
      setTitle("");
      setSubtitle("");
    }

    if (!preview) {
      if (title.trim() === "" || content.trim() === "") {
        // Prevent submission if either the title or content is empty
        alert("Please fill in both the title and content fields.");
      } else {
        // Perform the submission logic here
        // For example, you can send the data to a server or update the state
      }
    }
  };

  return (
    <main className="create_blogs">
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Create A <span className="special">Blog</span></h1>
          {!preview && (
            <div className="titles">
              <InputField
                className="input-field"
                label="Blog Title"
                type="text"
                placeholder="Write your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <InputField
                className="input-field"
                label="Blog Subtitle"
                type="text"
                placeholder="Write your blog subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          )}
          {renderContent()}
          <div className="form_btns">
            <button className="submit-button" type="submit">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            {renderPreviewButton()}
          </div>
        </form>
        {notification && (
          <NotificationPopup
            message={"Your Blog has been submitted for review."}
            setNotification={setNotification}
          />
        )}
      </div>
    </main>
  );
};

export default CreateBlog;
