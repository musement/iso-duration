import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "år";
  },
  months(c) {
    return "månad" + (c === 1 ? "" : "er");
  },
  weeks(c) {
    return "veck" + (c === 1 ? "a" : "or");
  },
  days(c) {
    return "dag" + (c === 1 ? "" : "ar");
  },
  hours(c) {
    return "timm" + (c === 1 ? "e" : "ar");
  },
  minutes(c) {
    return "minut" + (c === 1 ? "" : "er");
  },
  seconds(c) {
    return "sekund" + (c === 1 ? "" : "er");
  },
  decimal: ","
};

export default lang;
