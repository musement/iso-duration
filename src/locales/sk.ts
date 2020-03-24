import { LangConfig } from "./types";
import { getCzechOrSlovakForm } from "./helpers/getCzechOrSlovakForm";

const lang: LangConfig = {
  years(c) {
    return ["rok", "roky", "roky", "rokov"][getCzechOrSlovakForm(c)];
  },
  months(c) {
    return ["mesiac", "mesiace", "mesiace", "mesiacov"][
      getCzechOrSlovakForm(c)
    ];
  },
  weeks(c) {
    return ["týždeň", "týždne", "týždne", "týždňov"][getCzechOrSlovakForm(c)];
  },
  days(c) {
    return ["deň", "dni", "dni", "dní"][getCzechOrSlovakForm(c)];
  },
  hours(c) {
    return ["hodina", "hodiny", "hodiny", "hodín"][getCzechOrSlovakForm(c)];
  },
  minutes(c) {
    return ["minúta", "minúty", "minúty", "minút"][getCzechOrSlovakForm(c)];
  },
  seconds(c) {
    return ["sekunda", "sekundy", "sekundy", "sekúnd"][getCzechOrSlovakForm(c)];
  },
  decimal: ","
};

export default lang;
