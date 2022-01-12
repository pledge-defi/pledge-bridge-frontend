// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** Get deposit history POST /txsHistory */
export async function txsHistory(body: API.TxsHistoryRequest, options?: { [key: string]: any }) {
  return request<API.TxsHistory>('/txsHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
