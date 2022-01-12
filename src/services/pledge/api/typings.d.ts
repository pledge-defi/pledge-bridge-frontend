declare namespace API {
  type LockedCountdown = {
    time?: string;
    timestamp?: string;
  };

  type TxsHistoryRequest = {
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
    status?: string;
  };

  type AddTxRequest = {
    asset?: string;
    txHash?: string;
    amount?: number;
  };
}
