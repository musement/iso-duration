import { LangConfig } from "./types";
import { getLithuanianForm } from "./helpers/getLithuanianForm";

const lang: LangConfig = {
  years(c) {
    return c % 10 === 0 || (c % 100 >= 10 && c % 100 <= 20) ? "metų" : "metai";
  },
  months(c) {
    return ["mėnuo", "mėnesiai", "mėnesių"][getLithuanianForm(c)];
  },
  weeks(c) {
    return ["savaitė", "savaitės", "savaičių"][getLithuanianForm(c)];
  },
  days(c) {
    return ["diena", "dienos", "dienų"][getLithuanianForm(c)];
  },
  hours(c) {
    return ["valanda", "valandos", "valandų"][getLithuanianForm(c)];
  },
  minutes(c) {
    return ["minutė", "minutės", "minučių"][getLithuanianForm(c)];
  },
  seconds(c) {
    return ["sekundė", "sekundės", "sekundžių"][getLithuanianForm(c)];
  },
  decimal: ",",
};

export default lang;
