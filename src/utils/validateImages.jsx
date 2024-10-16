import DOMPurify from "dompurify";

export const validateImageUrl = async (url) => {
  const sanitizedUrl = DOMPurify.sanitize(url);

  if (!sanitizedUrl.startsWith("https://")) {
    return false;
  }

  if (sanitizedUrl.length > 2048) {
    return false;
  }
  try {
    const response = await fetch(sanitizedUrl, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return response.ok && contentType?.startsWith("image/");
  } catch (error) {
    console.error("Error validating image URL:", error);
    return false;
  }
};
