import { atom } from 'recoil';

export const currencies = ['BSC', 'Ethereum'] as const;

export type CurrencyType = typeof currencies[number];

export const currencyState = atom<CurrencyType>({
  key: 'currencyState',
  default: 'BSC',
});

export type BalanceType = Record<CurrencyType, string>;
export const balanceState = atom<BalanceType>({
  key: 'balanceState',
  default: {
    BSC: '',
    Ethereum: '',
  },
});

export type BridgeGasFee = Record<CurrencyType, string>;
export const bridgeGasFeeState = atom<BridgeGasFee>({
  key: 'bridgeGasFeeState',
  default: {
    BSC: '',
    Ethereum: '',
  },
});
