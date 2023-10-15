import React from 'react'
import { BiDislike, BiSolidDislike } from 'react-icons/bi'
import "./Like.scss"
const Unlikes = ({ isLiked, likeCount, handleClick }) => {
  return (
    <div className="interaction_btn" onClick={handleClick}>
      <div className="content">
        <span className={`unlike ${isLiked ? 'interaction_active' : ''}`}>
          {!isLiked ? <BiDislike /> : <BiSolidDislike />}
        </span>
        <span className={`numb ${isLiked ? 'interaction_active' : ''}`}>{likeCount}</span>
      </div>
    </div>
  )
}

export default Unlikes