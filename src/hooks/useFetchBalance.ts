import { balanceState, bridgeGasFeeState, chainInfoKeyState, chainInfoState } from '@/model/global';
import services from '@/services';
import { divided_18 } from '@/utils/public';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

function useFetchBalance() {
  const { account } = useWeb3React();
  const [balance, setBalance] = useRecoilState(balanceState);
  const [bridgeGasFee, setBridgeGasFee] = useRecoilState(bridgeGasFeeState);
  const chainInfoKey = useRecoilValue(chainInfoKeyState);
  const chainInfo = useRecoilValue(chainInfoState);

  const fetchBalance = async () => {
    try {
      const newBalance = await services.evmServer.balanceOf(chainInfo.contractAddress, account!);
      setBalance({ ...balance, [chainInfoKey]: divided_18(newBalance) });
    } catch (error) {
      console.log(error);
    }
    try {
      const newBridgeGasFee = await services.evmServer.bridge_gas_fee(chainInfoKey);
      setBridgeGasFee({ ...bridgeGasFee, [chainInfoKey]: divided_18(newBridgeGasFee) });
    } catch (error) {}
  };

  useEffect(() => {
    if (account && chainInfoKey) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainInfoKey]);
  return fetchBalance;
}

export { useFetchBalance };
