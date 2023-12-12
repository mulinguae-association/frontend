import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../utils/ScrollToSections";
import { FaAngleRight } from "react-icons/fa";
const TocItems = () => {
  const { t } = useTranslation("privacy&terms/tocItems");
  const tocItems = t("tocItems", { returnObjects: true });
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
          window.history.replaceState(null, null, `#${section.id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
