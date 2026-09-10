import { useEffect } from 'react';

const useDirectionChange = (language) => {
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    const isRTL = ["ar", "ur"].includes(language);
    htmlElement.setAttribute('lang', language || 'en');
    htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [language]);
};

export default useDirectionChange;
