import { LangConfig } from "./locales/types";
import { Locales, LocalesOptions } from "./types";
interface Config {
    locales: Locales;
    options: LocalesOptions;
    setLocales: (T: Locales, options?: LocalesOptions) => void;
    getLangConfig: (T: string) => LangConfig;
}
declare const config: Config;
export default config;
