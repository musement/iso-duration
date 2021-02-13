import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return "aasta" + (c === 1 ? "" : "t");
  },
  months(c) {
    return "kuu" + (c === 1 ? "" : "d");
  },
  weeks(c) {
    return "nädal" + (c === 1 ? "" : "at");
  },
  days(c) {
    return "päev" + (c === 1 ? "" : "a");
  },
  hours(c) {
    return "tund" + (c === 1 ? "" : "i");
  },
  minutes(c) {
    return "minut" + (c === 1 ? "" : "it");
  },
  seconds(c) {
    return "sekund" + (c === 1 ? "" : "it");
  },
  decimal: ",",
};

export default lang;
