import React, { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import RiskDonut from '../components/RiskDonut';
import RiskSelector from '../components/RiskSelector';
import RiskTable from '../components/RiskTable';

import '../styles/containers/RiskLevel.css';

const TABLE = 'TABLE';
const CHART = 'CHART';

function handleRenderItemClick(renderItem, setRenderItem) {
  if (renderItem === TABLE) {
    setRenderItem(CHART);
  } else {
    setRenderItem(TABLE);
  }
}

function RiskLevel() {
  const [renderItem, setRenderItem] = useState(TABLE);
  const parentRef = useRef(null);
  const riskSelected = useSelector((state) => state.riskSelected);

  const isDisabledButton = riskSelected === '0';

  return (
    <>
      <RiskSelector />
      <div className="ajuste text-center" ref={parentRef}>
        <div className="mb-4">
          <Button
            className="mr-3"
            variant="success"
            disabled={isDisabledButton}
          >
            Continue
          </Button>
          <Button
            variant="primary"
            onClick={() => handleRenderItemClick(renderItem, setRenderItem)}
            disabled={isDisabledButton}
          >
            {renderItem === TABLE ? CHART : TABLE}
          </Button>
        </div>
        {renderItem === TABLE ? (
          <RiskTable />
        ) : (
          <RiskDonut parentRef={parentRef.current} />
        )}
      </div>
    </>
  );
}

export default RiskLevel;
