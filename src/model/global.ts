import { atom } from 'recoil';

const currencies = ['BSC', 'Ethereum'] as const;

type CurrencyType = typeof currencies[number];

export const currencyState = atom<CurrencyType>({
  key: 'currencyState',
  default: 'BSC',
});
