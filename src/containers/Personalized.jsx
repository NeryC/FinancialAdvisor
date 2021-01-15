import React from 'react';
import RiskView from '../components/RiskView';
import RebalancePortfolio from '../components/RebalancePortfolio';

function Personalized() {
  return (
    <>
      <div className="ajuste text-center">
        <h2>Personalized Portfolio</h2>
        <RiskView />
        <RebalancePortfolio />
      </div>
    </>
  );
}

export default Personalized;
