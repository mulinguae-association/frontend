import React, { useRef, useState } from "react";
import TextEditor from "../../../TextEditor";
import "./Blogs.scss";
import { notifyError } from "../../Notify";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../HelperComponents/InputField";
import sanitizeHtml from "../../../utils/sanitizeHtml";
import logError from "../../../utils/logError";
import i18n from "../../../i18n";
import { useAddBlogMutation } from "../../../apis/mutations/blogs/createBlog";
import { useGlobal } from "../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
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
  const editorRef = useRef(null)
  const avatar = userData?.profileImage;
  const { t } = useTranslation("pages/blogs");
  const isRtl = ["ar", "ur"].includes(i18n.language);
  // Function to toggle between preview and edit mode
  const togglePreview = () => {
    if (formState.title === "" || formState.content === "") {
      notifyError("Please fill in both the title and content fields.");
      return;
    }
    setFormState(prevState => ({ ...prevState, preview: !prevState.preview }));
  };
  // Function to render content based on preview state
  const renderContent = () => {
    if (formState.preview) {
      return (
        <>
          <h1>{formState.title}</h1>
          {formState.subtitle && <h2>{formState.subtitle}</h2>}
          <div className="preview-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(formState.content) }}></div>
        </>
      );
    }
    return <TextEditor
      setFormState={setFormState}
      editorRef={editorRef}
      value={formState.content} />;
  };

  // Function to handle form submission
  const { mutate: addBlogMutation } = useAddBlogMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.preview) {
      if (formState.title.trim() === "" || formState.content === "") {
        notifyError("Please fill in both the title and content fields.");
        return;
      }
    }

    try {
      await addBlogMutation({
        title: formState.title,
        subtitle: formState.subtitle,
        content: formState.content,
        avatar
      });
      setFormState({ title: "", subtitle: "", content: "", preview: false });
      editorRef.current.commands.clearContent()
    } catch (error) {
      notifyError(error.message);
      logError("Error submitting blog post:", error);
    }
  };

  return (
    <main className="create_blogs">
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>{t("createABlog.name")} <span className="special">{t("createABlog.special")}</span></h1>
          {!formState.preview && (
            <div className="titles">
              <InputField
                style={isRtl ? { paddingRight: "15px" } : { paddingLeft: "15px" }}
                className="input-field"
                label="Blog Title"
                type="text"
                placeholder={t("titlePlaceholder")}
                value={formState.title}
                onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <InputField
                style={isRtl ? { paddingRight: "15px" } : { paddingLeft: "15px" }}
                className="input-field"
                label="Blog Subtitle"
                type="text"
                placeholder={t("subTitlePlaceholder")}
                value={formState.subtitle}
                onChange={(e) => setFormState(prev => ({ ...prev, subtitle: e.target.value }))}
              />
            </div>
          )}
          {renderContent()}
          <div className="form_btns">
            <button className="submit-button" type="submit">
              {isBtnLoading["addBlogBtn"] ? 'Submitting...' : t("submitBtn")}
            </button>
            <button
              style={{ zIndex: 99 }}
              className="preview-button"
              type="button"
              onClick={togglePreview}
            >
              {formState.preview ? t("editBtn") : t("previewBtn")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateBlog;
