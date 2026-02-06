import "./SkeletonComment.scss";

const SkeletonComment = () => {
  return (
    <div className="skeleton-comment">
      <div className="skeleton-avatar" />
      <div className="skeleton-content">
        <div className="skeleton-line short" />
        <div className="skeleton-line thick" />
        <div className="skeleton-line" />
      </div>
    </div>
  );
};

export default SkeletonComment;
