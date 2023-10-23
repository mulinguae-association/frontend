import React from 'react'
import { useState } from 'react';
import { useGlobal } from '../../../../contexts/AppContext';

const ReplyForm = ({ commentsId, handleSubmit }) => {
  const [replyConetnt, setReplyContent] = useState("");
  const { isBtnLoading } = useGlobal()
  const btnKey = `replyCommentBtn_${commentsId}`
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(commentsId, replyConetnt, setReplyContent);
    }
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
      <button className='button-font' disabled={isBtnLoading[btnKey]} onClick={() => handleSubmit(commentsId, replyConetnt, setReplyContent)}>
        {isBtnLoading[btnKey] ? "Loading..." : "Reply"}
      </button>
    </div>
  )
}

export default ReplyForm