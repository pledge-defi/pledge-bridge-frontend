import chainInfos from '@/constants/chainInfos';
import { InjectedConnector } from '@web3-react/injected-connector';
import { map } from 'lodash';

export const injected = new InjectedConnector({
  supportedChainIds: map(chainInfos, (c) => c.chainId),
});
