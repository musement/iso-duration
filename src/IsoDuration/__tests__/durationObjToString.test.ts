import { durationObjToString } from "../durationObjToString";
import { durationZero } from "../../helpers/contants";

describe("durationObjToString", () => {
  it("should return correct iso duration object with weeks", () => {
    expect(
      durationObjToString({
        ...durationZero,
        weeks: 10
      })
    ).toEqual("P10W");

    expect(
      durationObjToString({
        ...durationZero,
        weeks: 4.5
      })
    ).toEqual("P4.5W");

    expect(
      durationObjToString({
        ...durationZero,
        weeks: 100000
      })
    ).toEqual("P100000W");
  });

  it("should return correct iso duration object without weeks", () => {
    expect(
      durationObjToString({
        ...durationZero,
        years: 1,
        months: 2,
        days: 3,
        hours: 4,
        minutes: 5,
        seconds: 6
      })
    ).toEqual("P1Y2M3DT4H5M6S");

    expect(
      durationObjToString({
        ...durationZero,
        years: 1,
        seconds: 6
      })
    ).toEqual("P1YT6S");

    expect(
      durationObjToString({
        ...durationZero,
        days: 8
      })
    ).toEqual("P8D");

    expect(
      durationObjToString({
        ...durationZero,
        seconds: 8
      })
    ).toEqual("PT8S");

    expect(durationObjToString(durationZero)).toEqual("P0D");
  });
});
