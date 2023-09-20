import { useState, useContext } from "react";
import { createComment } from "../../../utils/blog-api";
import { notifyError } from "../../Notify";
import NotificationPopup from "../../HelperComponents/NotificationPopup";
import { IoMdCheckmarkCircle } from "react-icons/io";
// import "./commentStyle.css";
import { AppContext } from "../../../contexts/AppContext";
const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState(null); // State for the notification
  const { setNotificationPopup } = useContext(AppContext)
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
      id: blogId,
    };
    createComment(blogId, commentData).then((response) => {
      if (response.status === 201) {
        setComment("")
        // notifySuccess("Successfully created your comment");
        setNotificationPopup({
          message: "Your comment has been submitted for review.",
          duration: 3000, // Duration in milliseconds
          icon: <IoMdCheckmarkCircle />, // Icon to display
        });
      } else {
        notifyError("Failed creating your comment");
        console.error(response.error);
      }
    }).catch((err) => {
      notifyError("Failed creating your comment");
      console.error(err);
    });
  };

  return (
    <>
      <form onSubmit={handleCommentSubmit} className='comment-form'>
        <textarea
          placeholder='Write your comment'
          value={comment}
          rows='4'
          onChange={(e) => setComment(e.target.value)}
          className='textarea'
          required></textarea>
        <button type='submit' className='submit-button'>
          Post
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
