import React, { useEffect, useRef, useState } from 'react'
import EllipsisMenu from '../EllipsisMenu';
import UpdateComment from './UpdateComment';
import InteractionComponent from '../interaction/InteractionComments';
import { formatRelativeTime } from '../../../HelperComponents/RelativeDate';
import { useAuth } from '../../../../contexts/AuthContext';
import { isTextTruncated } from '../../../../utils/isTextTruncated';

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
    <div className='nested_comments_container'>
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
            <div className='comment_author_container'>
              <div className='img_container'>
                <img
                  width="30px"
                  height="30px"
                  src={comment.postedBy?.profileImage || "/images/fallBackUser.png"}
                  alt='personal avatar'
                  onError={(e) => {
                    e.target.src = "/images/fallBackUser.png";
                  }}
                  loading='lazy'
                />
              </div>
              <div className='comment_author'>@{comment.postedBy?.name}</div>
            </div>
            <div className=''>
              <p style={!isTruncated ? { margin: 0 } : { marginTop: 0 }} ref={contentRef} className={`comment_content ${isExpanded ? 'expanded' : 'truncated'}`}>{comment?.content}</p>
              {isTruncated && (
                <button className='read-more-button' onClick={toggleReadMore}>
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            <span>{formatRelativeTime(comment.createdAt)}</span>
            <InteractionComponent modelType='comment' reply={comment} updateLike={updateLike} />
          </>
        )}
      </div>
    </div>
  );
}

export default CommentReply