import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return "año" + (c === 1 ? "" : "s");
  },
  months(c) {
    return "mes" + (c === 1 ? "" : "es");
  },
  weeks(c) {
    return "semana" + (c === 1 ? "" : "s");
  },
  days(c) {
    return "día" + (c === 1 ? "" : "s");
  },
  hours(c) {
    return "hora" + (c === 1 ? "" : "s");
  },
  minutes(c) {
    return "minuto" + (c === 1 ? "" : "s");
  },
  seconds(c) {
    return "segundo" + (c === 1 ? "" : "s");
  },
  decimal: ","
};

export default lang;
