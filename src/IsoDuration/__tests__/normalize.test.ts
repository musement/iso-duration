import { normalize } from "../normalize";
import { durationZero } from "../../helpers/contants";

describe("normalize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("when normalized is called should return correct value", () => {
    expect(
      normalize({ ...durationZero, seconds: 90 }, new Date(2020, 0, 1))
    ).toEqual({
      ...durationZero,
      minutes: 1,
      seconds: 30,
    });

    expect(
      normalize({ ...durationZero, minutes: 90 }, new Date(2020, 0, 1))
    ).toEqual({
      ...durationZero,
      hours: 1,
      minutes: 30,
    });

    expect(
      normalize({ ...durationZero, hours: 30 }, new Date(2020, 0, 1))
    ).toEqual({
      ...durationZero,
      days: 1,
      hours: 6,
    });

    expect(
      normalize({ ...durationZero, days: 40 }, new Date(2020, 0, 1))
    ).toEqual({
      ...durationZero,
      months: 1,
      days: 9,
    });

    expect(
      normalize({ ...durationZero, months: 18 }, new Date(2020, 0, 1))
    ).toEqual({
      ...durationZero,
      years: 1,
      months: 6,
    });

    expect(
      normalize(
        {
          ...durationZero,
          years: 1,
          months: 13,
          days: 50,
          hours: 30,
          minutes: 120,
          seconds: 90,
        },
        new Date(2020, 0, 1)
      )
    ).toEqual({
      ...durationZero,
      years: 2,
      months: 2,
      days: 20,
      hours: 8,
      minutes: 1,
      seconds: 30,
    });
  });

  describe("when normalized is called with different start date", () => {
    it("should return normalized value with correct days value", () => {
      expect(
        normalize({ ...durationZero, days: 31 }, new Date(2020, 0, 1))
      ).toEqual({
        ...durationZero,
        days: 31,
      });

      expect(
        normalize({ ...durationZero, days: 31 }, new Date(2020, 1, 1))
      ).toEqual({
        ...durationZero,
        months: 1,
        days: 2,
      });

      expect(
        normalize({ ...durationZero, days: 31 }, new Date(2019, 1, 1))
      ).toEqual({
        ...durationZero,
        months: 1,
        days: 3,
      });

      expect(
        normalize({ ...durationZero, days: 31 }, new Date(2020, 3, 1))
      ).toEqual({
        ...durationZero,
        months: 1,
        days: 1,
      });
    });
  });
});
