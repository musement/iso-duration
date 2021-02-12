import { DurationObj, HumanizeConfig, DurationUnit } from "../types";
import { durationObjToString } from "./durationObjToString";
import { humanize } from "./humanize";
import { normalize } from "./normalize";

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

  public humanize(lang: string, config?: HumanizeConfig): string {
    return humanize(this.durationObj, lang, config);
  }

  public normalize(date?: Date): IsoDuration {
    this.durationObj = normalize(this.durationObj, date);
    return this;
  }

  public isEmpty(): boolean {
    return Object.keys(this.durationObj).every(
      (key) => this.durationObj[key as DurationUnit] === 0
    );
  }
}
