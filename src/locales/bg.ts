import { LangConfig } from "./types";
import { getSlavicForm } from "./helpers/getSlavicForm";

const lang: LangConfig = {
  years(c) {
    return ["години", "година", "години"][getSlavicForm(c)];
  },
  months(c) {
    return ["месеца", "месец", "месеца"][getSlavicForm(c)];
  },
  weeks(c) {
    return ["седмици", "седмица", "седмици"][getSlavicForm(c)];
  },
  days(c) {
    return ["дни", "ден", "дни"][getSlavicForm(c)];
  },
  hours(c) {
    return ["часа", "час", "часа"][getSlavicForm(c)];
  },
  minutes(c) {
    return ["минути", "минута", "минути"][getSlavicForm(c)];
  },
  seconds(c) {
    return ["секунди", "секунда", "секунди"][getSlavicForm(c)];
  },
  decimal: ","
};

export default lang;
