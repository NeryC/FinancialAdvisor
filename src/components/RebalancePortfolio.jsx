/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

import '../styles/components/RebalancePortfolio.css';

function rebalanceValues(formInput, setFormInput) {
  const auxValues = {
    Bonds: formInput.Bonds,
    Foreign: formInput.Foreign,
    LargeCap: formInput.LargeCap,
    MidCap: formInput.MidCap,
    SmallCap: formInput.SmallCap,
  };
  let recomendedAcion = '';
  let count = 0;
  while (
    (auxValues.Bonds !== formInput.BondsNew ||
      auxValues.Foreign !== formInput.ForeignNew ||
      auxValues.LargeCap !== formInput.LargeCapNew ||
      auxValues.MidCap !== formInput.MidCapNew ||
      auxValues.SmallCap !== formInput.SmallCapNew) &&
    count < 10
  ) {
    count++;
    const auxDiff = {
      Bonds: Number((formInput.BondsNew - auxValues.Bonds).toFixed(2)),
      Foreign: Number((formInput.ForeignNew - auxValues.Foreign).toFixed(2)),
      LargeCap: Number((formInput.LargeCapNew - auxValues.LargeCap).toFixed(2)),
      MidCap: Number((formInput.MidCapNew - auxValues.MidCap).toFixed(2)),
      SmallCap: Number((formInput.SmallCapNew - auxValues.SmallCap).toFixed(2)),
    };

    const mayorValor = Object.entries(auxDiff).reduce((prev, curr) =>
      Number(prev[1]) > Number(curr[1]) ? prev : curr
    );

    const menorValor = Object.entries(auxDiff).reduce((prev, curr) =>
      Number(prev[1]) < Number(curr[1]) ? prev : curr
    );
    auxValues[mayorValor[0]] = Number(
      (auxValues[mayorValor[0]] - menorValor[1]).toFixed(2)
    );
    auxValues[menorValor[0]] = Number(
      (auxValues[menorValor[0]] + menorValor[1]).toFixed(2)
    );
    if (recomendedAcion !== '') recomendedAcion = `${recomendedAcion}\n`;

    recomendedAcion = `${recomendedAcion}-Transferir ${Number(
      (menorValor[1] * -1).toFixed(2)
    )} from ${menorValor[0]} to ${mayorValor[0]}.`;
  }
  setFormInput({
    ...formInput,
    Recommended: recomendedAcion,
  });
}

function handleRebalance(formInput, setFormInput, riskRow, dispatch) {
  dispatch(
    actions.setCustomPortfolio({
      Bonds: formInput.Bonds,
      Foreign: formInput.Foreign,
      LargeCap: formInput.LargeCap,
      MidCap: formInput.MidCap,
      SmallCap: formInput.SmallCap,
    })
  );
  const totalValue =
    formInput.Bonds +
    formInput.Foreign +
    formInput.LargeCap +
    formInput.MidCap +
    formInput.SmallCap;

  const newValues = {
    BondsNew: Number((totalValue * (riskRow.Bonds / 100)).toFixed(2)),
    ForeignNew: Number((totalValue * (riskRow.Foreign / 100)).toFixed(2)),
    LargeCapNew: Number((totalValue * (riskRow.LargeCap / 100)).toFixed(2)),
    MidCapNew: Number((totalValue * (riskRow.MidCap / 100)).toFixed(2)),
    SmallCapNew: Number((totalValue * (riskRow.SmallCap / 100)).toFixed(2)),
  };

  rebalanceValues(
    {
      ...formInput,
      BondsNew: newValues.BondsNew,
      ForeignNew: newValues.ForeignNew,
      LargeCapNew: newValues.LargeCapNew,
      MidCapNew: newValues.MidCapNew,
      SmallCapNew: newValues.SmallCapNew,
      BondsDiff: Number((newValues.BondsNew - formInput.Bonds).toFixed(2)),
      ForeignDiff: Number(
        (newValues.ForeignNew - formInput.Foreign).toFixed(2)
      ),
      LargeCapDiff: Number(
        (newValues.LargeCapNew - formInput.LargeCap).toFixed(2)
      ),
      MidCapDiff: Number((newValues.MidCapNew - formInput.MidCap).toFixed(2)),
      SmallCapDiff: Number(
        (newValues.SmallCapNew - formInput.SmallCap).toFixed(2)
      ),
    },
    setFormInput
  );
}

