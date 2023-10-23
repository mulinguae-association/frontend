import React from 'react'
import EllipsisMenu from '../EllipsisMenu';
import UpdateComment from './UpdateComment';
import InteractionComponent from '../interaction/InteractionComments';
import { formatRelativeTime } from '../../../HelperComponents/RelativeDate';
import { useAuth } from '../../../../contexts/AuthContext';

const CommentReply = ({
  comment,
  editCommentId,
  handleRemoveComment,
  handleEdit,
  updateCommentLocally,
  updateLike,
  isEditComment,
  setIsEditComment,
}) => {
  const { userData, isAuth } = useAuth();
  return (
    <div className='nested_comments_container'>
      <img
        src={comment.postedBy?.profileImage || "/images/fallBackUser.png"}
        alt='personal avatar'
        onError={(e) => {
          e.target.src = "/images/fallBackUser.png";
        }}
      />
      <div
        style={
          isEditComment && editCommentId._id === comment._id
            ? { width: "100%" }
            : { width: "fit-content" }
        }
        key={comment._id}
        className='nested_comments'
      >
        {isAuth && (comment.postedBy._id === userData?.userId || userData?.role === "admin") && (
          <EllipsisMenu
            handleDelete={() => handleRemoveComment(comment._id)}
            handleEdit={(state) => handleEdit(comment, state)}
          />
        )}
        {isEditComment && editCommentId._id === comment._id ? (
          <UpdateComment
            editCommentId={comment._id}
            comments={comment}
            setIsEditComment={setIsEditComment}
            initialValue={comment?.content}
            updateCommentLocally={updateCommentLocally}
          />
        ) : (
          <>
            <div className='comment_author'>@{comment.postedBy?.name}</div>
            <div>{comment?.content}</div>
            <span>{formatRelativeTime(comment.createdAt)}</span>
            <InteractionComponent modelType='comment' reply={comment} updateLike={updateLike} />
          </>
        )}
      </div>
    </div>
  );
}

export default CommentReply