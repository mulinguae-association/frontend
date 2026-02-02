import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogPostById } from "../../../apis/blog-api";
import BlogPost from "./BlogPost";
import "./Blogs.scss";
import BlogsHeader from "./BlogsHeader";
import { BiLoaderCircle } from "react-icons/bi";

const BlogPostPage = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchBlogPostById(blogId)
      .then((post) => {
        setBlog(post);
        setLoading(false);
      })
      .catch((err) => {
        setError("Blog post not found");
        setLoading(false);
      });
  }, [blogId]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "625px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#666",
        }}
      >
        <BiLoaderCircle
          className="spinner spin-loader"
          size={24}
          style={{ marginRight: "8px" }}
        />
        Loading blog post...
      </div>
    );

  if (error || !blog) return <div>{error || "Blog post not found"}</div>;

  return (
    <main style={{ paddingBottom: "50px" }} className="Blogs">
      <div className="container">
        <BlogsHeader hideSearch style={{ padding: "10px" }} />
        <div className="blogs_content">
          <BlogPost blog={blog} setBlog={setBlog} />
        </div>
      </div>
    </main>
  );
};

export default BlogPostPage;
