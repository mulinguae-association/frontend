import React from "react";
import { formatRelativeTime } from "../../HelperComponents/RelativeDate";

const BlogHeader = ({ blog }) => {
  return (
    <header>
      <div className="title_and_date">
        <h1 className="blog_title">{blog.title}</h1>
        <span className="blog_date">
          — {formatRelativeTime(blog.createdAt)}
        </span>
      </div>

      {blog?.status && blog.status !== "accepted" && (
        <span className="pending-badge">
          {blog.status === "pending" ? "Pending approval" : blog.status}
        </span>
      )}

      <span className="sub_title">{blog.subTitle}</span>
    </header>
  );
};

export default BlogHeader;
