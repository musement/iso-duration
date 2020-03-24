import { DurationObj } from "../types";
import { pattern, durationZero, durationKeys } from "./contants";

/** Parse PnYnMnDTnHnMnS format to object
 * @param {string} durationString - PnYnMnDTnHnMnS or PnW formatted string
 * @return {Object} - With a property for each part of the pattern
 */
const parseIsoString = (durationString: string): DurationObj => {
  const durationMatchedPattern = durationString.match(pattern);
  if (!durationMatchedPattern) {
    throw new Error("Invalid duration string");
  }

  return durationMatchedPattern.slice(1).reduce((prev: any, next, idx) => {
    prev[durationKeys[idx]] = parseFloat(next) || 0;
    return prev;
  }, {});
};

/** Normalize not completed Partial DurationObj to DurationObj;
 * ex: { days: 1, not_supported_key: 'bar' } => { years: 0, months: 0 days: 1, hours: 0, minutes: 0, seconds: 0 }
 * @param partialDurationObj
 */
const normalizeDurationObj = (
  partialDurationObj: Partial<DurationObj>
): DurationObj => {
  if (Object.prototype.hasOwnProperty.call(partialDurationObj, "weeks")) {
    return Object.assign({}, durationZero, { weeks: partialDurationObj.weeks });
  }

  return durationKeys.reduce<DurationObj>(
    (res, key) => ({
      ...res,
      [key]: partialDurationObj[key] || 0
    }),
    {} as DurationObj
  );
};

export { parseIsoString, normalizeDurationObj };
