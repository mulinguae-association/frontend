import sanitizeHtml from "../../utils/sanitizeHtml";
import Table from "../Table";
import { formatDistanceToNow } from "date-fns";
import { getDateFnsLocale } from "../../utils/languageUtils";
import { useTranslation } from "react-i18next";
const BlogsController = ({
  pendingComments,
  pendingPosts,
  handleAccept,
  handleRefuse,
  handleAcceptComment,
  handleRefuseComment,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  // Columns for blogs
  const blogColumns = [
    {
      key: "author",
      label: "Author",
      filterType: "text",
      render: (blog) => (
        <span className="blog-author">
          {blog.postedBy?.profileImage && (
            <img
              className="profile-image"
              src={blog.postedBy.profileImage}
              alt="Profile"
            />
          )}
          {blog.postedBy?.name || blog.author || "Unknown"}
        </span>
      ),
    },
    { key: "title", label: "Title", filterType: "text" },
    { key: "subTitle", label: "Subtitle", filterType: "text" },
    {
      key: "createdAt",
      label: "Created",
      filterType: "text",
      render: (blog) =>
        formatDistanceToNow(new Date(blog.createdAt), {
          locale: getDateFnsLocale(lang) || enUS,
        }),
    },
    {
      key: "content",
      label: "Content Preview",
      filterType: "text",
      render: (blog) => (
        <div
          className="comment-content"
          dangerouslySetInnerHTML={{
            __html:
              sanitizeHtml(blog.content.slice(0, 120)) +
              (blog.content.length > 120 ? "..." : ""),
          }}
        />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (blog) => (
        <div className="actions">
          <button className="accept" onClick={() => handleAccept(blog._id)}>
            Accept
          </button>
          <button className="refuse" onClick={() => handleRefuse(blog._id)}>
            Refuse
          </button>
        </div>
      ),
    },
  ];

  // Columns for comments
  const commentColumns = [
    {
      key: "author",
      label: "Author",
      filterType: "text",
      render: (comment) => (
        <span className="comment-author">
          {comment?.postedBy?.profileImage && (
            <img
              className="profile-image"
              src={comment?.postedBy?.profileImage}
              alt="Profile"
            />
          )}
          {comment?.postedBy?.name || comment?.author || "Unknown"}
        </span>
      ),
    },
    {
      key: "content",
      label: "Content",
      filterType: "text",
    },
    {
      key: "createdAt",
      label: "Created",
      filterType: "text",
      render: (comment) =>
        formatDistanceToNow(new Date(comment.createdAt), {
          addSuffix: true,
          locale: getDateFnsLocale(lang) || enUS, // Fallback to enUS if locale not found
        }).replace(/^about /, ""),
    },
    {
      key: "actions",
      label: "Actions",
      render: (comment) => (
        <div className="actions">
          <button
            className="accept"
            onClick={() => handleAcceptComment(comment._id)}
          >
            Accept
          </button>
          <button
            className="refuse"
            onClick={() => handleRefuseComment(comment._id)}
          >
            Refuse
          </button>
        </div>
      ),
    },
  ];

  // Map blogs/comments to table rows
  const blogRows = (pendingPosts || []).map((blog) => ({
    ...blog,
    author: blog.postedBy?.name || blog.author || "Unknown",
    actions: blog._id,
  }));
  const commentRows = (pendingComments || []).map((comment) => ({
    ...comment,
    author: comment?.postedBy?.name || comment?.author || "Unknown",
    actions: comment._id,
  }));

  return (
    <section className="blogs-moderation">
      <h2 className="section-title">Pending Blogs</h2>
      <Table columns={blogColumns} data={blogRows} pageSize={5} />
      <h2 className="section-title">Pending Comments</h2>
      <Table columns={commentColumns} data={commentRows} pageSize={5} />
    </section>
  );
};

export default BlogsController;
