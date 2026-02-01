import BlogPost from "./BlogPost";
import "react-virtualized/styles.css";
import { Virtuoso } from "react-virtuoso";

const BlogList = ({ acceptedPosts, setPostsToDisplay }) => {
  return (
    <div className="blogs_content">
      {acceptedPosts && acceptedPosts.length > 0 && (
        <Virtuoso
          style={{ height: "100%" }}
          data={acceptedPosts}
          useWindowScroll
          endReached={() => {
            if (setPostsToDisplay) {
              setPostsToDisplay((prevPostsToDisplay) => prevPostsToDisplay + 3);
            }
          }}
          totalCount={acceptedPosts.length}
          itemContent={(index, blog) => <BlogPost key={blog._id} blog={blog} />}
        />
      )}
    </div>
  );
};

export default BlogList;
