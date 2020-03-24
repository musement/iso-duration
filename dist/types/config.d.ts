import { LangConfig } from "./locales/types";
import { Locales } from "./types";
interface Config {
    locales: Locales;
    setLocales: (T: Locales) => void;
    getLangConfig: (T: string) => LangConfig;
}
declare const config: Config;
export default config;
