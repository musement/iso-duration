import { DurationObj, HumanizeConfig } from "../types";
declare const humanize: (durationObj: DurationObj, lang: string, humanizeConfig?: HumanizeConfig | undefined) => string;
export { humanize };
