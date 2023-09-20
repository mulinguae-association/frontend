import React from 'react'

const BlogContent = ({ blog, setShowFullContent }) => {
  return (
    <section className="blog_content">
      <div className="blog_user">
        <img src="/images/fallBackUser.png" alt="user" />
        <span>User</span>
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