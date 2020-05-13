import { DurationObj, Locales, LocalesOptions } from "./types";
import { normalizeDurationObj, parseIsoString } from "./helpers/utils";
import config from "./config";
import { IsoDuration } from "./IsoDuration/IsoDuration";

function isoDuration(duration: string | Partial<DurationObj>): IsoDuration {
  if (typeof duration === "string") {
    return new IsoDuration(parseIsoString(duration));
  }
  return new IsoDuration(normalizeDurationObj(duration));
}

isoDuration.setLocales = function(
  obj: Locales,
  options?: LocalesOptions
): void {
  config.setLocales(obj, options);
};

export { isoDuration };
export * from "./locales";
