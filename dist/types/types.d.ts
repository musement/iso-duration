import { LangConfig } from "./locales/types";
declare type DurationUnit = "weeks" | "years" | "months" | "days" | "hours" | "minutes" | "seconds";
declare type DurationObj = {
    [K in DurationUnit]: number;
};
interface Locales {
    [key: string]: LangConfig;
}
interface HumanizeConfig {
    largest?: number;
}
export { DurationUnit, DurationObj, Locales, HumanizeConfig };
