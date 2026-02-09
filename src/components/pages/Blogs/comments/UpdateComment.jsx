import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { updatedComment } from "../../../../apis/blog-api";
import { notifyError, notifySuccess } from "../../../Notify";
import "./UpdateComment.scss";
import { BiSend } from "react-icons/bi";
import { useAuth } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import { AppContext } from "../../../../contexts/AppContext";
import logError from "../../../../utils/logError";
import { useUpdateCommentLocally } from "../../../../apis/mutations/blogs/updateComment";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";

const UpdateComment = ({ editComment, initialValue, setIsEditComment }) => {
  const { userData } = useAuth();
  // const { clearCache } = useCache();
  const [value, setValue] = useState(initialValue);
  const { setNotificationPopup } = useContext(AppContext);
  const { t } = useTranslation("pages/blogs");
  const parentComment = editComment.parentComment;
  const updateCommentLocally = useUpdateCommentLocally(
    editComment.blogId,
    parentComment,
  );
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);
  const textareaRef = useRef(null);
  const editCommentId = editComment._id;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (value.trim() === initialValue.trim()) {
      notifyError("No changes were made!");
      return;
    } else if (value.trim() === "") {
      notifyError("Comment cannot be empty!");
      return;
    }
    const requestedBody = {
      content: value,
    };
    const isAdmin = ["admin", "superadmin"].includes(userData.role);
    try {
      const res = await updatedComment(editCommentId, requestedBody);

      if (res.status === 201) {
        isAdmin
          ? notifySuccess("Successfully updated comment")
          : setNotificationPopup({
              message: "Your comment has been submitted for review.",
            });
        updateCommentLocally(
          editCommentId,
          value,
          isAdmin ? "accepted" : "pending",
        );
        setIsEditComment(false);
      } else {
        notifyError("Failed updating comment"); // Corrected typo
      }
    } catch (err) {
      logError(err);
      notifyError("Failed updating comment");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUpdateComment(e);
    }
  };

  return (
    <form onSubmit={handleUpdateComment} className="update_form">
      <textarea
        ref={textareaRef}
        className="custom_textarea"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        required
      />
      <div className="update_btns">
        <button onClick={() => setIsEditComment(false)}>
          {t("cancelBtn")}
        </button>
        <button
          style={isAr_Ur ? { rotate: "180deg" } : { rotate: "0" }}
          type="submit"
        >
          <BiSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default UpdateComment;
