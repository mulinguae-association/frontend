import "./Blogs.scss";
import BlogsHeader from "./BlogsHeader";
import BlogList from "./BlogList";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import "./myPosts.scss";
import { useSearchMutation } from "../../../apis/mutations/blogs/searchBlog";
import { useBlogSearchAndScroll } from "./hooks/useBlogSearchAndScroll";
import BlogStatusMessage from "./BlogStatusMsg.jsx";

const MyPosts = () => {
  const {
    loading: isLoading,
    setPostsToDisplay,
    errorDisplayPosts: isError,
    allPostsLoaded,
    acceptedPosts,
    searchQuery,
  } = useBlogPosts();

  const searchMutation = useSearchMutation(searchQuery);

  const { handleSearchChange, handleSearchKeyPress } = useBlogSearchAndScroll({
    acceptedPosts,
    allPostsLoaded,
    setPostsToDisplay,
    searchMutation,
    searchQueryRef: searchQuery,
  });

  return (
    <main className="Blogs">
      <div className="container">
        <BlogsHeader
          searchQuery={searchQuery}
          handleSearchKeyPress={handleSearchKeyPress}
          handleSearchChange={handleSearchChange}
        />
        <BlogList acceptedPosts={acceptedPosts || []} />

        <BlogStatusMessage
          error={isError}
          posts={acceptedPosts}
          allLoaded={allPostsLoaded}
          loading={isLoading}
        />
      </div>
      <footer style={{ height: "100px" }} />
    </main>
  );
};

export default MyPosts;
