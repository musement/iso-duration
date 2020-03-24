import { DurationObj } from "../types";
import { durationObjToString } from "./durationObjToString";
import { humanize } from "./humanize";

export class IsoDuration {
  private durationObj: DurationObj;

  constructor(durationObj: DurationObj) {
    this.durationObj = durationObj;
  }

  public parse(): DurationObj {
    return this.durationObj;
  }

  public toString(): string {
    return durationObjToString(this.durationObj);
  }

  public humanize(lang: string): string {
    return humanize(this.durationObj, lang);
  }
}
