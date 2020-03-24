import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "år";
  },
  months(c) {
    return "måned" + (c === 1 ? "" : "er");
  },
  weeks(c) {
    return "uke" + (c === 1 ? "" : "r");
  },
  days(c) {
    return "dag" + (c === 1 ? "" : "er");
  },
  hours(c) {
    return "time" + (c === 1 ? "" : "r");
  },
  minutes(c) {
    return "minutt" + (c === 1 ? "" : "er");
  },
  seconds(c) {
    return "sekund" + (c === 1 ? "" : "er");
  },
  decimal: ","
};

export default lang;
