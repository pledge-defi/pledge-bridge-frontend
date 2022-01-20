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
  PledgerBridgeETH,
  PledgerBridgeETHMethodNames,
  PledgerBridgeETHEventsContext,
  PledgerBridgeETHEvents
>;
export type PledgerBridgeETHEvents =
  | 'DebugDepositMPLGR'
  | 'DepositMPLGR'
  | 'DepositMPLGRBridge'
  | 'WithdrawMPLGR';
export interface PledgerBridgeETHEventsContext {
  DebugDepositMPLGR: (
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  DepositMPLGR: (
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  DepositMPLGRBridge: (
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  WithdrawMPLGR: (
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
}
export type PledgerBridgeETHMethodNames =
  | 'new'
  | 'balances'
  | 'bridge_address'
  | 'bridge_gas_fee'
  | 'cb_ddid'
  | 'cb_rid'
  | 'handler_address'
  | 'mplgr_address'
  | 'mplgr_amounts'
  | 'owner'
  | 'admin_update_bridge'
  | 'set_bridge_gas_fee'
  | 'deposit_mplgr_bridge'
  | 'widthdraw_mplgr'
  | 'deposit_mplgr';
export interface DebugDepositMPLGREventEmittedResponse {
  data: string | number[];
}
export interface DepositMPLGREventEmittedResponse {
  owner: string;
  amount: string;
}
export interface DepositMPLGRBridgeEventEmittedResponse {
  owner: string;
  amount: string;
}
export interface WithdrawMPLGREventEmittedResponse {
  recipient: string;
  amount: string;
}
export interface PledgerBridgeETH {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _bridge_address Type: address, Indexed: false
   * @param _handler_address Type: address, Indexed: false
   * @param _mplgr_address Type: address, Indexed: false
   * @param _cb_ddid Type: uint8, Indexed: false
   * @param _cb_rid Type: bytes32, Indexed: false
   */
  new: (
    _bridge_address: string,
    _handler_address: string,
    _mplgr_address: string,
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
   */
  mplgr_address: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  mplgr_amounts: (parameter0: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner: () => MethodConstantReturnContext<string>;
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
   * @param data Type: bytes, Indexed: false
   */
  deposit_mplgr_bridge: (data: string | number[]) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  widthdraw_mplgr: (amount: string) => MethodReturnContext;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param _owner Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  deposit_mplgr: (_owner: string, amount: string) => MethodPayableReturnContext;
}
