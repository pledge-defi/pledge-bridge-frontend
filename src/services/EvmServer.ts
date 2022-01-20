import type { AddEthereumChainParameter } from '@/constants/ChainBridge.d';
import { CurrencyType } from '@/model/global';
import {
  PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
} from '@/utils/constants';
import { divided_18 } from '@/utils/public';
import {
  gasOptions,
  getNewERC20AbiContract,
  getPledgerBridgeBSC,
  getPledgerBridgeETH,
} from './web3';

const EvmServer = {
  async approveEstimateGas(ERC20Address: string, approveAddress: string, amount: string) {
    const contract = getNewERC20AbiContract(ERC20Address);
    const options = await gasOptions();
    return await contract.methods.approve(approveAddress, amount).estimateGas(options);
  },

  async approve(ERC20Address: string, approveAddress: string, amount: string) {
    const contract = getNewERC20AbiContract(ERC20Address);
    const options = await gasOptions();
    contract.methods.approve(approveAddress, amount).estimateGas({});
    return await contract.methods.approve(approveAddress, amount).send(options);
  },

  async bridge_gas_fee(currency: CurrencyType) {
    const contract =
      currency === 'BSC'
        ? getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS)
        : getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    return await contract.methods.bridge_gas_fee().call();
  },

  async balanceOf(ERC20Address: string, account: string) {
    const contract = getNewERC20AbiContract(ERC20Address);
    return await contract.methods.balanceOf(account).call();
  },

  async totalTransferAmount() {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    const base = await contract.methods.total_mplgr_release().call();
    return 3 * +divided_18(base)!;
  },

  async mplgr_amounts(account: string) {
    const contract = getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    return await contract.methods.mplgr_amounts(account).call();
  },

  async plgr_amounts(account: string) {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    return await contract.methods.plgr_amounts(account).call();
  },

  async locked_plgr_tx(account: string) {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    return await await contract.methods.locked_plgr_tx(account).call();
  },

  async deposit_plgr(_owner: string, amount: string, gasFeeValue: string) {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    const options = await gasOptions({ value: gasFeeValue });
    return [contract.methods.deposit_plgr(_owner, amount), options];
  },

  async widthdraw_plgr(amount: string) {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return [contract.methods.widthdraw_plgr(amount), options];
  },

  async deposit_mplgr(_owner: string, amount: string, gasFeeValue: string) {
    const contract = getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    const options = await gasOptions({ value: gasFeeValue });
    return [contract.methods.deposit_mplgr(_owner, amount), options];
  },

  async widthdraw_mplgr(amount: string) {
    const contract = getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return [contract.methods.widthdraw_mplgr(amount), options];
  },

  async execute_upkeep() {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return await contract.methods.execute_upkeep().send(options);
  },

  async switchNetwork(value: AddEthereumChainParameter) {
    try {
      return await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: value.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          return await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [value],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  },
};

export default EvmServer;
