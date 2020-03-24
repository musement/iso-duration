import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "jaar";
  },
  months(c) {
    return c === 1 ? "maand" : "maanden";
  },
  weeks(c) {
    return c === 1 ? "week" : "weken";
  },
  days(c) {
    return c === 1 ? "dag" : "dagen";
  },
  hours() {
    return "uur";
  },
  minutes(c) {
    return c === 1 ? "minuut" : "minuten";
  },
  seconds(c) {
    return c === 1 ? "seconde" : "seconden";
  },
  decimal: ","
};

export default lang;
