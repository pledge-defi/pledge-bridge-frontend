import type BN from 'bn.js';
import type BigNumber from 'bignumber.js';
import type {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send: ((options: SendOptions) => PromiEvent<TransactionReceipt>) &
    ((
      options: SendOptions,
      callback: (error: Error, result: any) => void,
    ) => PromiEvent<TransactionReceipt>);
  estimateGas: ((options: EstimateGasOptions) => Promise<number>) &
    ((
      options: EstimateGasOptions,
      callback: (error: Error, result: any) => void,
    ) => Promise<number>);
  encodeABI: () => string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call: (() => Promise<TCallReturn>) &
    ((options: CallOptions) => Promise<TCallReturn>) &
    ((
      options: CallOptions,
      callback: (error: Error, result: TCallReturn) => void,
    ) => Promise<TCallReturn>);
  encodeABI: () => string;
}

export type MethodReturnContext = MethodPayableReturnContext;

export type ContractContext = Web3ContractContext<
  PledgerBridgeBSC,
  PledgerBridgeBSCMethodNames,
  PledgerBridgeBSCEventsContext,
  PledgerBridgeBSCEvents
>;
export type PledgerBridgeBSCEvents = 'DepositPLGR' | 'WithdrawPLGR';
export interface PledgerBridgeBSCEventsContext {
  DepositPLGR: (
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  WithdrawPLGR: (
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
}
export type PledgerBridgeBSCMethodNames =
  | 'new'
  | 'balances'
  | 'bridge_address'
  | 'bridge_gas_fee'
  | 'can_release'
  | 'cb_ddid'
  | 'cb_rid'
  | 'factor'
  | 'handler_address'
  | 'locked_infos'
  | 'locked_plgr_tx'
  | 'owner'
  | 'plgr_address'
  | 'plgr_amounts'
  | 'total_mplgr_release'
  | 'total_plgr_locked'
  | 'admin_update_bridge'
  | 'set_bridge_gas_fee'
  | 'set_total_release'
  | 'deposit_plgr'
  | 'widthdraw_plgr'
  | 'deposit_mplgr_bridge'
  | 'is_release_all_locked_plgr'
  | 'execute_upkeep';
export interface DepositPLGREventEmittedResponse {
  txid: string | number[];
  owner: string;
  amount: string;
  time: string;
}
export interface WithdrawPLGREventEmittedResponse {
  owner: string;
  amount: string;
}
export interface Can_releaseResponse {
  owner: string;
  amount: string;
}
export interface Locked_infosResponse {
  owner: string;
  amount: string;
}
export interface Locked_plgr_txResponse {
  owner: string;
  amount: string;
}
export interface PledgerBridgeBSC {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _plgr_address Type: address, Indexed: false
   * @param _bridge_address Type: address, Indexed: false
   * @param _handler_address Type: address, Indexed: false
   * @param _cb_ddid Type: uint8, Indexed: false
   * @param _cb_rid Type: bytes32, Indexed: false
   */
  new: (
    _plgr_address: string,
    _bridge_address: string,
    _handler_address: string,
    _cb_ddid: string | number,
    _cb_rid: string | number[],
  ) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  balances: (parameter0: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  bridge_address: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  bridge_gas_fee: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  can_release: (parameter0: string) => MethodConstantReturnContext<Can_releaseResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cb_ddid: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  cb_rid: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  factor: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  handler_address: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  locked_infos: (parameter0: string) => MethodConstantReturnContext<Locked_infosResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  locked_plgr_tx: (parameter0: string) => MethodConstantReturnContext<Locked_plgr_txResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  plgr_address: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  plgr_amounts: (parameter0: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  total_mplgr_release: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  total_plgr_locked: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _bridge_address Type: address, Indexed: false
   * @param _handler_address Type: address, Indexed: false
   * @param _cb_ddid Type: uint8, Indexed: false
   * @param _cb_rid Type: bytes32, Indexed: false
   */
  admin_update_bridge: (
    _bridge_address: string,
    _handler_address: string,
    _cb_ddid: string | number,
    _cb_rid: string | number[],
  ) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _bridge_gas_fee Type: uint256, Indexed: false
   */
  set_bridge_gas_fee: (_bridge_gas_fee: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _total_mplgr_release Type: uint256, Indexed: false
   */
  set_total_release: (_total_mplgr_release: string) => MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  deposit_plgr: (_owner: string, amount: string) => MethodPayableReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  widthdraw_plgr: (amount: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param data Type: bytes, Indexed: false
   */
  deposit_mplgr_bridge: (data: string | number[]) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  is_release_all_locked_plgr: () => MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  execute_upkeep: () => MethodReturnContext;
}
