import React from 'react'
import { formatRelativeTime } from '../../HelperComponents/RelativeDate';

const BlogHeader = ({ blog }) => {
  return (
    <header>
      <div className="title_and_date">
        <h1 className="blog_title">{blog.title}</h1>
        <span className="blog_date">— {formatRelativeTime(blog.createdAt)}</span>
      </div>
      <span className="sub_title">{blog.subTitle}</span>
    </header>
  );
};

export default BlogHeader