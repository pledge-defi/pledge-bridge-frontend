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
    src_chain?: string;
    dest_chain?: string;
    asset?: string;
    amount?: string;
    fee?: string;
    created_at?: string;
    status?: string | boolean;
    deposit_hash?: string;
    bridge_hash?: string;
  };

  type AddTxRequest = {
    srcChain?: string;
    destChain?: string;
    address?: string;
    txType?: string;
    asset?: string;
    txHash?: string;
    amount?: string;
    fee?: string;
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
