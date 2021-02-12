jest.mock("../humanize");
jest.mock("../durationObjToString");

import { IsoDuration } from "../IsoDuration";
import { durationZero } from "../../helpers/contants";
import { humanize } from "../humanize";
import { durationObjToString } from "../durationObjToString";

describe("IsoDuration", () => {
  const durationConfig = {
    ...durationZero,
    days: 5,
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
    expect(humanize).toHaveBeenLastCalledWith(durationConfig, "pl", undefined);

    isoDurationObj.humanize("pl", { largest: 2 });
    expect(humanize).toHaveBeenLastCalledWith(durationConfig, "pl", {
      largest: 2,
    });
  });
});
