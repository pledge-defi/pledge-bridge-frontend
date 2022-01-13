import currencyInfos from '@/constants/currencyInfos';
import { balanceState, currencyState } from '@/model/global';
import { numeralStandardFormat } from '@/utils/public';
import { get } from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const StyleBalance = styled.div`
  font-size: 12px;
  line-height: 22px;
  color: #8b89a3;
  > span {
    color: #000;
  }
  padding: 10px 0 24px 0;
`;

const Balance = () => {
  const balance = useRecoilValue(balanceState);
  const currency = useRecoilValue(currencyState);

  return (
    <StyleBalance>
      Balance:{' '}
      <span>
        {numeralStandardFormat(get(balance, [currency]))}{' '}
        {get(currencyInfos, [currency, 'currencyName'])}
      </span>
    </StyleBalance>
  );
};

export default Balance;
