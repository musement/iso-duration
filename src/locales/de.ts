import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return "Jahr" + (c === 1 ? "" : "e");
  },
  months(c) {
    return "Monat" + (c === 1 ? "" : "e");
  },
  weeks(c) {
    return "Woche" + (c === 1 ? "" : "n");
  },
  days(c) {
    return "Tag" + (c === 1 ? "" : "e");
  },
  hours(c) {
    return "Stunde" + (c === 1 ? "" : "n");
  },
  minutes(c) {
    return "Minute" + (c === 1 ? "" : "n");
  },
  seconds(c) {
    return "Sekunde" + (c === 1 ? "" : "n");
  },
  decimal: ","
};

export default lang;
