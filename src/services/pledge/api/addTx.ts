// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** Add Tx POST /addTx */
export async function addTx(body: API.AddTxRequest, options?: { [key: string]: any }) {
  return request<any>('/addTx', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
