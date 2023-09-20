import React from 'react'
import { Link } from 'react-router-dom';

const BlogsHeader = ({ searchQuery, handleSearchChange, handleSearchKeyPress }) => {
  return (
    <>
      <div className="links">
        <Link to="/pages/Blogs/Create-new-blog">+ Create A Blog</Link>
        <div>
          <input
            className="search bgSC"
            type="search"
            placeholder="Search by title or user name"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
        </div>
        <div className="auth_Links">
          <Link to="/BlogLogin">Login</Link>
          <Link to="/BlogRegister">Register</Link>
        </div>
      </div>
      <div>
        <input
          className="search smSC"
          type="search"
          placeholder="Search by title or user name"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
        />
      </div>
    </>
  );
};

export default BlogsHeader