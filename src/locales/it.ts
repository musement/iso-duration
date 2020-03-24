import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return "ann" + (c === 1 ? "o" : "i");
  },
  months(c) {
    return "mes" + (c === 1 ? "e" : "i");
  },
  weeks(c) {
    return "settiman" + (c === 1 ? "a" : "e");
  },
  days(c) {
    return "giorn" + (c === 1 ? "o" : "i");
  },
  hours(c) {
    return "or" + (c === 1 ? "a" : "e");
  },
  minutes(c) {
    return "minut" + (c === 1 ? "o" : "i");
  },
  seconds(c) {
    return "second" + (c === 1 ? "o" : "i");
  },
  decimal: ","
};

export default lang;
