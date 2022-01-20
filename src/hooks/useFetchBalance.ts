import currencyInfos from '@/constants/currencyInfos';
import { balanceState, bridgeGasFeeState, currencyState } from '@/model/global';
import services from '@/services';
import { divided_18 } from '@/utils/public';
import { useWeb3React } from '@web3-react/core';
import { get } from 'lodash';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

function useFetchBalance() {
  const { account } = useWeb3React();
  const [balance, setBalance] = useRecoilState(balanceState);
  const [bridgeGasFee, setBridgeGasFee] = useRecoilState(bridgeGasFeeState);
  const currency = useRecoilValue(currencyState);

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
    try {
      const newBridgeGasFee = await services.evmServer.bridge_gas_fee(currency);
      setBridgeGasFee({ ...bridgeGasFee, [currency]: divided_18(newBridgeGasFee) });
    } catch (error) {}
  };

  useEffect(() => {
    if (account && currency) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currency]);
  return fetchBalance;
}

export { useFetchBalance };
