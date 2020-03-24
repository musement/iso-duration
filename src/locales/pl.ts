import { LangConfig } from "./types";
import { getPolishForm } from "./helpers/getPolishForm";

const lang: LangConfig = {
  years: function(c) {
    return ["rok", "roku", "lata", "lat"][getPolishForm(c)];
  },
  months: function(c) {
    return ["miesiąc", "miesiąca", "miesiące", "miesięcy"][getPolishForm(c)];
  },
  weeks: function(c) {
    return ["tydzień", "tygodnia", "tygodnie", "tygodni"][getPolishForm(c)];
  },
  days: function(c) {
    return ["dzień", "dnia", "dni", "dni"][getPolishForm(c)];
  },
  hours: function(c) {
    return ["godzina", "godziny", "godziny", "godzin"][getPolishForm(c)];
  },
  minutes: function(c) {
    return ["minuta", "minuty", "minuty", "minut"][getPolishForm(c)];
  },
  seconds: function(c) {
    return ["sekunda", "sekundy", "sekundy", "sekund"][getPolishForm(c)];
  },
  decimal: ","
};

export default lang;
