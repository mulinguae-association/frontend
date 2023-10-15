import React from 'react'

const BlogContent = ({ blog, setShowFullContent }) => {

  return (
    <section className="blog_content">
      <div className="blog_user">
        <img
          src={blog.postedBy?.profileImage ? blog.postedBy?.profileImage : "/images/fallBackUser.png"}
          alt="user"
          onError={(e) => {
            e.target.src = '/images/fallBackUser.png';
          }}
        />
        <span className='author_name'>{blog.postedBy?.name}</span>
      </div>
      <p>
        <span dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 300) }} />
        <span onClick={() => setShowFullContent(prev => !prev)} className="read_more">
          ...Read More
        </span>
      </p>
    </section>
  );
};

export default BlogContent