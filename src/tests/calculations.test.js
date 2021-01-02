import * as calc from "../utils/calculate";
import * as factory from "./factories/budgets_expenses";
import * as validators from "./factories/validators";
import { roundedDecimal } from "./factories/normalizers";

describe("calculations", () => {
  describe("totalSpent", () => {
    it("can handle an empty list of expenditures", () => {
      expect(calc.totalSpent({}, 4)).toBe(0);
    });

    it("sums the correct amount for a chosen budget", () => {
      const budgetId = 3;
      const budgetsExpenses = factory.generateBudgetsAndExpenses(
        budgetId,
        "2020/12/25",
        10,
        0
      );
      const total = validators.totalSpent(budgetsExpenses, budgetId);

      expect(calc.totalSpent(budgetsExpenses.expenses, budgetId)).toBe(total);
    });
  });

  describe("calculateTracking", () => {
    const budgetsExpenses = factory.generateBudgetsAndExpenses(
      1,
      Date.now(),
      7,
      factory.randomAmount(200, 27)
    );
    const { budgets, expenses } = budgetsExpenses;

    it("returns the amount left to spend based on the current period, truncated value, and amount spent", () => {
      const budget = budgets[0];
      const testTotal = calc.calculateTracking({
        expenditures: expenses,
        budget,
      });
      const total = validators.budgetTracking(budgetsExpenses, budget.id);

      expect(roundedDecimal(testTotal)).toBe(roundedDecimal(total));
    });

    it("can handle overspending", () => {
      const budget = budgets[0];

      expenses[budget.id].push({
        amount: budget.limit * budget.currentPeriod + 100,
      });

      const total = validators.budgetTracking(budgetsExpenses, budget.id);
      const testTotal = calc.calculateTracking({
        expenditures: expenses,
        budget,
      });

      expect(roundedDecimal(testTotal)).toBe(roundedDecimal(total));
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
      const budgetsExpenses = factory.generateBudgetsAndExpenses(
        1,
        Date.now(),
        7,
        factory.randomAmount(200, 27)
      );
      const { budgets, expenses } = budgetsExpenses;

      const testTotal = calc.calculateTotalTracking(budgets, expenses);
      const total = validators.allBudgetsTracking(budgetsExpenses);

      expect(roundedDecimal(testTotal)).toBe(roundedDecimal(total));
    });

    it("returns 0 when there are no budgets", () => {
      expect(calc.calculateTotalTracking([], {})).toBe(0);
    });
  });
});
