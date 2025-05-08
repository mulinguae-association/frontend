import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "./Accordion.module.scss";

export default function Accordion({ items, activeAccordion, toggleAccordion }) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <div className={styles.accordion_item} key={item.id}>
          <button
            className={`${styles.accordion_trigger} ${
              activeAccordion === item.id ? styles.active : ""
            }`}
            onClick={() => toggleAccordion(item.id)}
            aria-expanded={activeAccordion === item.id}
            aria-controls={`content-${item.id}`}
          >
            <span>{item.title}</span>
            <MdKeyboardArrowDown fontSize={18} />
          </button>
          <div
            id={`content-${item.id}`}
            className={`${styles.accordion_content} ${
              activeAccordion === item.id ? `${styles.open}` : ""
            }`}
            aria-hidden={activeAccordion !== item.id}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
