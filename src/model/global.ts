import { atom } from 'recoil';

export const currencies = ['BSC', 'Ethereum'] as const;

export type CurrencyType = typeof currencies[number];

export const currencyState = atom<CurrencyType>({
  key: 'currencyState',
  default: 'BSC',
});
