import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "سال";
  },
  months() {
    return "ماه";
  },
  weeks() {
    return "هفته";
  },
  days() {
    return "روز";
  },
  hours() {
    return "ساعت";
  },
  minutes() {
    return "دقیقه";
  },
  seconds() {
    return "ثانیه";
  },
  decimal: "."
};

export default lang;
