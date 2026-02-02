import BlogPost from "./BlogPost";
import { Virtuoso } from "react-virtuoso";

const BlogList = ({ acceptedPosts }) => {
  return (
    <div className="blogs_content">
      {acceptedPosts && acceptedPosts.length > 0 && (
        <Virtuoso
          style={{ height: "100%" }}
          data={acceptedPosts}
          useWindowScroll
          totalCount={acceptedPosts.length}
          itemContent={(index, blog) => <BlogPost key={blog._id} blog={blog} />}
        />
      )}
    </div>
  );
};

export default BlogList;
