import * as calc from "../utils/calculate";

describe("totalSpent", () => {
  it("can handle an empty list of expenditures", () => {
    expect(calc.totalSpent({}, 4)).toBe(0);
  });
});
