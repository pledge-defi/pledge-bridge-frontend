import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import services from '@/services';
import { useWeb3React } from '@web3-react/core';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyleBalance = styled.div`
  font-size: 12px;
  line-height: 22px;
  color: #8b89a3;
  > span {
    color: #000;
  }
  padding: 10px 0 48px 0;
`;

type BalanceProps = {
  currency: CurrencyType;
};

const Balance = ({ currency = 'BSC' }: BalanceProps) => {
  const { account } = useWeb3React();
  const [balance, setBalance] = useState<string>();

  const fetchBalance = async () => {
    try {
      const newBalance = await services.evmServer.balanceOf(
        get(currencyInfos, [currency, 'contractAddress']),
        account!,
      );
      setBalance(newBalance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (account && currency) {
      setBalance(undefined);
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currency]);

  return (
    <StyleBalance>
      Balance:{' '}
      <span>
        {balance} {get(currencyInfos, [currency, 'currencyName'])}
      </span>
    </StyleBalance>
  );
};

export default Balance;
