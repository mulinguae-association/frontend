import React, { useState } from 'react'
import { useGlobal } from '../../../../contexts/AppContext';
import { notifyError } from '../../../Notify';
import { useAddReplyMutation } from '../../../../apis/mutations/blogs-mutations';
const ReplyForm = ({ commentsId: parentCommentId, blogId }) => {
  const [replyConetnt, setReplyContent] = useState("");
  const { isBtnLoading } = useGlobal();
  const btnKey = `replyCommentBtn_${parentCommentId}`;
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
    <div className="reply_form">
      <textarea
        className='textArea-font'
        value={replyConetnt}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Write your reply..."
        required
        onKeyDown={handleKeyPress}
      />
      <button className='button-font' disabled={isBtnLoading[btnKey]} onClick={handleMouseDown}>
        {isBtnLoading[btnKey] ? "Loading..." : "Reply"}
      </button>
    </div>
  )
}

export default ReplyForm