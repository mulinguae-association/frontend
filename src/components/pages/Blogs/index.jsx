import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { useTranslation } from "react-i18next";
import BlogsHeader from "./BlogsHeader";
import BlogList from "./BlogList";
import ScrollDownArrow from "../../HelperComponents/ScrollDownArrow";
import "./Blogs.scss";
import { useBlogPosts } from "../../../contexts/BlogsContext.jsx";
import { useSearchMutation } from "../../../apis/mutations/blogs/searchBlog";
import { CacheProvider } from "../../../contexts/BlogsCache";
import { SEO } from "../../SEO.jsx";

const Blogs = () => {
  const { t } = useTranslation("pages/blogs");
  const {
    acceptedPosts,
    loading,
    allPostsLoaded,
    errorDisplayPosts,
    hasMore,
    fetchNextPage,
    isFetchingNextPage,
    searchQuery,
  } = useBlogPosts(); // Use the context hook
  const [previousQuery, setPreviousQuery] = useState("");
  const searchMutation = useSearchMutation(searchQuery);

  const debouncedSearch = debounce((query) => {
    if (query !== previousQuery) {
      searchMutation.mutate(query);
      setPreviousQuery(query);
    }
  }, 500);

  const handleSearchChange = (event) => {
    const query = event.target.value.trim();
    searchQuery.current = query;
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      debouncedSearch(searchQuery.current);
    }
  };
  useEffect(() => {
    const handleScrollToFooter = debounce((entries) => {
      const footerEntry = entries[0];
      if (footerEntry.isIntersecting && hasMore && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, 200);
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver(handleScrollToFooter, options);
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFetchingNextPage, fetchNextPage]);
  return (
    <>
      <SEO
        title={t("seo.blogs.title")}
        description={t("seo.blogs.description")}
        keywords={t("seo.blogs.keywords")}
        path="/pages/blogs"
        ldJson={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Mulinguae Blog",
          url: undefined,
          description:
            "Read the latest blog posts from Mulinguae's multilingual community. Discover language learning tips, cultural stories, and updates from Mulinguae (Mulingua).",
        }}
      />
      <main className="Blogs">
        <div className="container">
          <BlogsHeader
            searchQuery={searchQuery}
            handleSearchKeyPress={handleSearchKeyPress}
            handleSearchChange={handleSearchChange}
          />
          <CacheProvider>
            <BlogList acceptedPosts={acceptedPosts} />
          </CacheProvider>
          {errorDisplayPosts ? (
            <p className="finished-message">
              {t("errorFetchingPosts")}
            </p>
          ) : acceptedPosts && acceptedPosts?.length <= 0 ? (
            <p className="finished-message">{t("noResultsFound")}</p>
          ) : allPostsLoaded ? (
            <p className="finished-message">{t("allPostsLoaded")}</p>
          ) : loading ? ( // Check for both loading and isSearching
            <p className="finished-message">{t("loadingPosts")}</p>
          ) : (
            <ScrollDownArrow />
          )}
        </div>
      </main>
    </>
  );
};

export default Blogs;
