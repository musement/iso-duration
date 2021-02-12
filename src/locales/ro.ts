import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return c === 1 ? "an" : "ani";
  },
  months(c) {
    return c === 1 ? "lună" : "luni";
  },
  weeks(c) {
    return c === 1 ? "săptămână" : "săptămâni";
  },
  days(c) {
    return c === 1 ? "zi" : "zile";
  },
  hours(c) {
    return c === 1 ? "oră" : "ore";
  },
  minutes(c) {
    return c === 1 ? "minut" : "minute";
  },
  seconds(c) {
    return c === 1 ? "secundă" : "secunde";
  },
  decimal: ",",
};

export default lang;
