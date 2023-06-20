import { useEffect } from 'react';

const useDirectionChange = (language) => {
  // run every time i made change 
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')[0];
    const elementsToChange = document.getElementsByClassName('change_direction');

    if (language === 'Ar') {
      htmlElement.setAttribute('lang', 'ar');
      htmlElement.setAttribute('dir', 'rtl');
      for (let i = 0; i < elementsToChange.length; i++) {
        elementsToChange[i].classList.add('rtl');
        elementsToChange[i].classList.remove('ltr');
      }
    } else {
      htmlElement.setAttribute('lang', `${language}`); // Set the lang attribute to 'ar'
      htmlElement.setAttribute('dir', 'ltr');
      for (let i = 0; i < elementsToChange.length; i++) {
        elementsToChange[i].classList.remove('rtl');
        elementsToChange[i].classList.add('ltr');
      }
    }
  });
};

export default useDirectionChange;
