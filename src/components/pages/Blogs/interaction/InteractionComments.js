import React from 'react';
import Unlikes from './Unlike';
import Love from './Love';
import Like from './Like';
import { useAuth } from '../../../../contexts/AuthContext';
import { interactWithComment } from '../../../../utils/blog-api';
import { notifyError } from '../../../Notify';

const InteractionComponent = ({
  reply,
  updateLike,
  modelType
}) => {

  const { userData } = useAuth();
  const handleClick = async (id, action) => {
    try {
      const res = await interactWithComment(modelType, id, action);
      const updatedValues = { likes: [], loves: [], unlikes: [] };
      if (res.status === 200) {

        if (res.data.likes) updatedValues.likes = res.data.likes;
        if (res.data.loves) updatedValues.loves = res.data.loves;
        if (res.data.unlikes) updatedValues.unlikes = res.data.unlikes;
        updateLike(id, updatedValues);
      }
      if (res.status === 401) {
        notifyError(res.message)
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        notifyError(err)
      } else {
        console.log(err)
      }
    }
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
