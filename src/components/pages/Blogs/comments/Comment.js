import React, { useCallback, useEffect, useRef, useState } from 'react';
import { formatRelativeTime } from '../../../HelperComponents/RelativeDate';
import InteractionComponent from '../interaction/InteractionComments';
import { useAuth } from '../../../../contexts/AuthContext';
import { isTextTruncated } from '../../../../utils/isTextTruncated';
import { useRemoveCommentMutation } from '../../../../apis/mutations/blogs/removeComment';
import i18n from '../../../../i18n';
import { BiLoaderAlt } from 'react-icons/bi';
import { useCache } from '../../../../contexts/BlogsCache';
const UpdateComment = React.lazy(() => import('./UpdateComment'));
const EllipsisMenu = React.lazy(() => import("../EllipsisMenu"));

const Comment = ({
  comment,
  editCommentId,
  handleEdit,
  isEditComment,
  setIsEditComment,
  list
}) => {
  const { userData, isAuth } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef(null);
  const { mutate: handleRemoveComment } = useRemoveCommentMutation(comment.blogId, comment.parentComment);
  const isAr_Ur = ["ar", "ur"].includes(i18n.language)
  const { clearCache } = useCache();
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

  const toggleReadMore = useCallback(() => {
    setIsExpanded((prev) => !prev);
    clearCache()
    setTimeout(() => {
      if (list) {
        list();
      }
    }, 0)
  }, [list, clearCache, isExpanded]);

  return (
    <div style={isAr_Ur ? { direction: "rtl" } : { direction: "ltr" }} className='comment_info'>
      {isAuth && (comment?.postedBy?._id === userData?.userId || userData?.role === "admin") && (
        <React.Suspense fallback={<BiLoaderAlt color='#fff' className='spin-loader' />}>
          <EllipsisMenu
            handleDelete={() => handleRemoveComment({ commentId: comment?._id, blogId: comment.blogId })}
            handleEdit={(state) => handleEdit(comment, state)}
          />
        </React.Suspense>
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
          <React.Suspense fallback={<BiLoaderAlt />}>
            <UpdateComment
              editComment={comment}
              comments={comment}
              initialValue={comment?.content}
              setIsEditComment={setIsEditComment}
              isEditComment={isEditComment}
            />
          </React.Suspense>
        ) : (
          <div className="parent_comment">
            <div className={`comment_content_container`}>
              <p ref={contentRef} className={`comment_content ${isExpanded ? 'expanded' : 'truncated'}`}>{comment?.content}</p>
              <button className='read-more-button' onClick={toggleReadMore}>
                {isTruncated && (
                  isExpanded ? "Show less" : "Read more"
                )}
              </button>
            </div>
            <InteractionComponent modelType='comment' reply={comment} />
          </div>
        )
      }
    </div >
  );
};

export default Comment;
