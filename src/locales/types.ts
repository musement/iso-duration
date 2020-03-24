import { DurationUnit } from "../types";

type TranslationFunction = Record<DurationUnit, (C: number) => string>;

interface LangOptions {
  decimal: string;
}

type LangConfig = TranslationFunction & LangOptions;

export { LangConfig };
