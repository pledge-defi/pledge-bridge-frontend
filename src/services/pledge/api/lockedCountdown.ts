// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 此处后端没有提供注释 POST /lockedCountdown */
export async function lockedCountdown(options?: { [key: string]: any }) {
  return request<API.LockedCountdown>('/lockedCountdown', {
    method: 'POST',
    ...(options || {}),
  });
}
