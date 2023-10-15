import { useState, useContext } from "react";
import { createComment } from "../../../../utils/blog-api";
import { notifyError } from "../../../Notify";
import NotificationPopup from "../../../HelperComponents/NotificationPopup";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AppContext, useGlobal } from "../../../../contexts/AppContext";
import { useAuth } from "../../../../contexts/AuthContext";
const CommentForm = ({ blogId, setComments }) => {
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState(null); // State for the notification
  const { setNotificationPopup } = useContext(AppContext)
  const { isBtnLoading, setButtonLoading } = useGlobal();
  const { userData } = useAuth()
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
      id: blogId,
    };
    try {
      setButtonLoading("postComment", true)
      const res = await createComment(blogId, commentData)
      if (res.status === 201) {
        setComment("")
        setComments((prev) => [res.data.comment, ...prev])
        userData.role !== "admin" &&
          setNotificationPopup({
            message: "Your comment has been submitted for review.",
            duration: 3000, // Duration in milliseconds
            icon: <IoMdCheckmarkCircle />,
          });
      }

      if (res.status === 401) {
        notifyError(res.message)
      }
    } catch (err) {
      setButtonLoading("postComment", false)
      if (err.response && err.response.status === 401) {
        console.log(err)
      } else {
        console.log(err)
      }
    } finally {
      setButtonLoading("postComment", false)
    }
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
        <button disabled={isBtnLoading['postComment']} type='submit' className='submit-button'>
          {isBtnLoading['postComment'] ? "Post..." : "Post"}
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
