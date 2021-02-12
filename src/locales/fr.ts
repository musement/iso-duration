import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    return "an" + (c >= 2 ? "s" : "");
  },
  months() {
    return "mois";
  },
  weeks(c) {
    return "semaine" + (c >= 2 ? "s" : "");
  },
  days(c) {
    return "jour" + (c >= 2 ? "s" : "");
  },
  hours(c) {
    return "heure" + (c >= 2 ? "s" : "");
  },
  minutes(c) {
    return "minute" + (c >= 2 ? "s" : "");
  },
  seconds(c) {
    return "seconde" + (c >= 2 ? "s" : "");
  },
  decimal: ",",
};

export default lang;
