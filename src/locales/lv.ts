import { LangConfig } from "./types";
import { getLatvianForm } from "./helpers/getLatvianForm";

const lang: LangConfig = {
  years(c) {
    return ["gads", "gadi"][getLatvianForm(c)];
  },
  months(c) {
    return ["mēnesis", "mēneši"][getLatvianForm(c)];
  },
  weeks(c) {
    return ["nedēļa", "nedēļas"][getLatvianForm(c)];
  },
  days(c) {
    return ["diena", "dienas"][getLatvianForm(c)];
  },
  hours(c) {
    return ["stunda", "stundas"][getLatvianForm(c)];
  },
  minutes(c) {
    return ["minūte", "minūtes"][getLatvianForm(c)];
  },
  seconds(c) {
    return ["sekunde", "sekundes"][getLatvianForm(c)];
  },
  decimal: ","
};

export default lang;
