import { LangConfig } from "./types";

const lang: LangConfig = {
  years() {
    return "ປີ";
  },
  months() {
    return "ເດືອນ";
  },
  weeks() {
    return "ອາທິດ";
  },
  days() {
    return "ມື້";
  },
  hours() {
    return "ຊົ່ວໂມງ";
  },
  minutes() {
    return "ນາທີ";
  },
  seconds() {
    return "ວິນາທີ";
  },
  decimal: ","
};

export default lang;
