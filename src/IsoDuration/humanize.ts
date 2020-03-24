import { DurationObj } from "../types";
import config from "../config";

const humanizeWeek = (durationObj: DurationObj, lang: string): string => {
  const localeConfig = config.getLangConfig(lang);
  return `${durationObj.weeks} ${localeConfig.weeks(durationObj.weeks)}`;
};

const humanizeDate = (durationObj: DurationObj, lang: string): string => {
  const localeConfig = config.getLangConfig(lang);
  let humanizedTime = "";
  const humanizeOrder: (keyof DurationObj)[] = [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
    "seconds"
  ];
  humanizeOrder.forEach((item, index) => {
    const unitDuration = durationObj[item];
    if (unitDuration) {
      if (humanizedTime !== "") {
        humanizedTime += " ";
      }
      humanizedTime += `${unitDuration} ${localeConfig[item](unitDuration)}`;
    }
  });

  return humanizedTime;
};

const humanize = (durationObj: DurationObj, lang: string) => {
  if (durationObj.weeks > 0) {
    return humanizeWeek(durationObj, lang);
  } else {
    return humanizeDate(durationObj, lang);
  }
};

export { humanize };
