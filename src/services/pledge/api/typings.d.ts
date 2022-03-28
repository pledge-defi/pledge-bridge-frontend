declare namespace API {
  type LockedCountdown = {
    time?: string;
    timestamp?: string;
  };

  type TxsHistoryRequest = {
    address?: string;
    txType?: string;
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
    depositHash?: string;
    bridgeHash?: string;
  };

  type AddTxRequest = {
    srcChain?: string;
    destChain?: string;
    address?: string;
    txType?: string;
    asset?: string;
    txHash?: string;
    amount?: string;
  };

  type userAssets = {
    code?: number;
    message?: string;
    data?: UserAssetsData;
  };

  type UserAssetsData = {
    locked_plgr?: string;
    mplgr_can_withdraw?: string;
    plgr_can_withdraw?: string;
    token?: string;
  };
}
