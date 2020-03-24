import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "年";
  },
  months() {
    return "个月";
  },
  weeks() {
    return "周";
  },
  days() {
    return "天";
  },
  hours() {
    return "小时";
  },
  minutes() {
    return "分钟";
  },
  seconds() {
    return "秒";
  },
  decimal: "."
};

export default lang;
