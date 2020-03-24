import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return "any" + (c === 1 ? "" : "s");
  },
  months(c) {
    return "mes" + (c === 1 ? "" : "os");
  },
  weeks(c) {
    return "setman" + (c === 1 ? "a" : "es");
  },
  days(c) {
    return "di" + (c === 1 ? "a" : "es");
  },
  hours(c) {
    return "hor" + (c === 1 ? "a" : "es");
  },
  minutes(c) {
    return "minut" + (c === 1 ? "" : "s");
  },
  seconds(c) {
    return "segon" + (c === 1 ? "" : "s");
  },
  decimal: ","
};

export default lang;
