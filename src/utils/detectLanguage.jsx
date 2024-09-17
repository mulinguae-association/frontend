export const detectLanguage = (text) => {
  // Check if the text contains Arabic & Urdu characters
  const arabicUrduPattern =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicUrduPattern.test(text) ? "ar" : "en";
};
