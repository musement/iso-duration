import { isoDuration } from "../index";
import config from "../config";
import { normalizeDurationObj, parseIsoString } from "../helpers/utils";
import { IsoDuration } from "../IsoDuration/IsoDuration";

jest.mock("../config");
jest.mock("../helpers/utils");
jest.mock("../IsoDuration/IsoDuration");

describe("isoDuration", () => {
  describe("when isoDuration is called with String", () => {
    const durationString = "P1D";

    beforeAll(() => {
      jest.clearAllMocks();
      isoDuration(durationString);
    });

    it("should call parseIsoString", () => {
      expect(parseIsoString).toHaveBeenCalledWith(durationString);
    });

    it("should not call normalizeDurationObj", () => {
      expect(normalizeDurationObj).not.toHaveBeenCalled();
    });

    it("should call IsoDuration constructor", () => {
      expect(IsoDuration).toHaveBeenCalled();
    });
  });

  describe("when isoDuration is called with an object", () => {
    const durationObj = {
      days: 1
    };

    beforeAll(() => {
      jest.clearAllMocks();
      isoDuration(durationObj);
    });

    it("should call normalizeDurationObj", () => {
      expect(normalizeDurationObj).toHaveBeenCalledWith(durationObj);
    });

    it("should not call parseIsoString", () => {
      expect(parseIsoString).not.toHaveBeenCalled();
    });

    it("should call IsoDuration constructor", () => {
      expect(IsoDuration).toHaveBeenCalled();
    });
  });
});

describe("isoDuration.setLocales", () => {
  it("when isoDuration is called with String", () => {
    const fakeLangConfig: any = {
      lang: "fake config"
    };

    isoDuration.setLocales(fakeLangConfig);
    expect(config.setLocales).toHaveBeenCalledWith(fakeLangConfig);
  });
});
