import currencyInfos from '@/constants/currencyInfos';
import type { CurrencyType } from '@/model/global';
import { currencyState } from '@/model/global';
import services from '@/services';
import { multiplied_18 } from '@/utils/public';
import { Button, Drawer } from 'antd';
import { get } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { FontWeightBoldDiv, Key, Label, TransformerItem } from './styleComponents';

const DrawerTitle = styled.div`
  font-weight: 600;
  font-size: 36px;
  color: #262533;
  padding-top: 100px;
`;

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
  transferredType: 'deposit' | 'withdraw';
  callback?: () => void;
};

const ConfirmDrawer = ({
  title,
  amount,
  account,
  transferredType = 'deposit',
  callback = () => {},
}: ConfirmDrawerProps) => {
  const [visible, setVisible] = useState<boolean>();
  const currency = useRecoilValue(currencyState);
  const [transferredLoading, setTransferredLoading] = useState<boolean>(false);

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
    const contractAmount = multiplied_18(amount!)!;
    try {
      if (transferredType === 'deposit') {
        if (currency === 'BSC') {
          await services.evmServer.deposit_plgr(account as string, contractAmount);
          await services.evmServer.execute_upkeep();
        } else {
          await services.evmServer.deposit_mplgr(account as string, contractAmount);
        }
      } else {
        if (currency === 'BSC') {
          await services.evmServer.widthdraw_plgr(contractAmount);
        } else {
          await services.evmServer.widthdraw_mplgr(contractAmount);
        }
      }
      callback();
      setTransferredLoading(false);
      setVisible(false);
    } catch (error) {
      setTransferredLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
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
      <Label>Transaction Fee</Label>
      <BlackKey>0.000014 BNB ( $0.008538 )</BlackKey>
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
