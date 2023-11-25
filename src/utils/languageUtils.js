import i18n from "../i18n";
export function langDirection() {
  return ["Ar", "Ur"].includes(i18n.language) ? 'rtl' : 'ltr'; //check if lang is arabic or not 
}
