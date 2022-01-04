import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { get } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { Coin, InputDiv } from './styleComponents';

const StyleAmountInput = styled(InputDiv)`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  input {
    flex: 1;
    font-weight: bold;
    background: none;
    border: none;
    outline: none;
  }
  input:focus {
    border: none;
  }
  .max {
    position: relative;
    margin-right: 18px;
    padding: 0 8px;
    color: #5d52ff;
    font-weight: 500;
    font-size: 16px;
    background: rgba(93, 82, 255, 0.1);
    border-radius: 10px;
    cursor: pointer;
    ::before {
      position: absolute;
      top: 0;
      right: -10px;
      width: 2px;
      height: 100%;
      background: #e6e6eb;
      content: '';
    }
  }
`;

type AmountInputProps = {
  currency?: CurrencyType;
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onClickMax?: () => void;
};

const AmountInput = ({ currency = 'BSC', onChange, value, onClickMax }: AmountInputProps) => {
  return (
    <StyleAmountInput>
      <input type="text" onChange={onChange} value={value} />
      <div className="max" onClick={onClickMax}>
        Max
      </div>
      <Coin>
        <img src={get(currencyInfos, [currency, 'currencyImageAsset'])} alt="" height={'24px'} />
        <span>{get(currencyInfos, [currency, 'currencyName'])}</span>
      </Coin>
    </StyleAmountInput>
  );
};

export default AmountInput;
