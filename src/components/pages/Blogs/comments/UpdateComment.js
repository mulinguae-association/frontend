import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { updatedComment } from '../../../../utils/blog-api';
import { notifyError, notifySuccess } from '../../../Notify';
import "./UpdateComment.scss";
import { BiSend } from 'react-icons/bi';
import { useAuth } from '../../../../contexts/AuthContext';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useContext } from 'react';
import { AppContext } from '../../../../contexts/AppContext';
import logError from '../../../../utils/logError';

const UpdateComment = ({ editCommentId, initialValue, updateCommentLocally, setIsEditComment, setComments }) => {
  const { userData } = useAuth()
  const [value, setValue] = useState(initialValue);
  const { setNotificationPopup } = useContext(AppContext)

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleUpdateComment = async (e) => {
    e.preventDefault()
    if (value.trim() === initialValue.trim()) {
      notifyError("No changes were made!")
      return;
    }
    const requestedBody = {
      content: value
    }
    const isAdmin = userData.role === "admin";

    try {
      const res = await updatedComment(editCommentId, requestedBody)
      if (res.status === 201) {
        isAdmin ?
          notifySuccess("Successfully updated comment")
          : setNotificationPopup({
            message: "Your comment has been submitted for review.",
            duration: 3000, // Duration in milliseconds
            icon: <IoMdCheckmarkCircle /> // Icon to display
          });
        updateCommentLocally(editCommentId, value, isAdmin ? "accepted" : "pending");
        setIsEditComment(false)
      } else {
        notifyError("Failed updating comment") // Corrected typo
      }
    } catch (err) {
      logError(err);
      notifyError("Failed updating comment");
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdateComment(e);
    }
  };

  return (
    <form onSubmit={handleUpdateComment} className='update_form'>
      <textarea
        ref={textareaRef}
        className='custom_textarea'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        required
      />
      <div className='update_btns'>
        <button onClick={() => setIsEditComment(false)}>cancel</button>
        <button type='submit'>
          <BiSend size={20} />
        </button>
      </div>
    </form>
  )
}

export default UpdateComment;
