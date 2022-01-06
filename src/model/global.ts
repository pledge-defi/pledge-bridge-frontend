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
