import React from 'react'
import "./Like.scss"
const Like = ({ isLiked, likeCount, handleClick }) => {
  console.log(isLiked)
  return (
    <div className="heart-btn" onClick={handleClick}>
      <div className="content">
        <span className={`heart ${isLiked ? 'heart-active' : ''}`}></span>
        {/* <span class="like">Like</span> */}
        <span className="numb">{likeCount}</span>
      </div>
    </div>
  )
}

export default Like