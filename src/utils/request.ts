/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import type { ResponseError } from 'umi-request';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/** 异常处理程序 */
const errorHandler = (error: ResponseError | { response: Response }) => {
  const { response } = error;
  const { status } = response || {};

  // eslint-disable-next-line consistent-return
  return new Promise<void>((resolve, reject) => {
    try {
      if (response && status) {
        response
          .clone()
          .text()
          .then((e) => {
            const errorText = e && e.length < 240 ? e : codeMessage[status];
            if (status === 502) {
              notification.error({
                description: errorText,
                message: '网络异常',
              });
              return reject();
            }
            if (status === 401) {
              // if (window.location.pathname !== '/users/login') {
              //   history.replace('/user/login');
              // }
              return resolve();
            }
            message.error(errorText);
            return resolve();
          });
      } else if (!response) {
        notification.error({
          description: '您的网络发生异常，无法连接服务器',
          message: '网络异常',
        });
        return reject();
      }
    } catch {
      return reject();
    }
  });
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  prefix: 'https://dev-bridge-backend.pledger.finance/api/v2',
});

export default request;
