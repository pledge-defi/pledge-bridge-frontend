import BigNumber from 'bignumber.js';

export const dealNumber_18 = (num: BigNumber.Value) => {
  if (!num) return undefined;
  const x = new BigNumber(num);
  const y = new BigNumber(1e18);
  return x.multipliedBy(y).toFixed();
};
