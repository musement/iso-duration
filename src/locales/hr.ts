import { LangConfig } from "./types";

const lang: LangConfig = {
  years(c) {
    if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
      return "godine";
    }
    return "godina";
  },
  months(c) {
    if (c === 1) {
      return "mjesec";
    } else if (c === 2 || c === 3 || c === 4) {
      return "mjeseca";
    }
    return "mjeseci";
  },
  weeks(c) {
    if (c % 10 === 1 && c !== 11) {
      return "tjedan";
    }
    return "tjedna";
  },
  days(c) {
    return c === 1 ? "dan" : "dana";
  },
  hours(c) {
    if (c === 1) {
      return "sat";
    } else if (c === 2 || c === 3 || c === 4) {
      return "sata";
    }
    return "sati";
  },
  minutes(c) {
    const mod10 = c % 10;
    if ((mod10 === 2 || mod10 === 3 || mod10 === 4) && (c < 10 || c > 14)) {
      return "minute";
    }
    return "minuta";
  },
  seconds(c) {
    if (
      c === 10 ||
      c === 11 ||
      c === 12 ||
      c === 13 ||
      c === 14 ||
      c === 16 ||
      c === 17 ||
      c === 18 ||
      c === 19 ||
      c % 10 === 5
    ) {
      return "sekundi";
    } else if (c % 10 === 1) {
      return "sekunda";
    } else if (c % 10 === 2 || c % 10 === 3 || c % 10 === 4) {
      return "sekunde";
    }
    return "sekundi";
  },
  decimal: ","
};

export default lang;
