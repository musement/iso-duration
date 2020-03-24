import { DurationObj } from "../types";
/** Parse PnYnMnDTnHnMnS format to object
 * @param {string} durationString - PnYnMnDTnHnMnS or PnW formatted string
 * @return {Object} - With a property for each part of the pattern
 */
declare const parseIsoString: (durationString: string) => DurationObj;
/** Normalize not completed Partial DurationObj to DurationObj;
 * ex: { days: 1, not_supported_key: 'bar' } => { years: 0, months: 0 days: 1, hours: 0, minutes: 0, seconds: 0 }
 * @param partialDurationObj
 */
declare const normalizeDurationObj: (partialDurationObj: Partial<DurationObj>) => DurationObj;
export { parseIsoString, normalizeDurationObj };
