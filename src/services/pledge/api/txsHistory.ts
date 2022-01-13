// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 此处后端没有提供注释 POST /txsHistory */
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
