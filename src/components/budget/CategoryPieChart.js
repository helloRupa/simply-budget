import React from 'react';
import { selectBudgetExpenditures } from '../../utils/selectors';
import { maxPieCategories } from '../../constants/general';
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
    accum.push({ x: title, y: groupByTitle[title] });

    return accum;
  }, []);

  if (data.length > maxPieCategories) {
    data.sort((a, b) => b.y - a.y);

    const other = data.splice(maxPieCategories).reduce((total, d) => d.y + total, 0);

    data.push({ x: 'Other', y: other });
  }

  const labelPlacement = data.length > 5 ? "parallel" : "vertical";

  return <div style={{ width: "85%", margin: '20px auto', overflow: 'visible', padding: '20px 20px 100px 20px' }}>
    { budgetExps.length > 0 ? <VictoryPie
    colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
    data={data}
    labels={({ datum }) => `${datum.x}: ${budget.currency}${datum.y}`}
    labelPosition={(_) => "centroid"}
    labelPlacement={(_) => labelPlacement }
    style={{ labels: { padding: 5 } }}
    labelComponent={<VictoryLabel renderInPortal />} /> : <p>No expenses to show</p> }
  </div>
}

export default CategoryPieChart;
