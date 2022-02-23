import {
  AlertText,
  DrawerTitle,
  FontWeightBoldDiv,
  Key,
  Label,
  SubmitButtonWapper,
  TransformerItem,
} from '@/components/styleComponents';
import CloseIcon from '@/components/Svg/CloseIcon';
import type { ChainInfoKeysType } from '@/constants/chainInfos';
import chainInfos from '@/constants/chainInfos';
import type {
  EstimateGasOptions,
  MethodPayableReturnContext,
  SendOptions,
} from '@/contracts/newERC20';
import { bridgeGasFeeState, chainInfoKeyState, chainInfoState } from '@/model/global';
import services from '@/services';
import { addTx } from '@/services/pledge/api/addTx';
import { divided_18, multiplied_18 } from '@/utils/public';
import { Button, Drawer } from 'antd';
import { find, get } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components';
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
  const theme = useTheme();
  const [visible, setVisible] = useState<boolean>();
  const bridgeGasFee = useRecoilValue(bridgeGasFeeState);
  const chainInfoKey = useRecoilValue(chainInfoKeyState);
  const chainInfo = useRecoilValue(chainInfoState);
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
    (c: ChainInfoKeysType) => (
      <DrawerTransformerItem>
        <img src={find(chainInfos, { chainName: c })?.chainImageAsset} alt="" height={40} />
        <div>
          <div>{find(chainInfos, { chainName: c })?.currencyName}</div>
          <span>{find(chainInfos, { chainName: c })?.chainDesc}</span>
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
        asset: chainInfo.currencyName,
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
    const gasFeeValue = multiplied_18(get(bridgeGasFee, [chainInfoKey]));
    try {
      if (transferredType === 'deposit') {
        if (chainInfoKey === 'BSC-testnet') {
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
        if (chainInfoKey === 'BSC-testnet') {
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
      title={
        <DrawerTitle>
          {title}
          <a onClick={onClose}>
            <CloseIcon fill={theme.breakpointChecks.isMobile ? '#5D52FF' : '#fff'} />
          </a>
        </DrawerTitle>
      }
      placement="right"
      onClose={onClose}
      visible={visible}
      width={theme.breakpointChecks.isMobile ? '100%' : 550}
      maskClosable={false}
      closable={false}
    >
      <Label>Amount</Label>
      <FontWeightBoldDiv>
        {amount} {chainInfo.currencyName}
      </FontWeightBoldDiv>
      <Label>From</Label>
      {getFromToCurrency(chainInfoKey)}
      <Label>To</Label>
      {getFromToCurrency(chainInfoKey === 'BSC-testnet' ? 'Ropsent' : chainInfoKey)}
      <Label>Receiving Address</Label>
      <BlackKey>{account}</BlackKey>
      <Label>Gas Fee</Label>
      <BlackKey>
        {divided_18(gasFee!)} {chainInfo.symbol}
      </BlackKey>
      {transferredType === 'deposit' && <Label>Cross-Chain Fee</Label>}
      {transferredType === 'deposit' && (
        <BlackKey>
          {get(bridgeGasFee, [chainInfoKey])} {chainInfo.symbol}
        </BlackKey>
      )}
      {transferredType === 'deposit' && (
        <AlertText>
          <img src={require('@/assets/images/alert.svg')} alt="" />
          <span>
            {chainInfo.currencyName} will be released according to the rules, please withdraw to
            your personal address by yourself
          </span>
        </AlertText>
      )}
      <SubmitButtonWapper>
        <Button
          className="submitButton"
          type="primary"
          onClick={handleClickTransferred}
          loading={transferredLoading}
        >
          Transferred
        </Button>
      </SubmitButtonWapper>
    </Drawer>
  );
};

export default ConfirmDrawer;
