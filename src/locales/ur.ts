import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "سال";
  },
  months(c) {
    return c === 1 ? "مہینہ" : "مہینے";
  },
  weeks(c) {
    return c === 1 ? "ہفتہ" : "ہفتے";
  },
  days() {
    return "دن";
  },
  hours(c) {
    return c === 1 ? "گھنٹہ" : "گھنٹے";
  },
  minutes() {
    return "منٹ";
  },
  seconds() {
    return "سیکنڈ";
  },
  decimal: "."
};

export default lang;
