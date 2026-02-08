import ScrollDownArrow from "../../HelperComponents/ScrollDownArrow";

const BlogStatusMessage = ({
  error,
  posts,
  allLoaded,
  loading,
  noResultsText = "No results found!",
  allLoadedText = "All blog posts have been loaded.",
  loadingText = "Loading....",
  errorText = "An error occurred while fetching blog posts.",
  showScrollArrow = true,
}) => {
  if (error) {
    return <p className="finished-message">{errorText}</p>;
  }
  if (posts && posts.length <= 0) {
    return <p className="finished-message">{noResultsText}</p>;
  }
  if (allLoaded) {
    return <p className="finished-message">{allLoadedText}</p>;
  }
  if (loading) {
    return <p className="finished-message">{loadingText}</p>;
  }
  return showScrollArrow ? <ScrollDownArrow /> : null;
};

export default BlogStatusMessage;