function RebalancePortfolio() {
  const riskRow = useSelector((state) => state.riskRow);
  const customePortFolio = useSelector((state) => state.customePortFolio);
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState(customePortFolio);
  return (
    <>
      <h4 className="text-left float-left mt-2 mb-3">
        Please Enter Your Current Portfolio
      </h4>
      <button
        type="button"
        className="btn btn-primary float-right"
        onClick={() =>
          handleRebalance(formInput, setFormInput, riskRow, dispatch)
        }
        disabled={
          formInput.Bonds === 0 &&
          formInput.Foreign === 0 &&
          formInput.LargeCap === 0 &&
          formInput.MidCap === 0 &&
          formInput.SmallCap === 0
        }
      >
        Rebalance
      </button>
      <table className="table table-bordered text-left ">
        <thead>
          <tr className="text-nowrap">
            <th scope="col">Current Amount</th>
            <th scope="col">Difference</th>
            <th scope="col">New Amount</th>
            <th scope="col">Recommended Transfers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="d-flex">
              <span className="text-nowrap w-75 mb-auto mt-auto">Bonds $</span>
              <input
                type="text"
                className="form-control "
                value={formInput.Bonds || 0}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    Bonds: Number(e.target.value),
                  })
                }
              />
            </td>
            <td className="lightBackgound">
              <span
                className={`form-control ${
                  formInput.BondsDiff > 0 ? `text-success` : `text-danger`
                }`}
              >
                {formInput.BondsDiff}
              </span>
            </td>
            <td className="lightBackgound">
              <span className="form-control text-primary">
                {formInput.BondsNew}
              </span>
            </td>
            <td rowSpan="5" className="lightBackgound">
              <textarea
                className="form-control bg-white"
                rows="12"
                readOnly
                value={formInput.Recommended || ''}
              />
            </td>
          </tr>
          <tr>
            <td className="d-flex">
              <span className="text-nowrap w-75 mb-auto mt-auto">
                Large Cap $
              </span>
              <input
                type="text"
                className="form-control "
                value={formInput.LargeCap || 0}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    LargeCap: Number(e.target.value),
                  })
                }
              />
            </td>
            <td className="lightBackgound">
              <span
                className={`form-control ${
                  formInput.LargeCapDiff > 0 ? `text-success` : `text-danger`
                }`}
              >
                {formInput.LargeCapDiff}
              </span>
            </td>
            <td className="lightBackgound">
              <span className="form-control text-primary">
                {formInput.LargeCapNew}
              </span>
            </td>
          </tr>
          <tr>
            <td className="d-flex">
              <span className="text-nowrap w-75 mb-auto mt-auto">
                Mid Cap $
              </span>
              <input
                type="text"
                className="form-control "
                value={formInput.MidCap || 0}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    MidCap: Number(e.target.value),
                  })
                }
              />
            </td>
            <td className="lightBackgound">
              <span
                className={`form-control ${
                  formInput.MidCapDiff > 0 ? `text-success` : `text-danger`
                }`}
              >
                {formInput.MidCapDiff}
              </span>
            </td>
            <td className="lightBackgound">
              <span className="form-control text-primary">
                {formInput.MidCapNew}
              </span>
            </td>
          </tr>
          <tr>
            <td className="d-flex">
              <span className="text-nowrap w-75 mb-auto mt-auto">
                Foreign $
              </span>
              <input
                type="text"
                className="form-control "
                value={formInput.Foreign || 0}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    Foreign: Number(e.target.value),
                  })
                }
              />
            </td>
            <td className="lightBackgound">
              <span
                className={`form-control ${
                  formInput.ForeignDiff > 0 ? `text-success` : `text-danger`
                }`}
              >
                {formInput.ForeignDiff}
              </span>
            </td>
            <td className="lightBackgound">
              <span className="form-control text-primary">
                {formInput.ForeignNew}
              </span>
            </td>
          </tr>
          <tr>
            <td className="d-flex">
              <span className="text-nowrap w-75 mb-auto mt-auto">
                Small Cap $
              </span>
              <input
                type="text"
                className="form-control "
                value={formInput.SmallCap || 0}
                onChange={(e) =>
                  setFormInput({
                    ...formInput,
                    SmallCap: Number(e.target.value),
                  })
                }
              />
            </td>
            <td className="lightBackgound">
              <span
                className={`form-control ${
                  formInput.SmallCapDiff > 0 ? `text-success` : `text-danger`
                }`}
              >
                {formInput.SmallCapDiff}
              </span>
            </td>
            <td className="lightBackgound">
              <span className="form-control text-primary">
                {formInput.SmallCapNew}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default RebalancePortfolio;
