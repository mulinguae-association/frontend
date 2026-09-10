import i18n from "../i18n";

/**
 * Compact AM/PM markers per language. RTL languages (Arabic, Urdu) show
 * localized short markers instead of Latin "AM"/"PM".
 */
const AM_PM_LABELS = {
  ar: { am: "ص", pm: "م" },
  ur: { am: "ص", pm: "ش" },
};

/**
 * Return the localized AM/PM label for the given period.
 * @param {"am"|"pm"} period - Period of day.
 * @param {string} [language] - i18n language code (defaults to current).
 * @returns {string} Localized marker, e.g. "ص" for Arabic morning.
 */
export const getAmPmLabel = (period, language = i18n.language) => {
  const lang = (language || "en").toLowerCase();
  const labels = AM_PM_LABELS[lang];
  if (labels && labels[period]) return labels[period];
  return period === "am" ? "AM" : "PM";
};

/**
 * Format a timestamp as a reusable, locale-aware 12-hour time string.
 * Digits stay Latin; only the AM/PM marker is localized (e.g. "2:30 م").
 * @param {Date|string|number} timestamp - Date to format.
 * @param {string} [language] - i18n language code (defaults to current).
 * @returns {string} Formatted time, e.g. "2:30 PM" or "2:30 م".
 */
export const formatTime = (timestamp, language = i18n.language) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${getAmPmLabel(period, language)}`;
};

export default formatTime;