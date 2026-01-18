import React from 'react'
import "./Loader.scss"
const Loader = () => {
  return (
    <div>
      <div className='loader_overlay'></div>
      <div className='loader'>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
export default Loader