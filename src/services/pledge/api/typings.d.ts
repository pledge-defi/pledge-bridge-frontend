declare namespace API {
  type LockedCountdown = {
    time?: string;
    timestamp?: string;
  };

  type TxsHistoryRequest = {
    address?: string;
    txType?: number;
    page?: number;
    pageSize?: number;
  };

  type TxsHistory = {
    code?: number;
    message?: string;
    data?: HistoryData;
  };

  type HistoryData = {
    count?: number;
    rows?: HistoryDetail[];
  };

  type HistoryDetail = {
    srcChain?: string;
    destChain?: string;
    asset?: string;
    amount?: string;
    fee?: string;
    time?: string;
    status?: boolean;
    depositHash?: string;
    bridgeHash?: string;
  };

  type AddTxRequest = {
    address?: string;
    txType?: number;
    asset?: string;
    txHash?: string;
    amount?: string;
  };
}
