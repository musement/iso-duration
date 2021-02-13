import { LangConfig } from "./types";
import { getSlavicForm } from "./helpers/getSlavicForm";

const lang: LangConfig = {
  years(c) {
    return ["років", "рік", "роки"][getSlavicForm(c)];
  },
  months(c) {
    return ["місяців", "місяць", "місяці"][getSlavicForm(c)];
  },
  weeks(c) {
    return ["тижнів", "тиждень", "тижні"][getSlavicForm(c)];
  },
  days(c) {
    return ["днів", "день", "дні"][getSlavicForm(c)];
  },
  hours(c) {
    return ["годин", "година", "години"][getSlavicForm(c)];
  },
  minutes(c) {
    return ["хвилин", "хвилина", "хвилини"][getSlavicForm(c)];
  },
  seconds(c) {
    return ["секунд", "секунда", "секунди"][getSlavicForm(c)];
  },
  decimal: ",",
};

export default lang;
