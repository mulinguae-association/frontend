import React from 'react'
import BlogPost from './BlogPost'

const BlogList = ({ acceptedPosts, setAcceptedPosts }) => {
  return (
    <div className="blogs_content">
      {acceptedPosts?.length > 0 && (
        acceptedPosts.map((blog) => (
          <BlogPost
            key={blog._id}
            blog={blog}
            setAcceptedPosts={setAcceptedPosts}
          />
        ))
      )}
    </div>
  )
}

export default BlogList