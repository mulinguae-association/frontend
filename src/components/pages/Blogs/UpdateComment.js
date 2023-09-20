import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { updatedComment } from '../../../utils/blog-api';
import { notifyError, notifySuccess } from '../../Notify';
import "./UpdateComment.scss";
import { BiSend } from 'react-icons/bi';

const UpdateComment = ({ editCommentId, initialValue, updateCommentLocally, setIsEditComment }) => {
  console.log(editCommentId)
  const [value, setValue] = useState(initialValue);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleUpdateComment = async (e) => {
    e.preventDefault()
    const requestedBody = {
      content: value
    }

    try {
      const res = await updatedComment(editCommentId, requestedBody)
      console.log(res)
      if (res.status === 201) {
        notifySuccess("Successfully updated comment")
        setIsEditComment(false)
        updateCommentLocally(editCommentId, "pending");
      } else {
        notifyError("Failed updating comment") // Corrected typo
      }
    } catch {
      notifyError("Failed updating comment")
    }
  }

  return (
    <form onSubmit={handleUpdateComment} className='update_form'>
      <textarea
        ref={textareaRef} // Assign the ref to the textarea element
        className='custom_textarea'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button type='submit'>
        <BiSend size={20} />
      </button>
    </form>
  )
}

export default UpdateComment;
