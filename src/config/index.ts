import qs from 'qs';

import pkg from '@/../package.json';
import env from './env';

const config: { [key: string]: any } = {};

config.pkg = pkg;

config.env = env;

config.baseUrl = {
  // 开发环境
  development: '',
  // 生产环境
  production: 'http://zjj.sz.gov.cn',
};

// 接口请求
config.api = {
  commonHeaders: function () {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  },
  getRequest: function (func, params, options) {
    options = Object.assign(
      {
        baseUrl: config.baseUrl,
      },
      options
    );

    const { baseUrl, headers } = options;

    let requestUrl = `${baseUrl[config.env]}/${func}`;
    if (!!params) {
      requestUrl += `?${qs.stringify(params)}`;
    }

    return {
      url: requestUrl,
      method: 'get',
      headers: headers || this.commonHeaders(),
      data: {},
      options,
    };
  },
  postRequest: function (func, params, options) {
    options = Object.assign(
      {
        baseUrl: config.baseUrl,
      },
      options
    );

    const { baseUrl, headers } = options;

    return {
      url: `${baseUrl[config.env]}/${func}`,
      method: 'post',
      data: qs.stringify(params || {}),
      headers: headers || this.commonHeaders(),
      options,
    };
  },
};

export default config;
