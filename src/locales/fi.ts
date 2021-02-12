import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return c === 1 ? "vuosi" : "vuotta";
  },
  months(c) {
    return c === 1 ? "kuukausi" : "kuukautta";
  },
  weeks(c) {
    return "viikko" + (c === 1 ? "" : "a");
  },
  days(c) {
    return "päivä" + (c === 1 ? "" : "ä");
  },
  hours(c) {
    return "tunti" + (c === 1 ? "" : "a");
  },
  minutes(c) {
    return "minuutti" + (c === 1 ? "" : "a");
  },
  seconds(c) {
    return "sekunti" + (c === 1 ? "" : "a");
  },
  decimal: ",",
};

export default lang;
