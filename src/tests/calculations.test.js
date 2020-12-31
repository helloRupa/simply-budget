import * as calc from "../utils/calculate";

describe("calculations", () => {
  describe("totalSpent", () => {
    it("can handle an empty list of expenditures", () => {
      expect(calc.totalSpent({}, 4)).toBe(0);
    });

    it("can sums the correct amount for a chosen budget", () => {
      const exps = {
        1: [{ amount: 20.25 }, { amount: 30 }],
        2: [{ amount: 13.5 }, { amount: 20.89 }],
        3: [{ amount: 10 }, { amount: 15.6 }, { amount: 5.89 }],
      };
      const budgetId = 3;
      const total = exps[budgetId].reduce(
        (total, exp) => total + exp.amount,
        0
      );

      expect(calc.totalSpent(exps, budgetId)).toBe(total);
    });
  });

  describe("calculateTracking", () => {
    const budget = () => ({
      id: 1,
      limit: 200.5,
      currentPeriod: 5,
      truncated: 0,
    });

    const spent = 1000;
    const expenditures = () => ({
      1: [{ budgetId: 1, amount: spent }],
    });

    it("returns the amount left to spend based on the current period and amount spent", () => {
      const b = budget();
      const exps = expenditures();
      const total = b.currentPeriod * b.limit - spent;

      expect(calc.calculateTracking({ expenditures: exps, budget: b })).toBe(
        total
      );
    });

    it("can accounts for truncated values", () => {
      const truncated = 10.5;
      const b = budget();
      b.truncated = truncated;
      const exps = expenditures();
      const total = b.currentPeriod * b.limit - spent - truncated;

      expect(calc.calculateTracking({ expenditures: exps, budget: b })).toBe(
        total
      );
    });

    it("can handle overspending", () => {
      const b = budget();
      const overspend = b.limit * b.currentPeriod * 3;
      const exps = expenditures();
      exps[1][0].amount = overspend;
      const total = b.currentPeriod * b.limit - overspend;

      expect(calc.calculateTracking({ expenditures: exps, budget: b })).toBe(
        total
      );
    });

    it("can returns 0 for a budget that hasn't started", () => {
      const b = budget();
      b.currentPeriod = 0;
      const exps = expenditures();
      const total = 0;

      expect(calc.calculateTracking({ expenditures: exps, budget: b })).toBe(
        total
      );
    });
  });
});
