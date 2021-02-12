import { LangConfig } from "./types";
import { getArabicForm } from "./helpers/getArabicForm";

const lang: LangConfig = {
  years(c) {
    return c === 1 ? "سنة" : "سنوات";
  },
  months(c) {
    return c === 1 ? "شهر" : "أشهر";
  },
  weeks(c) {
    return c === 1 ? "أسبوع" : "أسابيع";
  },
  days(c) {
    return c === 1 ? "يوم" : "أيام";
  },
  hours(c) {
    return c === 1 ? "ساعة" : "ساعات";
  },
  minutes(c) {
    return ["دقيقة", "دقائق"][getArabicForm(c)];
  },
  seconds(c) {
    return c === 1 ? "ثانية" : "ثواني";
  },
  decimal: ",",
};

export default lang;
