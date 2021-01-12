/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import '../styles/components/RiskSelector.css';

import * as actions from '../redux/actions';

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  return val;
}

function RiskSelector() {
  const dispatch = useDispatch();

  useEffect(() => {
    const range = document.querySelector('.range');
    const bubble = document.querySelector('.bubble');

    range.addEventListener('input', () => {
      dispatch(actions.setRiskLevel(setBubble(range, bubble)));
    });
    dispatch(actions.setRiskLevel(setBubble(range, bubble)));
  }, []);

  return (
    <>
      <div className="range-wrap">
        <h4>Please Select A Risk Level For Your Investment Portfolio</h4>
        <div className="minimo">
          <h5>Minimo</h5>
        </div>
        <div className="maximo">
          <h5>Maximo</h5>
        </div>
        <input
          type="range"
          className="range"
          min="0"
          max="10"
          step="1"
          defaultValue="0"
        />
        <output className="bubble" />
      </div>
    </>
  );
}

export default RiskSelector;
