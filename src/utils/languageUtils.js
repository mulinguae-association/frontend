import i18n from "../i18n";
export function langDirection() {
  return i18n.language === 'Ar' ? 'rtl' : 'ltr'; //check if lang is arabic or not 
}
