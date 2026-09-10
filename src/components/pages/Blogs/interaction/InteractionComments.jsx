import React from 'react';
import Unlikes from './Unlike';
import Love from './Love';
import Like from './Like';
import { useAuth } from '../../../../contexts/AuthContext';
import { useUpdateInteractionMutation } from '../../../../apis/mutations/blogs/updateInteraction';
import { getCurrentUserId } from '../../../../utils/getCurrentUserId';

// Coerce like/love/unlike arrays to plain user ids so the active (filled)
// state and counts stay correct even when the server returns populated users.
const normalizeIds = (arr) =>
  (Array.isArray(arr) ? arr : [])
    .map((item) =>
      typeof item === 'string' ? item : item?._id || item?.id || item
    )
    .filter(Boolean);

// Active when any of the user's possible id forms appears in the list.
const isActive = (arr, currUserId) =>
  currUserId != null && normalizeIds(arr).includes(currUserId);

const InteractionComponent = ({
  reply,
  modelType
}) => {
  const { userData } = useAuth();
  const userId = getCurrentUserId(userData);
  const { mutate: interactWithComment } = useUpdateInteractionMutation({ blogId: reply.blogId, parentCommentId: reply.parentComment });
  const handleClick = async (id, action) => {
    interactWithComment({ modelType, id, action });
  };

  return (
    <div className='interaction_comments'>
      <Unlikes
        isLiked={isActive(reply?.unlikes, userId)}
        likeCount={normalizeIds(reply.unlikes).length || 0}
        handleClick={() =>
          handleClick(reply._id, "unlike")
        }
      />
      <Love
        isLiked={isActive(reply?.loves, userId)}
        likeCount={normalizeIds(reply.loves).length || 0}
        handleClick={() =>
          handleClick(reply._id, "love")
        }
      />
      <Like
        isLiked={isActive(reply?.likes, userId)}
        likeCount={normalizeIds(reply.likes).length || 0}
        handleClick={() =>
          handleClick(reply._id, "like")
        }
      />
    </div>
  );
};

export default InteractionComponent;
