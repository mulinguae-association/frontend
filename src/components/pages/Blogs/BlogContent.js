import React, { useEffect, useRef, useState } from 'react'
import { isTextTruncated } from '../../../utils/isTextTruncated';
import sanitizeHtml from '../../../utils/sanitizeHtml';
import { useTranslation } from 'react-i18next';

const BlogContent = ({ blog, ArUr, setShowFullContent }) => {
  const [isExpanded, _] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const contentRef = useRef(null);
  const { t } = useTranslation("pages/blogs");

  useEffect(() => {
    const checkTruncation = () => {
      if (contentRef.current) {
        setIsTruncated(isTextTruncated(contentRef.current));
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [blog.content]);

  return (
    <section className="blog_content">
      <div className="blog_user">
        <div className='img_container'>
          <img
            width="100px"
            height="100px"
            src={blog.postedBy?.profileImage ? blog.postedBy?.profileImage : "/images/fallBackUser.png"}
            alt="user"
            onError={(e) => {
              e.target.src = '/images/fallBackUser.png';
            }}
            loading='lazy'
          />
        </div>
        <span className='author_name'>{blog.postedBy?.name}</span>
      </div>
      <div
        ref={contentRef}
        className={`blog_content ${isExpanded ? 'expanded' : 'truncated'}`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}>
      </div>
      {
        isTruncated && (
          <span onClick={() => setShowFullContent(prev => !prev)} className="read_more">
            {t("readMore")}
          </span>
        )
      }
    </section>
  );
};

export default BlogContent