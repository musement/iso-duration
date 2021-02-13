import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "năm";
  },
  months() {
    return "tháng";
  },
  weeks() {
    return "tuần";
  },
  days() {
    return "ngày";
  },
  hours() {
    return "giờ";
  },
  minutes() {
    return "phút";
  },
  seconds() {
    return "giây";
  },
  decimal: ",",
};

export default lang;
