// Comment.js
import React from 'react';
import EllipsisMenu from '../EllipsisMenu';
import { formatRelativeTime } from '../../../HelperComponents/RelativeDate';
import UpdateComment from './UpdateComment';
import InteractionComponent from '../interaction/InteractionComments';
import { useAuth } from '../../../../contexts/AuthContext';

const Comment = ({
  comment,
  editCommentId,
  handleRemoveComment,
  handleEdit,
  updateCommentLocally,
  updateLike,
  isEditComment,
  setIsEditComment,
}) => {
  const { userData, isAuth } = useAuth()
  return (
    <div>
      {isAuth && (comment.replies.postedBy?._id === userData?.userId || userData?.role === "admin") && (
        <EllipsisMenu
          handleDelete={() => handleRemoveComment(comment?._id)}
          handleEdit={(state) => handleEdit(comment.postedBy._id, state)}
        />
      )}
      <div className='comment_head'>
        <h2>@{comment.postedBy?.name}</h2>
        <span className='comment_date'>{formatRelativeTime(comment?.createdAt)}</span>
      </div>
      {isEditComment && editCommentId === comment.postedBy._id ? (
        <UpdateComment
          editCommentId={comment._id}
          comments={comment}
          initialValue={comment?.content}
          setIsEditComment={setIsEditComment}
          isEditComment={isEditComment}
          updateCommentLocally={updateCommentLocally}
        />
      ) : (
        <div className="parent_comment">
          <img
            src={
              comment.postedBy?.profileImage
                ? comment.postedBy?.profileImage
                : '/images/fallBackUser.png'
            }
            alt='personal avatar'
            onError={(e) => {
              e.target.src = '/images/fallBackUser.png';
            }}
          />
          <p className='comment_content'>{comment?.content}</p>
          <InteractionComponent modelType='comment' reply={comment} updateLike={updateLike} />
        </div>
      )}
    </div>
  );
};

export default Comment;
