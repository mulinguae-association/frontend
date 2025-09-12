import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../utils/ScrollToSections";
import { FaAngleRight } from "react-icons/fa";

// Throttle function to limit how often a function can be called
const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};

const TocItems = () => {
  const { t } = useTranslation("privacy&terms/tocItems");
  const tocItems = t("tocItems", { returnObjects: true });
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Use IntersectionObserver if available for better performance
    if ("IntersectionObserver" in window) {
      // Create a map to store section positions for quick lookup
      const sectionPositions = new Map();

      // Pre-calculate section positions to avoid layout thrashing
      document.querySelectorAll("section").forEach((section) => {
        sectionPositions.set(section.id, section.offsetTop);
      });

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          // Process all entries in a batch to avoid multiple state updates
          let highestVisibleSection = null;
          let highestPosition = -Infinity;

          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              const position = sectionPositions.get(id) || 0;

              // Find the section closest to the top of the viewport
              if (position > highestPosition) {
                highestPosition = position;
                highestVisibleSection = id;
              }
            }
          });

          // Only update state if we found a visible section
          if (
            highestVisibleSection &&
            highestVisibleSection !== activeSection
          ) {
            setActiveSection(highestVisibleSection);
            // Use requestAnimationFrame to batch DOM updates
            requestAnimationFrame(() => {
              window.history.replaceState(
                null,
                null,
                `#${highestVisibleSection}`
              );
            });
          }
        },
        {
          rootMargin: "-100px 0px -100px 0px",
          threshold: [0.1, 0.5], // Multiple thresholds for better accuracy
        }
      );

      document.querySelectorAll("section").forEach((section) => {
        sectionObserver.observe(section);
      });

      return () => {
        document.querySelectorAll("section").forEach((section) => {
          sectionObserver.unobserve(section);
        });
      };
    } else {
      // Fallback to scroll event for older browsers
      const throttled = throttle(() => {
        const scrollPosition = window.scrollY;

        // Use IntersectionObserver API if available
        if ("IntersectionObserver" in window) {
          return; // The observer will handle this
        }

        // Fallback for browsers without IntersectionObserver
        const sections = document.querySelectorAll("section");
        let currentSection = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 200;
          const sectionHeight = section.clientHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            currentSection = section.id;
          }
        });

        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
          if (currentSection) {
            window.history.replaceState(null, null, `#${currentSection}`);
          }
        }
      }, 100);

      window.addEventListener("scroll", throttled);
      throttled();

      return () => {
        window.removeEventListener("scroll", throttled);
      };
    }
  }, [activeSection]);

  return (
    <div className="toc_items">
      <h1>{t("Head")}</h1>
      <ul>
        {tocItems.map((item) => (
          <li key={item.id}>
            <FaAngleRight color="green" size={18} />
            <Link
              onClick={() => scrollToSection(`${item.link}`, undefined, 50)}
              to={`#${item.link}`}
              className={activeSection === item.link ? "active" : ""}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TocItems;
