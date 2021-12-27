import type { ChainBridgeConfig } from './ChainBridge.d';

const ChainBridge: ChainBridgeConfig = {
  chains: [
    {
      chainId: 0,
      networkId: 525,
      name: 'Findora Testnet (Forge)',
      decimals: 18,
      bridgeAddress: '0x26925046a09d9AEfe6903eae0aD090be06186Bd9',
      erc20HandlerAddress: '0xE75Fb7714B5098E20A2D224693A1c210ad0c1A42',
      rpcUrl: 'https://prod-forge.prod.findora.org:8545',
      explorerUrl: 'https://blockscout.findorascan.io',
      type: 'Ethereum',
      nativeTokenSymbol: 'FRA',
      tokens: [
        {
          address: '0x0000000000000000000000000000000000001000',
          name: 'Findora',
          symbol: 'FRA',
          imageUri: 'FRAIcon',
          resourceId: '0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00',
        },
      ],
    },
    {
      chainId: 1,
      networkId: 97,
      name: 'bsc-testnet',
      decimals: 18,
      bridgeAddress: '0xacB8C5D7be5B23644eCe55789Eb6aA6bd6C31e64',
      erc20HandlerAddress: '0x3e1066Ea99f2934e728D85b03BD72d1BbD61D2D4',
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      explorerUrl: 'https://testnet.bscscan.com',
      type: 'Ethereum',
      nativeTokenSymbol: 'BNB',
      tokens: [
        {
          address: '0xa1238f3dE0A159Cd79d4f3Da4bA3a9627E48112e',
          name: 'FRA BEP20',
          symbol: 'FRA',
          imageUri: 'FRAIcon',
          resourceId: '0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00',
        },
      ],
    },
    // {
    //   chainId: 2,
    //   networkId: 524,
    //   name: 'findora-forge',
    //   decimals: 18,
    //   bridgeAddress: '0x26925046a09d9AEfe6903eae0aD090be06186Bd9',
    //   erc20HandlerAddress: '0xE75Fb7714B5098E20A2D224693A1c210ad0c1A42',
    //   rpcUrl: 'https://prod-forge.prod.findora.org:8545',
    //   explorerUrl: 'https://blockscout.findorascan.io',
    //   type: 'Ethereum',
    //   nativeTokenSymbol: 'FRA',
    //   tokens: [
    //     {
    //       address: '0x0000000000000000000000000000000000001000',
    //       name: 'Findora',
    //       symbol: 'FRA',
    //       imageUri: 'FRAIcon',
    //       resourceId: '0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00',
    //     },
    //   ],
    // },
  ],
};

export default ChainBridge;
