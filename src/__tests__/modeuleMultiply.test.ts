import { multiply } from "../moduleMultiply";

describe("multiply", () => {
  it("multiply 2 + 2 to equal 4", () => {
    expect(multiply(2, 2)).toBe(4);
  });
});
