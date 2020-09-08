import React from 'react';
import { selectBudgetExpenditures } from '../../utils/selectors';
import { VictoryPie, VictoryLabel } from 'victory';

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
    accum.push({ x: `${title}: ${budget.currency}${groupByTitle[title]}`, y: groupByTitle[title] });

    return accum;
  }, []);

  return <div style={{ width: "85%", margin: 'auto' }}>
    { budgetExps.length > 0 ? <VictoryPie
    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
    data={data}
    labels={({ datum }) => `${datum.x}`}
    style={{ labels: { padding: 10 } }}
    labelComponent={<VictoryLabel renderInPortal />} /> : <p>No expenses to show</p> }
    
  </div>
}

export default CategoryPieChart;
