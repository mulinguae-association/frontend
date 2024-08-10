import React, { useState } from 'react'
import { useGlobal } from '../../../../contexts/AppContext';
import { notifyError } from '../../../Notify';
import { useAddReplyMutation } from '../../../../apis/mutations/blogs-mutations';
import i18n from '../../../../i18n';
import { useTranslation } from 'react-i18next';
const ReplyForm = ({ commentsId: parentCommentId, blogId }) => {
  const [replyConetnt, setReplyContent] = useState("");
  const { isBtnLoading } = useGlobal();
  const btnKey = `replyCommentBtn_${parentCommentId}`;
  const isAr_Ur = ["Ar", "Ur"].includes(i18n.language);
  const { t } = useTranslation("pages/blogs");
  const { mutate: handleAddReply } = useAddReplyMutation(setReplyContent);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (replyConetnt == "") {
        notifyError("Comment cannot be empty");
        return;
      }
      handleAddReply({ parentCommentId, blogId, replyConetnt });
    }
  };
  const handleMouseDown = (e) => {
    if (replyConetnt == "") {
      notifyError("Comment cannot be empty");
      return;
    }
    handleAddReply({ parentCommentId, blogId, replyConetnt });

  };
  return (
    <div style={isAr_Ur ? { right: "-12px", direction: "rtl" } : { right: "12px", direction: "ltr" }} className="reply_form">
      <textarea
        className='textArea-font'
        value={replyConetnt}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder={`${t("replyCommentPlaceholder")}...`}
        required
        onKeyDown={handleKeyPress}
      />
      <button style={isAr_Ur ? { borderRadius: "10px 0 0 0" } : { borderRadius: "0 10px 0 0" }} className='button-font' disabled={isBtnLoading[btnKey]} onClick={handleMouseDown}>
        {isBtnLoading[btnKey] ? "Loading..." : t("replyBtn")}
      </button>
    </div>
  )
}

export default ReplyForm