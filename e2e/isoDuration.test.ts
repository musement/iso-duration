import { isoDuration, en } from "..";
isoDuration.setLocales({ en });

describe("isoDuration", () => {
  describe("when duration is created from ISO code", () => {
    const duration = isoDuration("P1Y2M3DT4H5M6.5S");

    it("parse method should return valid object", () => {
      expect(duration.parse()).toEqual({
        weeks: 0,
        years: 1,
        months: 2,
        days: 3,
        hours: 4,
        minutes: 5,
        seconds: 6.5
      });
    });

    it("toString string should return valid ISO string", () => {
      expect(duration.toString()).toEqual("P1Y2M3DT4H5M6.5S");
    });

    it("humanize should return correct text", () => {
      expect(duration.humanize("en")).toEqual(
        "1 year 2 months 3 days 4 hours 5 minutes 6.5 seconds"
      );
    });
  });

  describe("when duration is created from an Object", () => {
    const duration = isoDuration({
      years: 1,
      months: 2,
      days: 3,
      hours: 4,
      minutes: 5,
      seconds: 6.5
    });

    it("parse method should return valid object", () => {
      expect(duration.parse()).toEqual({
        weeks: 0,
        years: 1,
        months: 2,
        days: 3,
        hours: 4,
        minutes: 5,
        seconds: 6.5
      });
    });

    it("toString string should return valid ISO string", () => {
      expect(duration.toString()).toEqual("P1Y2M3DT4H5M6.5S");
    });

    it("humanize should return correct text", () => {
      expect(duration.humanize("en")).toEqual(
        "1 year 2 months 3 days 4 hours 5 minutes 6.5 seconds"
      );
    });
  });

  describe("when duration is created with invalid string", () => {
    it("should throw an error", () => {
      expect(() => isoDuration("invalid_test")).toThrow(Error);
    });
  });

  describe("when humanized is called with not included language", () => {
    const duration = isoDuration("P1W");
    it("should throw an error", () => {
      expect(() => duration.humanize("not_included_lang")).toThrow(Error);
    });
  });
});
