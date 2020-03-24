import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "ár";
  },
  months(c) {
    return "mánuð" + (c === 1 ? "ur" : "ir");
  },
  weeks(c) {
    return "vik" + (c === 1 ? "a" : "ur");
  },
  days(c) {
    return "dag" + (c === 1 ? "ur" : "ar");
  },
  hours(c) {
    return "klukkutím" + (c === 1 ? "i" : "ar");
  },
  minutes(c) {
    return "mínút" + (c === 1 ? "a" : "ur");
  },
  seconds(c) {
    return "sekúnd" + (c === 1 ? "a" : "ur");
  },
  decimal: "."
};

export default lang;
