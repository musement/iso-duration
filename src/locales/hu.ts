import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "év";
  },
  months() {
    return "hónap";
  },
  weeks() {
    return "hét";
  },
  days() {
    return "nap";
  },
  hours() {
    return "óra";
  },
  minutes() {
    return "perc";
  },
  seconds() {
    return "másodperc";
  },
  decimal: ",",
};

export default lang;
