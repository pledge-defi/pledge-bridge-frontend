import type { CurrencyType } from '@/model/global';
import { web3 } from '@/services/web3';
import {
  MPLGR_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
  PLGR_CONTRACT_ADDRESS,
} from '@/utils/constants';
import Web3 from 'web3';
import type { AddEthereumChainParameter } from './ChainBridge.d';

type CurrencyInfos = Record<
  CurrencyType,
  {
    chainId: number;
    chainName: CurrencyType;
    contractAddress: string;
    pledgerBridgeContractAddress: string;
    chainImageAsset: string;
    chainDesc: string;
    currencyName: string;
    currencyImageAsset: string;
    symbol: string;
    netWorkInfo: AddEthereumChainParameter;
    web3: Web3;
  }
>;

const currencyInfos: CurrencyInfos = {
  BSC: {
    chainName: 'BSC',
    contractAddress: PLGR_CONTRACT_ADDRESS,
    pledgerBridgeContractAddress: PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
    chainImageAsset: require('@/assets/images/BSC.svg'),
    chainDesc: 'BSC Network',
    currencyName: 'PLGR',
    currencyImageAsset: require('@/assets/images/PLGR.svg'),
    chainId: 97,
    symbol: 'BNB',
    netWorkInfo: {
      chainId: web3.utils.toHex(97),
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'BSC',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
    web3: new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'),
  },
  Ethereum: {
    chainId: 3,
    chainName: 'Ethereum',
    contractAddress: MPLGR_CONTRACT_ADDRESS,
    pledgerBridgeContractAddress: PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
    chainImageAsset: require('@/assets/images/Ethereum.svg'),
    chainDesc: 'Ethereum Network',
    currencyName: 'MPLGR',
    currencyImageAsset: require('@/assets/images/MPLGR.svg'),
    symbol: 'ETH',
    netWorkInfo: {
      chainId: web3.utils.toHex(3),
      chainName: 'Ropsten 测试网络',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
      blockExplorerUrls: ['https://ropsten.etherscan.io'],
    },
    web3: new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'),
  },
};

export default currencyInfos;
