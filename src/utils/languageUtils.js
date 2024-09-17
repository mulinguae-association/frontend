import i18n from "../i18n";
export function langDirection() {
  return ["ar", "ur"].includes(i18n.language) ? 'rtl' : 'ltr'; //check if lang is arabic or not 
}
