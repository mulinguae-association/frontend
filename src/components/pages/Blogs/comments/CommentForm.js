import { useState, useContext } from "react";
import { createComment } from "../../../../utils/blog-api";
import { notifyError } from "../../../Notify";
import NotificationPopup from "../../../HelperComponents/NotificationPopup";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AppContext, useGlobal } from "../../../../contexts/AppContext";
import { useAuth } from "../../../../contexts/AuthContext";
import logError from "../../../../utils/logError";
const CommentForm = ({ blogId, setComments }) => {
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState(null); // State for the notification
  const { setNotificationPopup } = useContext(AppContext)
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const { userData } = useAuth()
  const buttonKey = `postComment_${blogId}`
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
      id: blogId,
    };
    try {
      setButtonLoading(buttonKey, true)
      const res = await createComment(blogId, commentData)
      if (res.status === 201) {
        setComment("")
        setComments((prev) => [res.data.comment, ...prev])
        userData.role !== "admin" &&
          setNotificationPopup({
            message: "Your comment has been submitted for review.",
            duration: 3000, // Duration in milliseconds
            icon: <IoMdCheckmarkCircle />
          });
      }

      if (res.status === 401) {
        notifyError(res.message)
      }
    } catch (err) {
      setButtonLoading(buttonKey, false)
      if (err.response && err.response.status === 401) {
        logError(err)
      } else {
        logError(err)
      }
    } finally {
      setButtonLoading(buttonKey, false)
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };
  return (
    <>
      <form onSubmit={handleCommentSubmit} className='comment-form'>
        <textarea
          id="comment-input"
          placeholder='Write your comment'
          value={comment}
          rows='4'
          onChange={(e) => setComment(e.target.value)}
          className='textarea textArea-font'
          required
          onKeyDown={handleKeyPress}
        ></textarea>
        <button disabled={isBtnLoading[buttonKey]} type='submit' className='submit-button button-font'>
          {isBtnLoading[buttonKey] ? "Post..." : "Post"}
        </button>
      </form>
      {notification && (
        <NotificationPopup
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default CommentForm;
