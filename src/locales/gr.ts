import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return c === 1 ? "χρόνος" : "χρόνια";
  },
  months(c) {
    return c === 1 ? "μήνας" : "μήνες";
  },
  weeks(c) {
    return c === 1 ? "εβδομάδα" : "εβδομάδες";
  },
  days(c) {
    return c === 1 ? "μέρα" : "μέρες";
  },
  hours(c) {
    return c === 1 ? "ώρα" : "ώρες";
  },
  minutes(c) {
    return c === 1 ? "λεπτό" : "λεπτά";
  },
  seconds(c) {
    return c === 1 ? "δευτερόλεπτο" : "δευτερόλεπτα";
  },
  decimal: ","
};

export default lang;
