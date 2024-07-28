// utils.js
export const isTextTruncated = (element) => {
  if (!element) return false;
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
};
