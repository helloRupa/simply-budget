import React from 'react';
import { selectBudgetExpenditures } from '../../utils/selectors';
import { VictoryPie } from 'victory';

function CategoryPieChart({ budget, expenditures }) {
  const budgetExps = selectBudgetExpenditures(expenditures, budget) || [];
  const groupByTitle = budgetExps.reduce((accum, exp) => {
    const title = exp.title === '' ? 'Untitled' : exp.title;

    if (!accum[title]) {
      accum[title] = 0;
    }

    accum[title] += exp.amount;

    return accum;
  }, {});

  const data = Object.keys(groupByTitle).reduce((accum, title) => {
    accum.push({ x: title, y: groupByTitle[title] });

    return accum;
  }, []);

  return <div>
    { budgetExps.length > 0 ? <VictoryPie
    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
    data={data} /> : <p>No expenses to show</p> }
    
  </div>
}

export default CategoryPieChart;
