import { DurationObj, HumanizeConfig } from "../types";
import config from "../config";

const humanizeWeek = (durationObj: DurationObj, lang: string): string => {
  const localeConfig = config.getLangConfig(lang);
  return `${durationObj.weeks} ${localeConfig.weeks(durationObj.weeks)}`;
};

const humanizeDate = (
  durationObj: DurationObj,
  lang: string,
  humanizeConfig?: HumanizeConfig
): string => {
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

  let numOfHumanizedUnits = 0;

  for (let index = 0; index < humanizeOrder.length; index++) {
    const item = humanizeOrder[index];
    const unitDuration = durationObj[item];
    if (unitDuration) {
      if (humanizedTime !== "") {
        humanizedTime += " ";
      }
      humanizedTime += `${unitDuration} ${localeConfig[item](unitDuration)}`;
      numOfHumanizedUnits++;

      if (
        humanizeConfig &&
        humanizeConfig.largest &&
        humanizeConfig.largest <= numOfHumanizedUnits
      ) {
        break;
      }
    }
  }

  return humanizedTime;
};

const humanize = (
  durationObj: DurationObj,
  lang: string,
  humanizeConfig?: HumanizeConfig
) => {
  if (durationObj.weeks > 0) {
    return humanizeWeek(durationObj, lang);
  } else {
    return humanizeDate(durationObj, lang, humanizeConfig);
  }
};

export { humanize };
