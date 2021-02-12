import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "年";
  },
  months() {
    return "月";
  },
  weeks() {
    return "週";
  },
  days() {
    return "日";
  },
  hours() {
    return "時間";
  },
  minutes() {
    return "分";
  },
  seconds() {
    return "秒";
  },
  decimal: ".",
};

export default lang;
