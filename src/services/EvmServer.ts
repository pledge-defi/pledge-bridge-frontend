import type { AddEthereumChainParameter, BridgeConfigSimple } from '@/constants/ChainBridge.d';
import {
  PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS,
  PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS,
} from '@/utils/constants';
import {
  gasOptions,
  getNewERC20AbiContract,
  getPledgerBridgeBSC,
  getPledgerBridgeETH,
  web3,
} from './web3';

const EvmServer = {
  async approve(ERC20Address: string, approveAddress: string, amount: string) {
    const contract = getNewERC20AbiContract(ERC20Address);
    const options = await gasOptions();
    return await contract.methods.approve(approveAddress, amount).send(options);
  },

  async deposit_plgr(_owner: string, amount: string) {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return await contract.methods.deposit_plgr(_owner, amount).send(options);
  },

  async widthdraw_plgr(amount: string) {
    const contract = getPledgerBridgeBSC(PLEDGER_BRIDGE_BSC_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return await contract.methods.widthdraw_plgr(amount).send(options);
  },

  async deposit_mplgr(_owner: string, amount: string) {
    const contract = getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return await contract.methods.deposit_mplgr(_owner, amount).send(options);
  },

  async mplgr_amounts(_owner: string) {
    const contract = getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    return await contract.methods.mplgr_amounts(_owner).call();
  },

  async widthdraw_mplgr(amount: string) {
    const contract = getPledgerBridgeETH(PLEDGER_BRIDGE_ETH_CONTRACT_ADDRESS);
    const options = await gasOptions();
    return await contract.methods.widthdraw_mplgr(amount).send(options);
  },

  // async tokenBalance(contractAddress: string) {
  //   const contract = getErc20Contract(contractAddress);
  //   const destAddress = await getDefaultAccount();
  //   const options = await gasOptions();
  //   return await contract.methods.balanceOf(destAddress).call(options);
  // },
  // async approveToken(
  //   tokenAddress: string,
  //   erc20HandlerAddress: string,
  //   erc20Decimals: string,
  //   price: string,
  // ) {
  //   const contract = getErc20Contract(tokenAddress);
  //   const options = await gasOptions();

  //   const ten = new BigNumber(10);
  //   const power = ten.exponentiatedBy(erc20Decimals);
  //   const amount = new BigNumber(price).times(power).toString();

  //   return await contract.methods.approve(erc20HandlerAddress, amount).send(options);
  // },
  // async deposit(
  //   bridgeAddress: string,
  //   destinationChainId: string,
  //   tokenResourceId: string,
  //   erc20Decimals: string,
  //   tokenAmount: string,
  //   recipientAddress: string,
  // ) {
  //   const contract = getPledgerBridgeBSC(bridgeAddress);
  //   const options = await gasOptions();

  //   const feePrice = await contract.methods._fee().call(options);
  //   const ten = new BigNumber(10);
  //   const power = ten.exponentiatedBy(erc20Decimals);
  //   const feeAmount = new BigNumber(feePrice).times(power).toString();
  //   const bridgeAmount = new BigNumber(tokenAmount).times(power).toString();

  //   const data = createERCDepositData(bridgeAmount, recipientAddress);

  //   await contract.methods
  //     .deposit(destinationChainId, tokenResourceId, data)
  //     .send({ ...options, value: feeAmount });
  // },
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

export default EvmServer;
