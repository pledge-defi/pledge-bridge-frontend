import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import services from '@/services';
import { divided_18, multiplied_18 } from '@/utils/public';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AmountInput from './AmountInput';
import Balance from './Balance';
import LinkToDepoistHistory from './LinkToDepoistHistory';
import { Footer, FormWapper, Label } from './styleComponents';

const WithdrawHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #e6e6eb;
  display: flex;
  justify-content: space-between;
  height: 72px;
  font-weight: 500;
  > span {
    font-size: 20px;
  }
  > a {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }
`;

const WithdrawBar = styled.div`
  margin: 30px 0;
  padding: 20px;
  width: 100%;
  height: 94px;
  background: rgba(93, 82, 255, 0.1);
  border: 1px solid #5d52ff;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  .divider {
    flex: 1 0 auto;
    text-align: center;
    > div {
      display: inline-block;
      width: 1px;
      height: 100%;
      background: #5d52ff;
    }
  }
`;

const WithdrawBarItem = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #5d52ff;
  > span {
    font-size: 12px;
    text-align: center;
  }
  > div {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    flex: 1 0 50%;
  }
`;

const WithdrawShowItem = styled.div<{ textAlign?: 'left' | 'right' }>`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  text-align: ${(props) => (props.textAlign === 'right' ? 'right' : 'unset')};
  > span {
    padding-bottom: 10px;
    color: #8b89a3;
    font-size: 14px;
  }
  > div {
    color: #262533;
    font-weight: 600;
    font-size: 20px;
  }
`;

export default () => {
  const [currency, setCurrency] = useState<CurrencyType>('Ethereum');
  const { account } = useWeb3React();
  const [amount, setAmount] = useState<string>();

  const [mplgrAmounts, setMplgrAmounts] = useState<string>();
  const [plgrAmounts, setPlgrAmounts] = useState<string>();
  const [lockedPlgr, setLockedPlgr] = useState<string>();
  const [totalTransferAmount, setTotalTransferAmount] = useState<number>();

  const [canDeposit, setCanDeposit] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

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
        await services.evmServer.widthdraw_plgr(contractAmount);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await services.evmServer.widthdraw_mplgr(contractAmount);
      } catch (error) {
        console.log(error);
      }
    }
    setDepositLoading(false);
  };

  const handleChangeInput: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = (v) => {
    setAmount(v.target.value);
  };

  const handleChangeCurrency = (v: CurrencyType) => {
    setCurrency(v);
  };

  const handleClickMax = () => {
    if (currency === 'BSC') {
      setAmount(plgrAmounts);
    } else {
      setAmount(mplgrAmounts);
    }
  };

  const fetchInitalData = async () => {
    try {
      const newMplgrAmounts = await services.evmServer.mplgr_amounts(account!);
      setMplgrAmounts(divided_18(newMplgrAmounts));
    } catch (error) {
      console.log(error);
    }

    try {
      const newPlgrAmounts = await services.evmServer.plgr_amounts(account!);
      setPlgrAmounts(divided_18(newPlgrAmounts));
    } catch (error) {
      console.log(error);
    }

    try {
      const locked_plgr_tx = await services.evmServer.locked_plgr_tx(account!);
      setLockedPlgr(divided_18(get(locked_plgr_tx, 'amount')));
    } catch (error) {
      console.log(error);
    }

    try {
      const newTotalTransferAmount = await services.evmServer.totalTransferAmount();
      setTotalTransferAmount(newTotalTransferAmount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAmount('');
    setCanDeposit(false);
  }, [currency]);

  useEffect(() => {
    if (account) {
      fetchInitalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <FormWapper>
        <WithdrawHeader>
          <span>Withdraw</span>
          <a>
            <span>Rule</span> <img src={require('@/assets/images/chevron-down.svg')} alt="" />
          </a>
        </WithdrawHeader>
        <WithdrawBar>
          <WithdrawBarItem>
            <span>Total Transfer Amount</span>
            <div>{totalTransferAmount} PLGR</div>
          </WithdrawBarItem>
          <div className="divider">
            <div />
          </div>
          <WithdrawBarItem>
            <span>APY</span>
            <div>166.67%</div>
          </WithdrawBarItem>
        </WithdrawBar>

        <FlexDiv>
          <WithdrawShowItem>
            <span>Current unlock wait time</span>
            {/* <div>04:55:33</div> */}
          </WithdrawShowItem>
          <WithdrawShowItem textAlign="right">
            <span>Lock PLGR</span>
            <div>{lockedPlgr} PLGR</div>
          </WithdrawShowItem>
          <WithdrawShowItem>
            <span>Withdrawal PLGR</span>
            <div>{plgrAmounts} PLGR</div>
          </WithdrawShowItem>
          <WithdrawShowItem textAlign="right">
            <span>Withdrawal MPLGR</span>
            <div>{mplgrAmounts} MPLGR</div>
          </WithdrawShowItem>
        </FlexDiv>

        <Label>Amount</Label>
        <AmountInput
          placeholder={`Minimum amount is 0.1 ${get(currencyInfos, [currency, 'currencyName'])}`}
          currency={currency}
          onChange={handleChangeInput}
          onChangeCurrency={handleChangeCurrency}
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
