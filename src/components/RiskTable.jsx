import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

import riskData from '../assets/json/riskData.json';

import '../styles/components/RiskTable.css';

function setRowHover(setRows, riskSelected, dispatch) {
  setRows(
    riskData.data.map((riskItem) => {
      let rowClass = 'trRisk';

      if (riskSelected === riskItem.Risk.toString()) {
        rowClass += ' hover';
        dispatch(actions.setRiskRow(riskItem));
      }

      const row = (
        <tr className={rowClass} key={riskItem.Risk}>
          <th>{riskItem.Risk}</th>
          <td>{riskItem.Bonds}</td>
          <td>{riskItem.LargeCap}</td>
          <td>{riskItem.MidCap}</td>
          <td>{riskItem.Foreign}</td>
          <td>{riskItem.SmallCap}</td>
        </tr>
      );
      return row;
    })
  );
}

function RiskTable() {
  const riskSelected = useSelector((state) => state.riskSelected);
  const [rows, setRows] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setRowHover(setRows, riskSelected, dispatch);
  }, [riskSelected]);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Risk</th>
          <th scope="col">Bonds %</th>
          <th scope="col">Large Cap %</th>
          <th scope="col">Mid Cap %</th>
          <th scope="col">Foreign %</th>
          <th scope="col">Small Cap %</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default RiskTable;
