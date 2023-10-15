import React from 'react'
import { BiLike, BiSolidLike } from 'react-icons/bi'
import "./Like.scss"
const Love = ({ isLiked, likeCount, handleClick }) => {
  return (
    <div className="interaction_btn" onClick={handleClick}>
      <div className="content">
        <span className={`love ${isLiked ? 'interaction_active' : ''}`}>
          {!isLiked ? <BiLike /> : <BiSolidLike />}
        </span>
        <span className={`numb ${isLiked ? 'interaction_active' : ''}`}>{likeCount}</span>
      </div>
    </div>
  )
}
export default Love