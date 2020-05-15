import { DurationObj, DurationUnit } from "../types";
import { durationUnitToIsoKey } from "../helpers/contants";

const getIsoDateElements = (durationObj: DurationObj): string => {
  const isoItems: DurationUnit[] = ["years", "months", "days"];
  let isoDate = "";
  for (const item of isoItems) {
    if (durationObj[item]) {
      isoDate += `${durationObj[item]}${durationUnitToIsoKey[item]}`;
    }
  }
  return isoDate;
};

const getIsoTimeElements = (durationObj: DurationObj): string => {
  const isoItems: DurationUnit[] = ["hours", "minutes", "seconds"];
  let isoDate = "";
  for (const item of isoItems) {
    if (durationObj[item]) {
      isoDate += `${durationObj[item]}${durationUnitToIsoKey[item]}`;
    }
  }
  return isoDate;
};

const durationObjToString = (durationObj: DurationObj): string => {
  if (durationObj.weeks > 0) {
    return `P${durationObj.weeks}W`;
  } else {
    let durationIsoString = "P";

    const isoDateElement = getIsoDateElements(durationObj);
    if (isoDateElement) {
      durationIsoString += isoDateElement;
    }

    const isoTimeElement = getIsoTimeElements(durationObj);
    if (isoTimeElement) {
      durationIsoString += `T${isoTimeElement}`;
    }

    if (!isoDateElement && !isoTimeElement) {
      durationIsoString += "0D";
    }

    return durationIsoString;
  }
};

export { durationObjToString };
