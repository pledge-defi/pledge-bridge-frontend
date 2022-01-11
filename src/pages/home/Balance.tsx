import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { balanceState } from '@/model/global';
import services from '@/services';
import { divided_18, numeralStandardFormat } from '@/utils/public';
import { useWeb3React } from '@web3-react/core';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
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

type BalanceProps = {
  currency: CurrencyType;
};

const Balance = ({ currency = 'BSC' }: BalanceProps) => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useRecoilState(balanceState);

  const fetchBalance = async () => {
    try {
      const newBalance = await services.evmServer.balanceOf(
        get(currencyInfos, [currency, 'contractAddress']),
        account!,
      );
      setBalance({ ...balance, [currency]: divided_18(newBalance) });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (account && currency) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currency]);

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
