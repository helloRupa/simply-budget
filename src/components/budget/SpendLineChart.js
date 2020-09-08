import React from 'react';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory';

function SpendLineChart({ currency, limit, tickValues, data, domain }) {
  return <VictoryChart theme={VictoryTheme.material} domain={domain}>
    <VictoryAxis
      // tickValues specifies both the number of ticks and where
      // they are placed on the axis
      tickValues={tickValues}
      tickFormat={tickValues.map(num => `P${num}`)}
    />
    <VictoryAxis
      dependentAxis
      // tickFormat specifies how ticks should be displayed
      tickFormat={(x) => (`${currency}${x}`)}
    />

    <VictoryLine y={() => limit} 
      style={{ data: { opacity: 0.5, stroke: '#c43a31', strokeWidth: 1 } }} />

    <VictoryLine
      x="period"
      y="spent"
      // style={{
      //   data: { stroke: "#c43a31" },
      //   parent: { border: "1px solid #ccc"}
      // }}
      data={data}
    />
  </VictoryChart>
}

export default SpendLineChart;
