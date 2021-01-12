export const SET_RISK_LEVEL = 'SET_RISK_LEVEL';
export const SET_RISK_ROW = 'SET_RISK_ROW';

export const setRiskLevel = (payload) => ({
  type: SET_RISK_LEVEL,
  payload,
});

export const setRiskRow = (payload) => ({
  type: SET_RISK_ROW,
  payload,
});
