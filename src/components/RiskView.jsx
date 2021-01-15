/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';

function RiskView() {
  const riskRow = useSelector((state) => state.riskRow);
  const riskSelected = useSelector((state) => state.riskSelected);
  return (
    <>
      <h4 className="text-left">Risk Level {riskSelected}</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Bonds</th>
            <th scope="col">Large Cap</th>
            <th scope="col">Mid Cap</th>
            <th scope="col">Foreign</th>
            <th scope="col">Small Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{riskRow.Bonds} %</td>
            <td>{riskRow.LargeCap} %</td>
            <td>{riskRow.MidCap} %</td>
            <td>{riskRow.Foreign} %</td>
            <td>{riskRow.SmallCap} %</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default RiskView;
