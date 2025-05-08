import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children, className, style }) => {
  return (
    <article className={`${styles.card} ${className || ""}`} style={style}>
      {children}
    </article>
  );
};

export default Card;

// Card Header component
const CardHeader = ({ title, subtitle, icon: Icon, style, className }) => {
  return (
    <header
      className={`${styles.card__header} ${className || ""}`}
      style={style}
    >
      <div className={styles.card__headerContent}>
        <div className={styles.card__group}>
          {Icon && <Icon className={styles.card__icon} />}
          <h2 className={styles.card__title}>{title}</h2>
        </div>
        {subtitle && <p className={styles.card__subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
};

// Card Body component
const CardBody = ({ children, className }) => {
  return (
    <section className={`${styles.card__body} ${className || ""}`}>
      {children}
    </section>
  );
};

export { Card, CardHeader, CardBody };
