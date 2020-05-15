import { LangConfig } from "./locales/types";
import { Locales, LocalesOptions } from "./types";

interface Config {
  locales: Locales;
  options: LocalesOptions;
  setLocales: (T: Locales, options?: LocalesOptions) => void;
  getLangConfig: (T: string) => LangConfig;
}

const config: Config = {
  locales: {},
  options: {},
  setLocales(locales, options) {
    this.locales = {
      ...this.locales,
      ...locales
    };
    if (options) {
      this.options = { ...this.options, ...options };
    }
  },
  getLangConfig(lang: string) {
    let localesConfig = this.locales[lang];
    if (!localesConfig && this.options.fallbackLocale) {
      localesConfig = this.locales[this.options.fallbackLocale];
    }
    if (!localesConfig) {
      throw new Error(
        `isoDuration: Translations for language: ${lang} are not provided`
      );
    }
    return localesConfig;
  }
};

export default config;
