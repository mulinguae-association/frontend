import { useState } from "react";
import { notifyError } from "../../../Notify";
import { useGlobal } from "../../../../contexts/AppContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCreateCommentMutation } from "../../../../apis/mutations/blogs/createComment";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";
const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const { isBtnLoading } = useGlobal();
  const { userData } = useAuth();
  const { mutate: createCommentMutation } = useCreateCommentMutation();
  const buttonKey = `postComment_${blogId}`;
  const { t } = useTranslation("pages/blogs");
  const isAr_Ur = ["ar", "ur"].includes(i18n.language);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
      id: blogId,
      _id: crypto.randomUUID().toString(),
      parentComment: null,
      replies: [],
      status: userData?.role === "admin" ? "accepted" : "pending",
      likes: [],
      unlikes: [],
      loves: [],
      postedBy: userData,
    };

    if (comment === "") {
      notifyError("Comment cannot be empty.");
      return;
    }

    console.log("🚀 ~ handleCommentSubmit ~ commentData:", commentData);
    await createCommentMutation({ blogId, commentData });
    setComment("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };
  return (
    <>
      <form
        style={isAr_Ur ? { direction: "rtl" } : { direction: "ltr" }}
        onSubmit={handleCommentSubmit}
        className="comment-form"
      >
        <textarea
          id="comment-input"
          placeholder={t("parentCommentPlaceholder")}
          value={comment}
          rows="4"
          onChange={(e) => setComment(e.target.value)}
          className="textarea textArea-font"
          onKeyDown={handleKeyPress}
        ></textarea>
        <button
          style={
            isAr_Ur
              ? { borderRadius: "10px 0 0 0" }
              : { borderRadius: "0 10px 0 0" }
          }
          disabled={isBtnLoading[buttonKey]}
          type="submit"
          className="submit-button button-font"
        >
          {isBtnLoading[buttonKey]
            ? `${t("postParentComment")}...`
            : t("postParentComment")}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
