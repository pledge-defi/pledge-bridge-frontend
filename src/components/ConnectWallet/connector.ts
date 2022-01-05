import { InjectedConnector } from '@web3-react/injected-connector';

import ChainBridge from '@/constants/ChainBridge';
import type { ChainBridgeConfig } from '@/constants/ChainBridge.d';

const _chainBridge: ChainBridgeConfig = {
  chains: ChainBridge.chains.filter((item) => item.type === 'Ethereum'),
};
const _chainIdList: number[] = _chainBridge.chains.map((item) => item.networkId) as number[];

export const injected = new InjectedConnector({ supportedChainIds: [..._chainIdList, 3, 1] });
