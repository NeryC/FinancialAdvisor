import React from 'react';
import { useSelector } from 'react-redux';

import { Chart } from 'react-google-charts';

import '../styles/components/RiskDonut.css';

function RiskDonut({ parentRef }) {
  const riskRow = useSelector((state) => state.riskRow);
  const data = [['Task', 'Hours per Day']];
  Object.keys(riskRow).forEach((item) => {
    if (item !== 'Risk') data.push([item, riskRow[item]]);
  });
  return (
    <>
      <h3>INVESTMENT PORTFOLIO</h3>
      <Chart
        width={parentRef.offsetWidth}
        height={parentRef.offsetHeight - 150}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          legend: 'none',
          pieSliceText: 'label',
          pieHole: 0.3,
        }}
        rootProps={{ 'data-testid': '3' }}
      />
    </>
  );
}

export default RiskDonut;
