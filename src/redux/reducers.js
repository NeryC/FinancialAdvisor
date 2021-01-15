import { createStore } from 'redux';

const initialState = {
  riskSelected: 0,
  riskRow: {
    Bonds: 80,
    Foreign: 0,
    LargeCap: 20,
    MidCap: 0,
    Risk: 1,
    SmallCap: 0,
  },
  customePortFolio: {
    Bonds: 0,
    Foreign: 0,
    LargeCap: 0,
    MidCap: 0,
    SmallCap: 0,
  },
};

const riskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RISK_LEVEL':
      return {
        ...state,
        riskSelected: action.payload,
      };
    case 'SET_RISK_ROW':
      return {
        ...state,
        riskRow: action.payload,
      };
    case 'SET_CUSTOM_PORTFOILIO':
      return {
        ...state,
        customePortFolio: action.payload,
      };

    default:
      return state;
  }
};

export default createStore(riskReducer);
