declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare interface Window {
  ethereum: any;
  web3?: Record<string, unknown>;
}
