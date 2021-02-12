import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "년";
  },
  months() {
    return "개월";
  },
  weeks() {
    return "주일";
  },
  days() {
    return "일";
  },
  hours() {
    return "시간";
  },
  minutes() {
    return "분";
  },
  seconds() {
    return "초";
  },
  decimal: ".",
};

export default lang;
