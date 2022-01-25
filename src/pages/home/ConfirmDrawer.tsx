import {
  AlertText,
  DrawerTitle,
  FontWeightBoldDiv,
  Key,
  Label,
  TransformerItem,
} from '@/components/styleComponents';
import currencyInfos from '@/constants/currencyInfos';
import type {
  EstimateGasOptions,
  MethodPayableReturnContext,
  SendOptions,
} from '@/contracts/newERC20';
import type { CurrencyType } from '@/model/global';
import { bridgeGasFeeState, currencyState } from '@/model/global';
import services from '@/services';
import { addTx } from '@/services/pledge/api/addTx';
import { divided_18, multiplied_18 } from '@/utils/public';
import { Button, Drawer } from 'antd';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import type { TransferredType } from '../typings';

const BlackKey = styled(Key)`
  color: #262533;
`;

const DrawerTransformerItem = styled(TransformerItem)`
  background: unset;
  padding: unset;
  height: 65px;
`;

type ConfirmDrawerProps = {
  title?: string;
  amount?: string;
  account?: string | null;
  transferredType: TransferredType;
  callback?: () => void;
};

const ConfirmDrawer = ({
  title,
  amount,
  account,
  transferredType = 'deposit',
  callback = () => {},
}: ConfirmDrawerProps) => {
  const history = useHistory();
  const [visible, setVisible] = useState<boolean>();
  const bridgeGasFee = useRecoilValue(bridgeGasFeeState);
  const currency = useRecoilValue(currencyState);
  const [transferredLoading, setTransferredLoading] = useState<boolean>(false);
  const [gasFee, setGasFee] = useState<number>();
  const [contract, setContract] = useState<
    (
      | {
          from: string;
        }
      | MethodPayableReturnContext
    )[]
  >([]);

  const getFromToCurrency = useCallback(
    (c: CurrencyType) => (
      <DrawerTransformerItem>
        <img src={get(currencyInfos, [c, 'chainImageAsset'])} alt="" height={40} />
        <div>
          <div>{get(currencyInfos, [c, 'currencyName'])}</div>
          <span>{get(currencyInfos, [c, 'chainDesc'])}</span>
        </div>
      </DrawerTransformerItem>
    ),
    [],
  );

  const onClose = () => {
    setVisible(false);
  };

  const handleClickTransferred = async () => {
    setTransferredLoading(true);
    try {
      const [method, options] = contract;
      const data = await (method as MethodPayableReturnContext).send(options as SendOptions);
      // 演示使用
      // await services.evmServer.execute_upkeep();
      const contractAmount = multiplied_18(amount!);
      await addTx({
        address: account as string,
        txType: transferredType === 'deposit' ? 0 : 1,
        asset: get(currencyInfos, [currency, 'currencyName']),
        txHash: get(data, 'transactionHash'),
        amount: contractAmount,
      });

      history.push(`/history/${transferredType}/${account}`);
      callback();
      setTransferredLoading(false);
      setVisible(false);
    } catch (error) {
      setTransferredLoading(false);
      console.log(error);
    }
  };

  const getCurrentContract = async () => {
    let newContract;
    const contractAmount = multiplied_18(amount!)!;
    const gasFeeValue = multiplied_18(get(bridgeGasFee, [currency]));
    try {
      if (transferredType === 'deposit') {
        if (currency === 'BSC') {
          newContract = await services.evmServer.deposit_plgr(
            account as string,
            contractAmount,
            gasFeeValue!,
          );
        } else {
          newContract = await services.evmServer.deposit_mplgr(
            account as string,
            contractAmount,
            gasFeeValue!,
          );
        }
      } else {
        if (currency === 'BSC') {
          newContract = await services.evmServer.widthdraw_plgr(contractAmount);
        } else {
          newContract = await services.evmServer.widthdraw_mplgr(contractAmount);
        }
      }
      const [method, options] = newContract;
      try {
        const newGasFee = await (method as MethodPayableReturnContext).estimateGas(
          options as EstimateGasOptions,
        );
        setGasFee(newGasFee);
      } catch (error) {
        console.log(error);
      }
      setContract(newContract);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
      getCurrentContract();
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      title={<DrawerTitle>{title}</DrawerTitle>}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={550}
      closable={false}
    >
      <Label>Amount</Label>
      <FontWeightBoldDiv>
        {amount} {get(currencyInfos, [currency, 'currencyName'])}
      </FontWeightBoldDiv>
      <Label>From</Label>
      {getFromToCurrency(currency)}
      <Label>To</Label>
      {getFromToCurrency(currency === 'BSC' ? 'Ethereum' : 'BSC')}
      <Label>Receiving Address</Label>
      <BlackKey>{account}</BlackKey>
      <Label>Gas Fee</Label>
      <BlackKey>
        {divided_18(gasFee!)} {get(currencyInfos, [currency, 'symbol'])}
      </BlackKey>
      {transferredType === 'deposit' && <Label>Cross-Chain Fee</Label>}
      {transferredType === 'deposit' && (
        <BlackKey>
          {get(bridgeGasFee, [currency])} {get(currencyInfos, [currency, 'symbol'])}
        </BlackKey>
      )}
      {transferredType === 'deposit' && (
        <AlertText>
          <img src={require('@/assets/images/alert.svg')} alt="" />
          <span>
            {get(currencyInfos, [currency, 'currencyName'])} will be released according to the
            rules, please withdraw to your personal address by yourself
          </span>
        </AlertText>
      )}
      <Button
        type="primary"
        style={{ height: 60, width: '100%', fontSize: '16px', marginTop: '150px' }}
        onClick={handleClickTransferred}
        loading={transferredLoading}
      >
        Transferred
      </Button>
    </Drawer>
  );
};

export default ConfirmDrawer;
