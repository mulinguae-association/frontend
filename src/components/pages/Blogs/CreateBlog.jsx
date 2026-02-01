import React, { useEffect, useRef, useState } from "react";
import TextEditor from "../../../TextEditor";
import "./Blogs.scss";
import { notifyError } from "../../Notify";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import InputField from "../../HelperComponents/InputField";
import sanitizeHtml from "../../../utils/sanitizeHtml";
import logError from "../../../utils/logError";
import i18n from "../../../i18n";
import { useAddBlogMutation } from "../../../apis/mutations/blogs/createBlog";
import { useEditBlogMutation } from "../../../apis/mutations/blogs/editBlog";
import { useGlobal } from "../../../contexts/AppContext.jsx";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
const CreateBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialBlog = location.state?.blog || null;
  const isEditMode = Boolean(initialBlog);
  // State variables
  const [formState, setFormState] = useState({
    title: initialBlog?.title || "",
    subTitle: initialBlog?.subTitle || "",
    content: initialBlog?.content || "",
    preview: false,
  });
  const blogId = initialBlog?._id;

  const { isBtnLoading } = useGlobal();
  const { userData } = useAuth();
  const editorRef = useRef(null);
  const avatar = userData?.profileImage;
  const { t } = useTranslation("pages/blogs");
  const isRtl = ["ar", "ur"].includes(i18n.language);

  useEffect(() => {
    if (isEditMode && initialBlog) {
      setFormState({
        title: initialBlog.title,
        subTitle: initialBlog.subTitle || "",
        content: initialBlog.content,
        preview: false,
      });
    }
  }, [isEditMode, initialBlog]);

  // Function to toggle between preview and edit mode
  const togglePreview = () => {
    if (formState.title === "" || formState.content === "") {
      notifyError("Please fill in both the title and content fields.");
      return;
    }
    setFormState((prevState) => ({
      ...prevState,
      preview: !prevState.preview,
    }));
  };
  // Function to render content based on preview state
  const renderContent = () => {
    if (formState.preview) {
      return (
        <>
          <h1>{formState.title}</h1>
          {formState.subtitle && <h2>{formState.subtitle}</h2>}
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(formState.content),
            }}
          ></div>
        </>
      );
    }
    return (
      <TextEditor
        setFormState={setFormState}
        editorRef={editorRef}
        value={formState.content}
      />
    );
  };

  // Function to handle form submission
  const { mutate: addBlogMutation } = useAddBlogMutation();
  const { mutate: editBlogMutation } = useEditBlogMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.preview) {
      if (formState.title.trim() === "" || formState.content === "") {
        notifyError("Please fill in both the title and content fields.");
        return;
      }
    }

    try {
      if (isEditMode && blogId) {
        await editBlogMutation({
          id: blogId,
          title: formState.title,
          subTitle: formState.subTitle,
          content: formState.content,
          avatar,
        });
      } else {
        await addBlogMutation({
          title: formState.title,
          subTitle: formState.subTitle,
          content: formState.content,
          avatar,
        });
      }
      setFormState({ title: "", subTitle: "", content: "", preview: false });
      editorRef.current.commands.clearContent();
      navigate(`/${i18n.language}/pages/blogs`); // Redirect to blog list after submit
    } catch (error) {
      notifyError(error.message);
      logError("Error submitting blog post:", error);
    }
  };

  return (
    <main className="create_blogs">
      <div className="container">
        <form className="form-container" onSubmit={handleSubmit}>
          <h1>
            {isEditMode ? t("editBlog.name") : t("createABlog.name")}
            <span className="special">{t("createABlog.special")}</span>
          </h1>
          {!formState.preview && (
            <div className="titles">
              <InputField
                style={
                  isRtl ? { paddingRight: "15px" } : { paddingLeft: "15px" }
                }
                className="input-field"
                label="Blog Title"
                type="text"
                placeholder={t("titlePlaceholder")}
                value={formState.title}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <InputField
                style={
                  isRtl ? { paddingRight: "15px" } : { paddingLeft: "15px" }
                }
                className="input-field"
                label="Blog Subtitle"
                type="text"
                placeholder={t("subTitlePlaceholder")}
                value={formState.subTitle}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    subTitle: e.target.value,
                  }))
                }
              />
            </div>
          )}
          {renderContent()}
          <div className="form_btns">
            <button className="submit-button" type="submit">
              {isBtnLoading["addBlogBtn"] ? "Submitting..." : t("submitBtn")}
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
