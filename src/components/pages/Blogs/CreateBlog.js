import React, { useState } from "react";
import TextEditor from "../../../TextEditor";
import "./Blogs.scss";
import { submitBlogPost } from "../../../utils/blog-api";
import { notifySuccess } from "../../Notify";
import { AppContext } from "../../../contexts/AppContext";
import { useContext } from "react";
import NotificationPopup from "../../HelperComponents/NotificationPopup";

const CreateBlog = () => {
  // State variables
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState(""); // New subtitle state
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notificationPopup, setNotificationPopup } = useContext(AppContext)
  console.log("cont:" + content, "sub:" + subtitle, "title:" + title)
  // Function to toggle between preview and edit mode
  const togglePreview = () => {
    if (title !== "" && content !== "") {
      setPreview(!preview);
    } else if (content === "") {
      alert("Please write blog content.");
    } else {
      alert("Please write the title of the blog.");
    }
  };

  // Function to render content based on preview state
  const renderContent = () => {
    if (preview && content.length > 1) {
      return (
        <>
          <h1>{title}</h1>
          <h2>{subtitle}</h2> {/* Display subtitle */}
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </>
      );
    } else {
      return <TextEditor content={content} setContent={setContent} />;
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      notifySuccess("Successfully sent blog info")
      const success = await submitBlogPost(title, subtitle, content);
      console.log(success);
      if (success) {
        setNotificationPopup({ message: "Your Blog has been submitted for review." });
        // Reset form fields
        setTitle("");
        setSubtitle("");
        setContent("");
      }
    } catch (error) {
      notifySuccess("Faild sending blog info")
      console.error("Error submitting blog post:", error);
    } finally {
      setIsSubmitting(false)
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
              <input
                className="input-field"
                type="text"
                placeholder="Write your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="text"
                placeholder="Write your blog subtitle" // New subtitle input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)} // Update subtitle state
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
        {notificationPopup && (
          <NotificationPopup
            message={notificationPopup.message}
            setNotification={setNotificationPopup}
          />
        )}
      </div>
    </main>
  );
};

export default CreateBlog;
