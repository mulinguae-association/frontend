import React from 'react';
import Unlikes from './Unlike';
import Love from './Love';
import Like from './Like';
import { useAuth } from '../../../../contexts/AuthContext';
import { useUpdateInteractionMutation } from '../../../../apis/mutations/blogs/updateInteraction';

const InteractionComponent = ({
  reply,
  modelType
}) => {
  const { userData } = useAuth();
  const { mutate: interactWithComment } = useUpdateInteractionMutation({ blogId: reply.blogId, parentCommentId: reply.parentComment });
  const handleClick = async (id, action) => {
    interactWithComment({ modelType, id, action });
  };

  return (
    <div className='interaction_comments'>
      <Unlikes
        isLiked={reply?.unlikes.includes(
          userData?.userId
        )}
        likeCount={reply.unlikes.length || 0}
        handleClick={() =>
          handleClick(reply._id, "unlike")
        }
      />
      <Love
        isLiked={reply?.loves.includes(
          userData?.userId
        )}
        likeCount={reply.loves.length || 0}
        handleClick={() =>
          handleClick(reply._id, "love")
        }
      />
      <Like
        isLiked={reply?.likes.includes(
          userData?.userId
        )}
        likeCount={reply.likes.length || 0}
        handleClick={() =>
          handleClick(reply._id, "like")
        }
      />
    </div>
  );
};

export default InteractionComponent;
