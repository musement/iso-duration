import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "yıl";
  },
  months() {
    return "ay";
  },
  weeks() {
    return "hafta";
  },
  days() {
    return "gün";
  },
  hours() {
    return "saat";
  },
  minutes() {
    return "dakika";
  },
  seconds() {
    return "saniye";
  },
  decimal: ","
};

export default lang;
