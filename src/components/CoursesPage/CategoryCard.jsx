import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToElement } from '../../utils/scrollUtils';

const CategoryCard = ({
  className,
  icon,
  title,
  description,
  linkTo,
  linkText,
  scrollTarget,
  children
}) => {
  const handleClick = () => {
    if (scrollTarget) {
      scrollToElement(scrollTarget, 700);
    }
  };

  return (
    <div className={`category-card ${className || ''}`}>
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title">
          {linkTo ? (
            <Link to={linkTo} onClick={handleClick}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p className="card-description">{description}</p>

        {children}

        {linkTo && linkText && (
          <div className="card-action">
            <Link to={linkTo} className="action-link" onClick={handleClick}>
              {linkText}
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
