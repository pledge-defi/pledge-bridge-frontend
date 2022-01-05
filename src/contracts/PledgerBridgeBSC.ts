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
  | 'base'
  | 'bridge_address'
  | 'can_release'
  | 'cb_ddid'
  | 'cb_rid'
  | 'handler_address'
  | 'locked_infos'
  | 'locked_plgr_tx'
  | 'owner'
  | 'plgr_address'
  | 'plgr_amounts'
  | 'totalLockedAmounts'
  | 'total_pledge'
  | 'wait_time'
  | 'x'
  | 'admin_update_configure'
  | 'set_x'
  | 'set_base'
  | 'admin_update_bridge'
  | 'deposit_plgr'
  | 'widthdraw_plgr'
  | 'deposit_mplgr_bridge'
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
  txid: string;
  time: string;
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
   */
  base: () => MethodConstantReturnContext<string>;
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
   * @param parameter0 Type: bytes32, Indexed: false
   */
  can_release: (parameter0: string | number[]) => MethodConstantReturnContext<Can_releaseResponse>;
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
   * @param parameter0 Type: bytes32, Indexed: false
   */
  locked_plgr_tx: (
    parameter0: string | number[],
  ) => MethodConstantReturnContext<Locked_plgr_txResponse>;
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
  totalLockedAmounts: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  total_pledge: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  wait_time: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  x: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _wait_time Type: uint256, Indexed: false
   */
  admin_update_configure: (_wait_time: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _x Type: uint256, Indexed: false
   */
  set_x: (_x: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param _base Type: uint256, Indexed: false
   */
  set_base: (_base: string) => MethodReturnContext;
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
   * @param _owner Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  deposit_plgr: (_owner: string, amount: string) => MethodReturnContext;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  execute_upkeep: () => MethodReturnContext;
}
