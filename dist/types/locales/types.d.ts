import { DurationUnit } from "../types";
declare type TranslationFunction = Record<DurationUnit, (C: number) => string>;
interface LangOptions {
    decimal: string;
}
declare type LangConfig = TranslationFunction & LangOptions;
export { LangConfig };
