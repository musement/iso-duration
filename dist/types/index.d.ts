import { DurationObj, Locales, LocalesOptions } from "./types";
import { IsoDuration } from "./IsoDuration/IsoDuration";
declare function isoDuration(duration: string | Partial<DurationObj>): IsoDuration;
declare namespace isoDuration {
    var setLocales: (obj: Locales, options?: LocalesOptions | undefined) => void;
}
export { isoDuration };
export * from "./locales";
