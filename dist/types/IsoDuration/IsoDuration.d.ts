import { DurationObj } from "../types";
export declare class IsoDuration {
    private durationObj;
    constructor(durationObj: DurationObj);
    parse(): DurationObj;
    toString(): string;
    humanize(lang: string): string;
}
