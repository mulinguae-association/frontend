import React, { useEffect, useState } from "react";
import TextEditor from "../../../TextEditor";
import "./Blogs.scss";
import { notifyError } from "../../Notify";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../HelperComponents/InputField";
import sanitizeHtml from "../../../utils/sanitizeHtml";
import logError from "../../../utils/logError";
import i18n from "../../../i18n";
import { useNavigate } from "react-router";
import { useAddBlogMutation } from "../../../apis/mutations/blogs-mutations";
import { useGlobal } from "../../../contexts/AppContext";

const CreateBlog = () => {
  // State variables
  const [formState, setFormState] = useState({
    title: "",
    subtitle: "",
    content: "",
    preview: false
  });
  const { isBtnLoading } = useGlobal();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const avatar = userData?.profileImage;

  useEffect(() => {
    if (!userData) navigate(`/${i18n.language}/login`);
  }, [userData, navigate])
  // Function to toggle between preview and edit mode
  const togglePreview = () => {
    if (formState.title !== "" && formState.content !== "") {
      setFormState({ ...formState, preview: !formState.preview });
    } else if (formState.content === "") {
      notifyError("Please write blog content.");
      return;
    }
    notifyError("Please write the title of the blog.");

  };

  // Function to render content based on preview state
  const renderContent = () => {
    if (formState.preview && formState.content.length > 1) {
      return (
        <>
          <h1>{formState.title}</h1>
          <h2>{formState.subtitle}</h2> {/* Display subtitle */}
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(formState.content) }}></div>
        </>
      );
    }
    return <TextEditor content={formState.content} setFormState={setFormState} />;

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
        {formState.preview ? "Edit" : "Preview"}
      </button>
    );
  };

  // Function to handle form submission
  const { mutate: AddBlogMutation } = useAddBlogMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.preview) {
      if (formState.title.trim() === "" || formState.content === "") {
        notifyError("Please fill in both the title and content fields.");
        return;
      }
    }

    try {
      AddBlogMutation({
        title: formState.title,
        subtitle: formState.subtitle,
        content: formState.content,
        avatar
      });
    } catch (error) {
      notifyError(error.message)
      logError("Error submitting blog post:", error);
    } finally {
      setFormState({ title: "", subtitle: "", content: "", preview: false });
    }
  };

  return (
    <main className="create_blogs">
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>Create A <span className="special">Blog</span></h1>
          {!formState.preview && (
            <div className="titles">
              <InputField
                className="input-field"
                label="Blog Title"
                type="text"
                placeholder="Write your blog title"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })
                }
                required
              />
              <InputField
                className="input-field"
                label="Blog Subtitle"
                type="text"
                placeholder="Write your blog subtitle"
                value={formState.subtitle}
                onChange={(e) => setFormState({ ...formState, subtitle: e.target.value })
                }
              />
            </div>
          )}
          {renderContent()}
          <div className="form_btns">
            <button className="submit-button" type="submit">
              {isBtnLoading["addBlogBtn"] ? 'Submitting...' : 'Submit'}
            </button>
            {renderPreviewButton()}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateBlog;
