import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "年";
  },
  months() {
    return "個月";
  },
  weeks() {
    return "周";
  },
  days() {
    return "天";
  },
  hours() {
    return "小時";
  },
  minutes() {
    return "分鐘";
  },
  seconds() {
    return "秒";
  },
  decimal: "."
};

export default lang;
