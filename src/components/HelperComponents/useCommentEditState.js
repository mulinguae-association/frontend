// useCommentEditState.js (Custom Hook)
import { useState } from 'react';

export function useCommentEditState() {
  const [isEditComment, setIsEditComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);

  // const tokenRes = JSON.parse(localStorage.getItem("token"));
  const handleEdit = (commentId) => {
    setEditCommentId(commentId);
    setIsEditComment(true);
  };

  return { isEditComment, setIsEditComment, setEditCommentId, editCommentId, handleEdit };
}
