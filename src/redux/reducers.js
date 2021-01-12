import { createStore } from 'redux';

const initialState = {
  riskSelected: 0,
  riskRow: {},
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

    default:
      return state;
  }
};

export default createStore(riskReducer);
