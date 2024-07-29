import DOMPurify from 'dompurify';

const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
};

export default sanitizeHtml;
