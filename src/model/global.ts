import type { ChainInfo, ChainInfoKeysType } from '@/constants/chainInfos';
import chainInfos, { chainInfoKeys } from '@/constants/chainInfos';
import { forEach } from 'lodash';
import { atom } from 'recoil';

const defaultChain = chainInfos[0];

export const chainInfoKeyState = atom<ChainInfoKeysType>({
  key: 'chainInfoKeyState',
  default: defaultChain.chainName as ChainInfoKeysType,
});

export const chainInfoState = atom<ChainInfo>({
  key: 'chainInfoState',
  default: defaultChain,
});

export const walletModalOpen = atom<boolean>({
  key: 'walletModalOpen',
  default: false,
});

const getDefualt = () => {
  const newObject = {};
  forEach(chainInfoKeys, (c) => (newObject[c] = ''));
  return newObject as Record<ChainInfoKeysType, string>;
};

export type BalanceType = Record<ChainInfoKeysType, string>;
export const balanceState = atom<BalanceType>({
  key: 'balanceState',
  default: getDefualt(),
});

export type BridgeGasFee = Record<ChainInfoKeysType, string>;
export const bridgeGasFeeState = atom<BridgeGasFee>({
  key: 'bridgeGasFeeState',
  default: getDefualt(),
});
