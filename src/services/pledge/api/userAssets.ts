// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/**
 *
 * @param {String}  token  用户钱包地址
 * @param options
 * @returns
 */
export async function userAssets(params: object, options?: { [key: string]: any }) {
  return request<API.userAssets>('/userAssets', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: params,
    ...(options || {}),
  });
}
