import { DurationObj, HumanizeConfig } from "../types";
export declare class IsoDuration {
    private durationObj;
    constructor(durationObj: DurationObj);
    parse(): DurationObj;
    toString(): string;
    humanize(lang: string, config?: HumanizeConfig): string;
    normalize(date?: Date): IsoDuration;
}
