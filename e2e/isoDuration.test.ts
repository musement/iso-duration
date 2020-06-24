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

    it("isEmpty should return 'false'", () => {
      expect(duration.isEmpty()).toBe(false);
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

    it("humanize should return correct text length when config is passed", () => {
      expect(duration.humanize("en", { largest: 2 })).toEqual(
        "1 year 2 months"
      );

      expect(duration.humanize("en", { largest: 3 })).toEqual(
        "1 year 2 months 3 days"
      );
    });

    it("isEmpty should return 'false'", () => {
      expect(duration.isEmpty()).toBe(false);
    });
  });

  describe("when duration represents a 0 seconds duration", () => {
    const duration = isoDuration("P0D");

    it("parse method should return valid object", () => {
      expect(duration.parse()).toEqual({
        weeks: 0,
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    });

    it("toString string should return valid ISO string", () => {
      expect(duration.toString()).toEqual("P0D");
    });

    it("humanize should return an empty string", () => {
      expect(duration.humanize("en")).toEqual("");
    });

    it("isEmpty should return 'true'", () => {
      expect(duration.isEmpty()).toBe(true);
    });
  });

  describe("when normalized is called with correct values", () => {
    const duration = isoDuration("PT90S");
    it("should throw an error", () => {
      expect(duration.normalize().toString()).toEqual("PT1M30S");
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

  describe("when value returned from parse method is used to create new duration", () => {
    it("should return the same object after 2nd parse - PnYnMnDTnHnMnS format", () => {
      const duration = isoDuration({
        weeks: 0,
        months: 5
      });

      const firstParse = duration.parse();
      const secondParse = isoDuration(firstParse).parse();
      expect(firstParse).toEqual(secondParse);
    });

    it("should return the same object after 2nd parse - PnW format", () => {
      const duration = isoDuration({
        weeks: 3,
        months: 0
      });

      const firstParse = duration.parse();
      const secondParse = isoDuration(firstParse).parse();
      expect(firstParse).toEqual(secondParse);
    });
  });
});
