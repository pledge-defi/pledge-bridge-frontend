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
  NewERC20,
  NewERC20MethodNames,
  NewERC20EventsContext,
  NewERC20Events
>;
export type NewERC20Events = 'Approval' | 'Transfer';
export interface NewERC20EventsContext {
  Approval: (
    parameters: {
      filter?: { owner?: string | string[]; spender?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
  Transfer: (
    parameters: {
      filter?: { from?: string | string[]; to?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void,
  ) => EventResponse;
}
export type NewERC20MethodNames =
  | 'new'
  | 'name'
  | 'symbol'
  | 'decimals'
  | 'totalSupply'
  | 'balanceOf'
  | 'transfer'
  | 'allowance'
  | 'approve'
  | 'transferFrom'
  | 'increaseAllowance'
  | 'decreaseAllowance';
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  value: string;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  value: string;
}
export interface NewERC20 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param name Type: string, Indexed: false
   * @param symbol Type: string, Indexed: false
   */
  new: (name: string, symbol: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply: () => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param account Type: address, Indexed: false
   */
  balanceOf: (account: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transfer: (recipient: string, amount: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance: (owner: string, spender: string) => MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  approve: (spender: string, amount: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param sender Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  transferFrom: (sender: string, recipient: string, amount: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param addedValue Type: uint256, Indexed: false
   */
  increaseAllowance: (spender: string, addedValue: string) => MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param subtractedValue Type: uint256, Indexed: false
   */
  decreaseAllowance: (spender: string, subtractedValue: string) => MethodReturnContext;
}
