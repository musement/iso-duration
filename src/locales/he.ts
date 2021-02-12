import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return c === 1 ? "שנה" : "שנים";
  },
  months(c) {
    return c === 1 ? "חודש" : "חודשים";
  },
  weeks(c) {
    return c === 1 ? "שבוע" : "שבועות";
  },
  days(c) {
    return c === 1 ? "יום" : "ימים";
  },
  hours(c) {
    return c === 1 ? "שעה" : "שעות";
  },
  minutes(c) {
    return c === 1 ? "דקה" : "דקות";
  },
  seconds(c) {
    return c === 1 ? "שניה" : "שניות";
  },
  decimal: ".",
};

export default lang;
