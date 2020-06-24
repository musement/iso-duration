import { parseIsoString, normalizeDurationObj } from "../utils";
import { durationZero } from "../contants";

describe("parseIsoString", () => {
  describe("when string match weeks format (PnW)", () => {
    it("should return object only with weeks", () => {
      expect(parseIsoString("P1W")).toEqual({
        ...durationZero,
        weeks: 1
      });

      expect(parseIsoString("P8W")).toEqual({
        ...durationZero,
        weeks: 8
      });

      expect(parseIsoString("P1.5W")).toEqual({
        ...durationZero,
        weeks: 1.5
      });
    });
  });

  describe("when string match date format (PnYnMnDTnHnMnS)", () => {
    it("should return object only with dates info", () => {
      expect(parseIsoString("P3Y6M4DT12H30M5S")).toEqual({
        ...durationZero,
        years: 3,
        months: 6,
        days: 4,
        hours: 12,
        minutes: 30,
        seconds: 5
      });

      expect(parseIsoString("PT100S")).toEqual({
        ...durationZero,
        seconds: 100
      });

      expect(parseIsoString("P1.5Y")).toEqual({
        ...durationZero,
        years: 1.5
      });

      expect(parseIsoString("P0Y0D")).toEqual({
        ...durationZero
      });
    });
  });

  describe("when string does not match any format (PnYnMnDTnHnMnS)", () => {
    it("should throw an error", () => {
      expect(() => parseIsoString("P1W2M")).toThrow(Error);
      expect(() => parseIsoString("foo")).toThrow(Error);
      expect(() => parseIsoString("P15S20M")).toThrow(Error);
      expect(() => parseIsoString("")).toThrow(Error);
    });
  });
});

describe("normalizeDurationObj", () => {
  it("should return full durationObject", () => {
    expect(normalizeDurationObj({ months: 1, days: 10 })).toEqual({
      ...durationZero,
      months: 1,
      days: 10
    });
  });

  describe("when partial duration contains not supported keys", () => {
    it("should drop those keys from the final object", () => {
      expect(normalizeDurationObj({ days: 5, foo: "bar" } as any)).toEqual({
        ...durationZero,
        days: 5
      });
    });
  });

  describe("when partial duration contains weeks", () => {
    it("should return object only with weeks for weeks > 0", () => {
      expect(normalizeDurationObj({ weeks: 1, days: 5 })).toEqual({
        ...durationZero,
        weeks: 1
      });

      expect(normalizeDurationObj({ weeks: 10 })).toEqual({
        ...durationZero,
        weeks: 10
      });
    });

    it("should return object without with weeks for weeks == 0", () => {
      expect(normalizeDurationObj({ weeks: 0, days: 5 })).toEqual({
        ...durationZero,
        days: 5
      });
    });
  });
});
