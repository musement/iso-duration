import { DurationUnit, DurationObj } from "../types";

/**
 * The pattern used for parsing ISO8601 duration (PnYnMnDTnHnMnS).
 */
// PnYnMnDTnHnMnS || PnW
const numbers = "\\d+(?:[\\.,]\\d+)?";
const weekPattern = `(${numbers}W)`;
const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`;
const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`;

const iso8601 = `^P(?:${weekPattern}|${datePattern}(?:${timePattern})?)$`;

/**
 * The ISO8601 regex for matching / testing durations
 */
const pattern = new RegExp(iso8601);

const durationKeys: DurationUnit[] = [
  "weeks",
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds"
];

const durationUnitToIsoKey: Record<DurationUnit, string> = {
  years: "Y",
  months: "M",
  days: "D",
  hours: "H",
  minutes: "M",
  seconds: "S",
  weeks: "W"
};

const durationZero: DurationObj = Object.freeze({
  weeks: 0,
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
});

export { pattern, durationKeys, durationUnitToIsoKey, durationZero };
