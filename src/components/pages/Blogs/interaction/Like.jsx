import React from 'react'
import "./Like.scss"
const Like = ({ isLiked, likeCount, handleClick }) => {
  return (
    <div className="heart-btn" onClick={handleClick}>
      <div className="content">
        <span className={`heart ${isLiked ? 'heart-active' : ''}`}></span>
        <span className={`numb ${isLiked ? 'interaction_active' : ''}`}>{likeCount}</span>
      </div>
    </div>
  )
}

export default Like