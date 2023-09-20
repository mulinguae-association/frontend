import React from 'react'
import { formatRelativeTime } from '../HelperComponents/RelativeDate'

const BlogsController = ({
  pendingComments,
  pendingPosts,
  handleAccept,
  handleRefuse,
  handleAcceptComment,
  handleRefuseComment
}) => {
  return (
    <section className='blogs'>
      <div className='pendingPosts'>
        <h2>Pending Blogs</h2>
        <div className='content_container'>
          {pendingPosts && pendingPosts.map((blog) => (
            <article className='content' key={blog._id}>
              <h3 className='title'>{blog.title}</h3>
              <span className='subTitle'>{blog.subTitle}</span>
              <span className='date'>{formatRelativeTime(blog.createdAt)}</span>
              <p dangerouslySetInnerHTML={{ __html: blog.content }} />
              <div className='btns'>
                <button className='accept' onClick={() => handleAccept(blog._id)}>Accept</button>
                <button className='refuse' onClick={() => handleRefuse(blog._id)}>Refuse</button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className='pendingComments'>
        <h2>Pending Comments</h2>
        {pendingComments && pendingComments.map((comment) => (
          <div key={comment._id}>
            <h3>{comment?.author}</h3>
            <p>{comment.content}</p>
            <button onClick={() => handleAcceptComment(comment._id)}>
              Accept
            </button>
            <button onClick={() => handleRefuseComment(comment._id)}>
              Refuse
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BlogsController