import DOMPurify from "dompurify";

export const validateUrl = (url) => {
  const sanitizedUrl = DOMPurify.sanitize(url);

  const urlPattern = new RegExp(
    "^(https:\\/\\/)?" + // Only allow https
      "((([a-z0-9][a-z0-9-]*[a-z0-9])?\\.)+[a-z]{2,}|localhost|" +
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
      "\\[?[a-f0-9]*:[a-f0-9:%.~+]*\\]?)" +
      "(\\:\\d+)?(\\/[-a-z0-9+&@#/%=~_|$?!:.]*)*$",
    "i"
  );

  if (!urlPattern.test(sanitizedUrl)) {
    return false; // Invalid URL structure
  }
  // Check for valid protocols (http or https)
  if (!sanitizedUrl.startsWith("https://")) {
    return false; // Invalid URL
  }

  // Limit URL length (example: 2048 characters)
  if (sanitizedUrl.length > 2048) {
    return false; // Reject long URLs
  }

  return sanitizedUrl; // Return sanitized URL for further processing
};
