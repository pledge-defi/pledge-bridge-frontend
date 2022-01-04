import {
  MPLGR_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
  PLGR_CONTRACT_ADDRESS,
} from '@/utils/constants';

export default {
  BSC: {
    chainName: 'BSC',
    contractAddress: PLGR_CONTRACT_ADDRESS,
    pledgerBridgeContractAddress: PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
    chainImageAsset: require('@/assets/images/BSC.svg'),
    chainDesc: 'BSC Network',
    currencyName: 'PLGR',
    currencyImageAsset: require('@/assets/images/PLGR.svg'),
  },
  Ethereum: {
    chainName: 'Ethereum',
    contractAddress: MPLGR_CONTRACT_ADDRESS,
    pledgerBridgeContractAddress: PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
    chainImageAsset: require('@/assets/images/Ethereum.svg'),
    chainDesc: 'Ethereum Network',
    currencyName: 'MPLGR',
    currencyImageAsset: require('@/assets/images/MPLGR.svg'),
  },
};
