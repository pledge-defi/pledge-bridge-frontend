import {
  Coin,
  FlexColumnDiv,
  FlexDiv,
  Footer,
  FormHeader,
  FormWapper,
  GreyBackgroundDiv,
  Key,
  Label,
  NormalFlexBox,
  SelectInput,
  SubmitButtonWapper,
  TransformerItem,
} from '@/components/styleComponents';
import type { ChainInfoKeysType } from '@/constants/chainInfos';
import chainInfos, { chainInfoKeys } from '@/constants/chainInfos';
import { useFetchBalance } from '@/hooks';
import { balanceState, bridgeGasFeeState, chainInfoKeyState, chainInfoState } from '@/model/global';
import services from '@/services';
import { web3 } from '@/services/web3';
import { divided_18, multiplied_18 } from '@/utils/public';
import { useWeb3React } from '@web3-react/core';
import { Button, Tooltip } from 'antd';
import { filter, find, get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import AmountInput from './AmountInput';
import Balance from './Balance';
import ConfirmDrawer from './ConfirmDrawer';
import LinkToHistory from './LinkToHistory';

export default () => {
  const chainInfoKey = useRecoilValue(chainInfoKeyState);
  const chainInfo = useRecoilValue(chainInfoState);
  const balance = useRecoilValue(balanceState);
  const bridgeGasFee = useRecoilValue(bridgeGasFeeState);
  const { account } = useWeb3React();
  const [amount, setAmount] = useState<string>();
  const [gasFee, setGasFee] = useState<number>();
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [drawerElement, setDrawerElement] = useState<JSX.Element | undefined>();
  const fetchBalance = useFetchBalance();

  const getGasFee = async (a: string) => {
    const contractAmount = multiplied_18(a)!;
    try {
      const newGasFee = await services.evmServer.approveEstimateGas(
        chainInfo.contractAddress,
        chainInfo.pledgerBridgeContractAddress,
        contractAmount,
      );
      setGasFee(newGasFee);
    } catch (error) {
      setGasFee(undefined);
      console.log(error);
    }
  };

  const getFromToCurrency = useCallback(
    (c: ChainInfoKeysType) => (
      <TransformerItem>
        <img src={find(chainInfos, { chainName: c })?.chainImageAsset} alt="" height={40} />
        <div>
          <div>{find(chainInfos, { chainName: c })?.currencyName}</div>
          <span>{find(chainInfos, { chainName: c })?.chainDesc}</span>
        </div>
      </TransformerItem>
    ),
    [],
  );

  const handleCallback = () => {
    setAmount('');
    fetchBalance();
  };

  const showDrawerElement = () => {
    setDrawerElement(
      <ConfirmDrawer
        key={new Date().getTime().toString()}
        title="Deposit Confirm"
        amount={amount}
        account={account}
        transferredType="deposit"
        callback={handleCallback}
      />,
    );
  };

  const handleClickApprove = async () => {
    setApproveLoading(true);
    const contractAmount = multiplied_18(amount!)!;
    try {
      await services.evmServer.approve(
        chainInfo.contractAddress,
        chainInfo.pledgerBridgeContractAddress,
        contractAmount,
      );
      showDrawerElement();
    } catch (error) {
      console.log(error);
    }
    setApproveLoading(false);
  };

  const handleChangeInput = (v: string | undefined) => {
    setAmount(v);
  };

  useEffect(() => {
    setAmount('');
  }, [chainInfoKey]);

  useEffect(() => {
    getGasFee(amount!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    web3.eth
      .getTransaction('0x2cefd4aa5be04b84c3e29148a9b799cab8dcdb6a3485b45e91eca728422325ec')
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <>
      {drawerElement}
      <FormWapper>
        <FormHeader>
          <span>Bridge</span>
          <div>
            <a />
            <LinkToHistory type="deposit" account={account!} />
          </div>
        </FormHeader>
        <Label />
        <SelectInput>
          <Coin>
            <img src={chainInfo.currencyImageAsset} alt="" height={'24px'} />
            <span>{chainInfo.currencyName}</span>
          </Coin>
        </SelectInput>
        <NormalFlexBox>
          <div>
            <Label>From</Label>
            {getFromToCurrency(chainInfoKey)}
          </div>
          <img src={require('@/assets/images/arrow.svg')} alt="" style={{ paddingTop: 50 }} />
          <div>
            <Label>To</Label>
            {getFromToCurrency(filter(chainInfoKeys, (c) => c !== chainInfoKey)[0])}
          </div>
        </NormalFlexBox>
        <Label>Receiving address</Label>
        <GreyBackgroundDiv>
          {account && <Key>{`${account?.slice(0, 8)}···${account?.slice(-6)}`}</Key>}
        </GreyBackgroundDiv>
        <Label>Amount</Label>
        <AmountInput
          onChange={handleChangeInput}
          maxAmount={get(balance, [chainInfoKey])}
          value={amount}
        />
        <Balance />
        {gasFee && (
          <GreyBackgroundDiv height="118px">
            <FlexColumnDiv>
              <FlexDiv>
                <FlexDiv>
                  <div style={{ color: '#8B89A3' }}>Gas Fee</div>{' '}
                  <Tooltip title="for your cross-chain transaction on destination chain">
                    <img
                      src={require('@/assets/images/help.svg')}
                      alt=""
                      style={{ cursor: 'pointer' }}
                    />
                  </Tooltip>
                </FlexDiv>
                <span>
                  {divided_18(gasFee)} {chainInfo.symbol}
                </span>
              </FlexDiv>
              <FlexDiv>
                <FlexDiv>
                  <div style={{ color: '#8B89A3' }}>Cross-chain fee</div>
                </FlexDiv>
                <span>
                  {get(bridgeGasFee, [chainInfoKey])} {chainInfo.symbol}
                </span>
              </FlexDiv>
              <FlexDiv>
                <div style={{ color: '#8B89A3' }}>Estimated time of arrival</div>
                <span>5-30 min</span>
              </FlexDiv>
            </FlexColumnDiv>
          </GreyBackgroundDiv>
        )}
        <SubmitButtonWapper>
          <Button
            className="submitButton"
            type="primary"
            onClick={handleClickApprove}
            loading={approveLoading}
          >
            Approve
          </Button>
        </SubmitButtonWapper>
      </FormWapper>
      <Footer />
    </>
  );
};
