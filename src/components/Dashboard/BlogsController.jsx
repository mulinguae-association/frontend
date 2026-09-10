import React from 'react'
import { formatRelativeTime } from '../HelperComponents/RelativeDate'
import sanitizeHtml from '../../utils/sanitizeHtml'
import { useTranslation } from 'react-i18next'

const BlogsController = ({
  pendingComments,
  pendingPosts,
  handleAccept,
  handleRefuse,
  handleAcceptComment,
  handleRefuseComment
}) => {
  const { t } = useTranslation('global')
  return (
    <section className='blogs'>
      <div className='pendingPosts'>
        <h2>{t('admin.pendingBlogs')}</h2>
        <div className='content_container'>
          {pendingPosts && pendingPosts.map((blog) => (
            <article className='content' key={blog._id}>
              <h3 className='title'>{blog.title}</h3>
              <span className='subTitle'>{blog.subTitle}</span>
              <span className='date'>{formatRelativeTime(blog.createdAt)}</span>
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }} />
              <div className='btns'>
                <button className='accept' onClick={() => handleAccept(blog._id)}>{t('admin.accept')}</button>
                <button className='refuse' onClick={() => handleRefuse(blog._id)}>{t('admin.refuse')}</button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className='pendingComments'>
        <h2>{t('admin.pendingComments')}</h2>
        {pendingComments && pendingComments.map((comment) => (
          <div key={comment._id}>
            <h3>{comment?.author}</h3>
            <p>{comment.content}</p>
            <button onClick={() => handleAcceptComment(comment._id)}>
              {t('admin.accept')}
            </button>
            <button onClick={() => handleRefuseComment(comment._id)}>
              {t('admin.refuse')}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BlogsController