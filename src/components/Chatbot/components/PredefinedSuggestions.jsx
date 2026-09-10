import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getAllSuggestionCategories } from "../knowledge/websiteKnowledge";

/**
 * Predefined suggestion buttons for the chatbot.
 * Shows categorized quick-action buttons users can click to start conversations.
 *
 * @param {object} props
 * @param {function} props.onSelectSuggestion - Callback when a suggestion is clicked.
 * @param {boolean} [props.showTrigger] - Whether to show the trigger button initially.
 */
const PredefinedSuggestions = ({ onSelectSuggestion, showTrigger = true }) => {
  const { t, i18n } = useTranslation("global");
  const isRTL = ["ar", "ur"].includes(i18n.language);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("gettingStarted");
  const categories = getAllSuggestionCategories();
  const [suggestions, setSuggestions] = useState([]);
  const [animateKey, setAnimateKey] = useState(0);

  // Load suggestions when category changes
  useEffect(() => {
    const loaded = t(`chatbot.questions.${selectedCategory}`, {
      returnObjects: true,
    });
    setSuggestions(Array.isArray(loaded) ? loaded : []);
    setAnimateKey((k) => k + 1); // retrigger animation
  }, [selectedCategory, t]);

  const handleSuggestionClick = useCallback(
    (suggestion) => {
      onSelectSuggestion(suggestion, selectedCategory);
      setIsOpen(false);
    },
    [onSelectSuggestion, selectedCategory],
  );

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={`predefined-suggestions ${isOpen ? "predefined-suggestions--open" : ""}`}>
      {showTrigger && (
        <button
          className="predefined-suggestions__trigger"
          onClick={togglePanel}
          aria-expanded={isOpen}
        >
          <span className="predefined-suggestions__trigger-icon">
            {isOpen ? "✕" : "💡"}
          </span>
          {!isOpen && (
            <span className="predefined-suggestions__trigger-text">
              {t("chatbot.quickQuestions")}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="predefined-suggestions__panel">
          <div className="predefined-suggestions__header">
            <h4 className="predefined-suggestions__title">💡 {t("chatbot.popularTopics")}</h4>
            <span className="predefined-suggestions__hint">{t("chatbot.tapQuestion")}</span>
          </div>

          <div className="predefined-suggestions__categories">
            {Object.keys(categories).map((catKey) => (
              <button
                key={catKey}
                className={`predefined-suggestions__category ${
                  selectedCategory === catKey
                    ? "predefined-suggestions__category--active"
                    : ""
                }`}
                onClick={() => setSelectedCategory(catKey)}
              >
                <span className="predefined-suggestions__category-icon">
                  {categories[catKey].icon}
                </span>
                <span className="predefined-suggestions__category-label">
                  {t(`chatbot.categories.${catKey}`)}
                </span>
              </button>
            ))}
          </div>

          <div className="predefined-suggestions__list" key={animateKey}>
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion}-${index}`}
                className="predefined-suggestions__item"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <span className="predefined-suggestions__item-text">{suggestion}</span>
                <span className="predefined-suggestions__item-arrow">{isRTL ? "←" : "→"}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PredefinedSuggestions);
