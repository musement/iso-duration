import { LangConfig } from "./types";
import { getCzechOrSlovakForm } from "./helpers/getCzechOrSlovakForm";

const lang: LangConfig = {
  years(c) {
    return ["rok", "roku", "roky", "let"][getCzechOrSlovakForm(c)];
  },
  months(c) {
    return ["měsíc", "měsíce", "měsíce", "měsíců"][getCzechOrSlovakForm(c)];
  },
  weeks(c) {
    return ["týden", "týdne", "týdny", "týdnů"][getCzechOrSlovakForm(c)];
  },
  days(c) {
    return ["den", "dne", "dny", "dní"][getCzechOrSlovakForm(c)];
  },
  hours(c) {
    return ["hodina", "hodiny", "hodiny", "hodin"][getCzechOrSlovakForm(c)];
  },
  minutes(c) {
    return ["minuta", "minuty", "minuty", "minut"][getCzechOrSlovakForm(c)];
  },
  seconds(c) {
    return ["sekunda", "sekundy", "sekundy", "sekund"][getCzechOrSlovakForm(c)];
  },
  decimal: ",",
};

export default lang;
