import React from 'react'
import { useState } from 'react';
import { useGlobal } from '../../../../contexts/AppContext';

const ReplyForm = ({ commentsId, handleSubmit }) => {
  const [replyConetnt, setReplyContent] = useState("");
  const { isBtnLoading } = useGlobal()
  return (
    <div className="reply_form">
      <textarea
        value={replyConetnt}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="Write your reply..."
        required
      />
      <button disabled={isBtnLoading['replyCommentBtn']} onClick={() => handleSubmit(commentsId, replyConetnt, setReplyContent)}>
        {isBtnLoading['replyCommentBtn'] ? "Loading..." : "Submit Reply"}
      </button>
    </div>
  )
}

export default ReplyForm