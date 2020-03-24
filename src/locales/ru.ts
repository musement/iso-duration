import { LangConfig } from "./types";
import { getSlavicForm } from "./helpers/getSlavicForm";

const lang: LangConfig = {
  years(c) {
    return ["лет", "год", "года"][getSlavicForm(c)];
  },
  months(c) {
    return ["месяцев", "месяц", "месяца"][getSlavicForm(c)];
  },
  weeks(c) {
    return ["недель", "неделя", "недели"][getSlavicForm(c)];
  },
  days(c) {
    return ["дней", "день", "дня"][getSlavicForm(c)];
  },
  hours(c) {
    return ["часов", "час", "часа"][getSlavicForm(c)];
  },
  minutes(c) {
    return ["минут", "минута", "минуты"][getSlavicForm(c)];
  },
  seconds(c) {
    return ["секунд", "секунда", "секунды"][getSlavicForm(c)];
  },
  decimal: ","
};

export default lang;
