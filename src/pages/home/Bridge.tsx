import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { balanceState, currencyState } from '@/model/global';
import services from '@/services';
import { multiplied_18 } from '@/utils/public';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import AmountInput from './AmountInput';
import Balance from './Balance';
import LinkToDepoistHistory from './LinkToDepoistHistory';
import {
  Coin,
  Footer,
  FormWapper,
  InputDiv,
  Key,
  Label,
  NormalFlexBox,
  SelectInput,
  TransformerItem,
} from './styleComponents';

export default () => {
  const currency = useRecoilValue(currencyState);
  const balance = useRecoilValue(balanceState);
  const { account } = useWeb3React();
  const [amount, setAmount] = useState<string>();
  const [canDeposit, setCanDeposit] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

  const getFromToCurrency = useCallback(
    (c: CurrencyType) => (
      <TransformerItem>
        <img src={get(currencyInfos, [c, 'chainImageAsset'])} alt="" height={40} />
        <div>
          <div>{get(currencyInfos, [c, 'currencyName'])}</div>
          <span>{get(currencyInfos, [c, 'chainDesc'])}</span>
        </div>
      </TransformerItem>
    ),
    [],
  );

  const resetState = () => {
    setAmount('');
    setCanDeposit(false);
  };

  const handleClickApprove = async () => {
    setApproveLoading(true);
    const contractAmount = multiplied_18(amount!)!;
    try {
      await services.evmServer.approve(
        get(currencyInfos, [currency, 'contractAddress']),
        get(currencyInfos, [currency, 'pledgerBridgeContractAddress']),
        contractAmount,
      );
      setCanDeposit(true);
    } catch (error) {
      console.log(error);
    }
    setApproveLoading(false);
  };

  const handleClickDeposit = async () => {
    setDepositLoading(true);
    const contractAmount = multiplied_18(amount!)!;
    if (currency === 'BSC') {
      try {
        await services.evmServer.deposit_plgr(account as string, contractAmount);
        await services.evmServer.execute_upkeep();
        resetState();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await services.evmServer.deposit_mplgr(account as string, contractAmount);
        resetState();
      } catch (error) {
        console.log(error);
      }
    }
    setDepositLoading(false);
  };

  const handleChangeInput: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (v) => {
    setAmount(v.target.value);
  };

  const handleClickMax = () => {
    setAmount(get(balance, [currency]));
  };

  useEffect(() => {
    setAmount('');
    setCanDeposit(false);
  }, [currency]);

  return (
    <>
      <FormWapper>
        <Label>Asset</Label>
        <SelectInput>
          <Coin>
            <img
              src={get(currencyInfos, [currency, 'currencyImageAsset'])}
              alt=""
              height={'24px'}
            />
            <span>{get(currencyInfos, [currency, 'currencyName'])}</span>
          </Coin>
        </SelectInput>
        <NormalFlexBox>
          <div>
            <Label>From</Label>
            {getFromToCurrency(currency)}
          </div>
          <img src={require('@/assets/images/arrow.svg')} alt="" style={{ paddingTop: 50 }} />
          <div>
            <Label>To</Label>
            {getFromToCurrency(currency === 'BSC' ? 'Ethereum' : 'BSC')}
          </div>
        </NormalFlexBox>
        <Label>Receiving address</Label>
        <InputDiv disabled>
          {account && <Key>{`${account?.slice(0, 8)}···${account?.slice(-6)}`}</Key>}
        </InputDiv>
        <Label>Amount</Label>
        <AmountInput
          currency={currency}
          onChange={handleChangeInput}
          onClickMax={handleClickMax}
          value={amount}
        />
        <Balance currency={currency} />
        {!canDeposit && (
          <Button
            type="primary"
            style={{ height: 60, width: '100%', fontSize: '16px' }}
            onClick={handleClickApprove}
            loading={approveLoading}
          >
            Approve
          </Button>
        )}
        {canDeposit && (
          <Button
            type="primary"
            style={{ height: 60, width: '100%', fontSize: '16px' }}
            onClick={handleClickDeposit}
            loading={depositLoading}
          >
            Deposit
          </Button>
        )}
        <LinkToDepoistHistory />
      </FormWapper>
      <Footer />
    </>
  );
};
