// import chainInfos from '@/constants/chainInfos';
import { DEV_SUPPORTED_CHAIN_IDS } from '../../constants/chains';
import { InjectedConnector } from '@web3-react/injected-connector';
// import { map } from 'lodash';
export const injected = new InjectedConnector({
  // supportedChainIds: map(chainInfos, (c) => c.chainId),
  supportedChainIds: DEV_SUPPORTED_CHAIN_IDS,
});
