import React, {
  useRef,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import BlogPost from "./BlogPost";
import {
  AutoSizer,
  CellMeasurer,
  List,
  WindowScroller,
} from "react-virtualized";
import "react-virtualized/styles.css";
import { useCache } from "../../../contexts/BlogsCache";

const BlogList = ({ acceptedPosts }) => {
  const listRef = useRef();
  const [windowWidth, setWindowWidth] = useState({ width: window.innerWidth });
  const MOBILE_BREAKPOINT = 768;
  const isMobile = windowWidth.width <= MOBILE_BREAKPOINT;
  // Cache for measuring row heights
  const { cache, clearCache } = useCache();

  const onResize = useCallback(
    ({ width }) => {
      if (width !== windowWidth.width) {
        clearCache();
      }
      setWindowWidth({ width });
    },
    [windowWidth, clearCache],
  );

  // Only clear cache and re-measure when explicitly requested (e.g., after edit)
  const handleBlogEdit = () => {
    clearCache();
    listRef.current?.recomputeRowHeights();
  };

  const padding = useMemo(() => (isMobile ? `10px 0` : `30px 0`), [isMobile]);

  const minHeight = useMemo(() => (isMobile ? `100px` : `460px`), [isMobile]);

  const rowContent = useCallback(
    ({ key, index, style, parent }) => {
      const blog = acceptedPosts[index];
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          columnIndex={0}
          rowIndex={index}
          parent={parent}
        >
          {({ measure, registerChild }) => (
            <div
              ref={registerChild}
              style={{
                ...style,
                padding: padding,
                borderBottom: "1px solid #eaeaea",
                minHeight: minHeight,
              }}
              onLoad={measure}
            >
              <BlogPost
                blog={blog}
                list={measure}
                onBlogEdit={handleBlogEdit}
              />
            </div>
          )}
        </CellMeasurer>
      );
    },
    [acceptedPosts, padding, minHeight, cache],
  );

  return (
    <div
      className="blogs_content"
      // style={{ height: "100%", width: "100%", display: "flex" }}
    >
      {acceptedPosts && acceptedPosts.length > 0 && (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <div style={{ flex: "1 1 auto" }}>
              <AutoSizer disableHeight onResize={onResize}>
                {({ width }) => (
                  <List
                    ref={listRef}
                    className="List"
                    autoHeight
                    height={height}
                    width={width}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={acceptedPosts.length}
                    rowHeight={cache.rowHeight}
                    deferredMeasurementCache={cache}
                    scrollTop={scrollTop}
                    rowRenderer={rowContent}
                    scrollToRow={10}
                    overscanRowCount={4}
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      )}
    </div>
  );
};

export default BlogList;
