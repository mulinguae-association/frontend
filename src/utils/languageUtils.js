import i18n from "../i18n";
export function langDirection() {
  return ["ar", "ur"].includes(i18n.language) ? "rtl" : "ltr"; //check if lang is arabic or not
}

import {
  enUS,
  fr,
  es,
  it,
  ru,
  ar,
  pt,
  mn,
  ca,
  hi,
  km,
  et,
} from "date-fns/locale";

const localeMap = {
  en: enUS,
  ar,
  fr,
  es,
  it,
  ru,
  pt,
  mn,
  ca,
  hi,
  km,
  et,
};

export const getDateFnsLocale = (lang) => localeMap[lang] || enUS;
