import React from "react";
import { useTranslation } from "react-i18next";

export default function Tabs({ activeTab, handleTabChange }) {
  const { t } = useTranslation("pages/unityAndSolidarity");
  const tabs = ["overview", "principles", "education"];

  const handleKeyDown = (e, tab) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const currentIndex = tabs.indexOf(activeTab);
      let newIndex;

      if (e.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % tabs.length;
      } else {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      handleTabChange(tabs[newIndex]);
    }
  };

  return (
    <nav className="tabs" aria-label="Content Tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          id={`tab-${tab}`}
          aria-selected={activeTab === tab}
          aria-controls={`panel-${tab}`}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabChange(tab)}
          onKeyDown={(e) => handleKeyDown(e, tab)}
          tabIndex={activeTab === tab ? 0 : -1}
        >
          {t(`tabs.${tab}`)}
        </button>
      ))}
    </nav>
  );
}
