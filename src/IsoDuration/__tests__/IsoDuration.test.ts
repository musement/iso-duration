jest.mock("../humanize");
jest.mock("../durationObjToString");

import { IsoDuration } from "../IsoDuration";
import { durationZero } from "../../helpers/contants";
import { humanize } from "../humanize";
import { durationObjToString } from "../durationObjToString";

describe("IsoDuration", () => {
  const durationConfig = {
    ...durationZero,
    days: 5
  };

  const isoDurationObj = new IsoDuration(durationConfig);

  it("parse", () => {
    expect(isoDurationObj.parse()).toEqual(durationConfig);
  });

  it("toString", () => {
    isoDurationObj.toString();
    expect(durationObjToString).toHaveBeenCalledWith(durationConfig);
  });

  it("humanize", () => {
    isoDurationObj.humanize("pl");
    expect(humanize).toHaveBeenCalledWith(durationConfig, "pl");
  });
});
