import { DurationUnit, DurationObj } from "../types";
/**
 * The ISO8601 regex for matching / testing durations
 */
declare const pattern: RegExp;
declare const durationKeys: DurationUnit[];
declare const durationUnitToIsoKey: Record<DurationUnit, string>;
declare const durationZero: DurationObj;
export { pattern, durationKeys, durationUnitToIsoKey, durationZero };
