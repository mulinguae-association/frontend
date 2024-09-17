import { useEffect } from 'react';

const useDirectionChange = (language) => {
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (["ar", "ur"].includes(language)) {
      htmlElement.setAttribute('lang', 'ar');
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('lang', language);
      htmlElement.setAttribute('dir', 'ltr');
    }
  }, [language]);
};

export default useDirectionChange;
