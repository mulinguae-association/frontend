import { useState } from "react";
import { notifyError } from "../../../Notify";
import { useGlobal } from "../../../../contexts/AppContext";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCreateCommentMutation } from "../../../../apis/mutations/blogs-mutations";
const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const { isBtnLoading } = useGlobal();
  const { userData } = useAuth();
  const { mutate: createCommentMutation } = useCreateCommentMutation();
  const buttonKey = `postComment_${blogId}`
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: comment,
      id: blogId,
      parentComment: null,
      replies: [],
      status: "accepted",
      likes: [],
      unlikes: [],
      loves: [],
      postedBy: userData
    };
    if (comment === "") {
      notifyError("Comment cannot be empty.");
      return;
    }
    await createCommentMutation({ blogId, commentData });
    setComment("");
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
          onKeyDown={handleKeyPress}
        ></textarea>
        <button disabled={isBtnLoading[buttonKey]} type='submit' className='submit-button button-font'>
          {isBtnLoading[buttonKey] ? "Post..." : "Post"}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
