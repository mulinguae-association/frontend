import React, { useEffect, useRef, useState } from 'react';
import EllipsisMenu from '../EllipsisMenu';
import { formatRelativeTime } from '../../../HelperComponents/RelativeDate';
import UpdateComment from './UpdateComment';
import InteractionComponent from '../interaction/InteractionComments';
import { useAuth } from '../../../../contexts/AuthContext';
import { isTextTruncated } from '../../../../utils/isTextTruncated';

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
  const { userData, isAuth } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        setIsTruncated(isTextTruncated(contentRef.current));
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [comment.content]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='comment_info'>
      {isAuth && (comment.replies?.postedBy?._id === userData?.userId || userData?.role === "admin") && (
        <EllipsisMenu
          handleDelete={() => handleRemoveComment(comment?._id)}
          handleEdit={(state) => handleEdit(comment, state)}
        />
      )}
      <div className='comment_head'>
        <div className='comment_author_container'>
          <img
            width="40px"
            height="40px"
            src={
              comment.postedBy?.profileImage
                ? comment.postedBy?.profileImage
                : '/images/fallBackUser.png'
            }
            alt='personal avatar'
            onError={(e) => {
              e.target.src = '/images/fallBackUser.png';
            }}
            loading='lazy'
          />
          <h2>@{comment.postedBy?.name}</h2>
        </div>
        <span className='comment_date'>{formatRelativeTime(comment?.createdAt)}</span>
      </div>
      {
        isEditComment && (editCommentId.postedBy._id === comment.postedBy._id && editCommentId._id === comment._id) ? (
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
            <div className={`comment_content_container`}>
              <p ref={contentRef} className={`comment_content ${isExpanded ? 'expanded' : 'truncated'}`}>{comment?.content}</p>
              {isTruncated && (
                <button className='read-more-button' onClick={toggleReadMore}>
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            <InteractionComponent modelType='comment' reply={comment} updateLike={updateLike} />
          </div>
        )
      }
    </div >
  );
};

export default Comment;
