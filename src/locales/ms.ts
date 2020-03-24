import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "tahun";
  },
  months() {
    return "bulan";
  },
  weeks() {
    return "minggu";
  },
  days() {
    return "hari";
  },
  hours() {
    return "jam";
  },
  minutes() {
    return "minit";
  },
  seconds() {
    return "saat";
  },
  decimal: "."
};

export default lang;
