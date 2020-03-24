import { LangConfig } from "./locales/types";
import { Locales } from "./types";

interface Config {
  locales: Locales;
  setLocales: (T: Locales) => void;
  getLangConfig: (T: string) => LangConfig;
}

const config: Config = {
  locales: {},
  setLocales(locales) {
    this.locales = {
      ...this.locales,
      ...locales
    };
  },
  getLangConfig(lang) {
    const localesConfig = this.locales[lang];
    if (!localesConfig) {
      throw new Error(
        `isoDuration: Translations for language: ${lang} are not provided`
      );
    }
    return localesConfig;
  }
};

export default config;
