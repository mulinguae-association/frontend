import React from 'react'
import BlogPost from './BlogPost'

const BlogList = ({ acceptedPosts }) => {

  return (
    <div className="blogs_content">
      {acceptedPosts && acceptedPosts.length > 0 && (
        acceptedPosts?.map((blog) => (
          <BlogPost
            key={blog._id}
            blog={blog}
          />
        ))
      )}
    </div>
  )
}

export default BlogList