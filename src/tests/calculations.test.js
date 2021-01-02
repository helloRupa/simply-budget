import * as calc from "../utils/calculate";
import * as factory from "./factories/budgets_expenses";
import { roundedDecimal } from "./factories/normalizers";
import * as staticData from "./factories/static_data";

const budgetsExpenses = staticData.budgetsExpenses;
const { budgets, expenses } = budgetsExpenses;
const trackingPerBudget = staticData.trackingPerBudget;

describe("calculations", () => {
  describe("totalSpent", () => {
    it("can handle an empty list of expenditures", () => {
      expect(calc.totalSpent({}, 4)).toBe(0);
    });

    it("sums the correct amount for a chosen budget", () => {
      budgets.forEach((budget) => {
        expect(roundedDecimal(calc.totalSpent(expenses, budget.id))).toBe(
          roundedDecimal(staticData.totalSpentPerBudget[budget.id])
        );
      });
    });
  });

  describe("calculateTracking", () => {
    it("returns the amount left to spend based on the current period, truncated value, and amount spent", () => {
      budgets.forEach((budget) => {
        const testTotal = calc.calculateTracking({
          expenditures: expenses,
          budget,
        });

        expect(roundedDecimal(trackingPerBudget[budget.id])).toBe(
          roundedDecimal(testTotal)
        );
      });
    });

    it("returns 0 for a budget that hasn't started", () => {
      const budget = factory.generateBudget(1, Date.now(), 0, 0);
      const expenditures = { 1: [] };
      const total = 0;

      expect(calc.calculateTracking({ expenditures, budget })).toBe(total);
    });
  });

  describe("calculateTotalTracking", () => {
    it("returns the total amount left to spend across all budgets", () => {
      const { budgets, expenses } = budgetsExpenses;
      const testTotal = calc.calculateTotalTracking(budgets, expenses);

      expect(roundedDecimal(testTotal)).toBe(
        roundedDecimal(staticData.totalTrackingAllBudgets)
      );
    });

    it("returns 0 when there are no budgets", () => {
      expect(calc.calculateTotalTracking([], {})).toBe(0);
    });
  });
});
