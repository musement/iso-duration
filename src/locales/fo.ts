import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "ár";
  },
  months(c) {
    return c === 1 ? "mánaður" : "mánaðir";
  },
  weeks(c) {
    return c === 1 ? "vika" : "vikur";
  },
  days(c) {
    return c === 1 ? "dagur" : "dagar";
  },
  hours(c) {
    return c === 1 ? "tími" : "tímar";
  },
  minutes(c) {
    return c === 1 ? "minuttur" : "minuttir";
  },
  seconds() {
    return "sekund";
  },
  decimal: ","
};

export default lang;
