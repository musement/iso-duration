import { LangConfig } from "./locales/types";

type DurationUnit =
  | "weeks"
  | "years"
  | "months"
  | "days"
  | "hours"
  | "minutes"
  | "seconds";

type DurationObj = {
  [K in DurationUnit]: number;
};

interface Locales {
  [key: string]: LangConfig;
}

interface LocalesOptions {
  fallbackLocale?: string;
}

interface HumanizeConfig {
  largest?: number;
}

export { DurationUnit, DurationObj, Locales, HumanizeConfig, LocalesOptions };
