import type { AddEthereumChainParameter, BridgeConfigSimple } from '@/constants/ChainBridge.d';
import { web3 } from './web3';

const MetacoreServer = {
  async switchNetwork(value: BridgeConfigSimple) {
    return await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: web3.utils.toHex(value.networkId),
          chainName: value.name,
          nativeCurrency: {
            name: value.nativeTokenSymbol,
            symbol: value.nativeTokenSymbol,
            decimals: value.decimals,
          },
          rpcUrls: [value.rpcUrl],
          blockExplorerUrls: [value.explorerUrl],
        } as AddEthereumChainParameter,
      ],
    });
  },
};

export default MetacoreServer;
