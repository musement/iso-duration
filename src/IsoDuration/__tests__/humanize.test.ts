import { humanize } from "../humanize";
import { durationZero } from "../../helpers/contants";

const mockedLangConfig = {
  years: jest.fn(),
  months: jest.fn(),
  weeks: jest.fn(),
  days: jest.fn(),
  hours: jest.fn(),
  minutes: jest.fn(),
  seconds: jest.fn()
};

jest.mock("../../config", () => {
  return {
    getLangConfig: jest.fn(() => mockedLangConfig)
  };
});
import config from "../../config";

describe("humanize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("when humanize is called with weeks obj", () => {
    const durationObj = {
      ...durationZero,
      weeks: 5
    };
    const lang = "pl";
    humanize(durationObj, lang);
    expect(config.getLangConfig).toHaveBeenCalledWith(lang);
    expect(mockedLangConfig.weeks).toHaveBeenCalledWith(durationObj.weeks);
    expect(mockedLangConfig.days).not.toHaveBeenCalled();
  });

  it("when humanize is called with dates obj", () => {
    const durationObj = {
      ...durationZero,
      days: 5,
      hours: 12
    };
    const lang = "en";
    humanize(durationObj, lang);
    expect(config.getLangConfig).toHaveBeenCalledWith(lang);
    expect(mockedLangConfig.weeks).not.toHaveBeenCalled();
    expect(mockedLangConfig.days).toHaveBeenCalledWith(durationObj.days);
    expect(mockedLangConfig.hours).toHaveBeenCalledWith(durationObj.hours);
  });
});
