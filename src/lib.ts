import { App } from 'vue';

import axios from 'axios';
import Vant from 'vant';
import { Toast, Dialog } from 'vant';

import config from '@/config';
import Components from '@/components';

import 'minireset.css';

import 'vant/lib/index.less';
import '@/assets/css/vant.scss';

if (config.env === 'development') {
  window['chrome'] = {
    storage: {
      sync: {
        get: (keys: Array<string>, cb) => {
          cb(
            keys.reduce((p, c) => {
              try {
                p[c] = JSON.parse(localStorage.getItem(c)) || undefined;
              } finally {
                return p;
              }
            }, {})
          );
        },
        set: (object: object) => {
          Object.keys(object).forEach((k) =>
            localStorage.setItem(k, JSON.stringify(object[k]))
          );
        },
      },
    },
  };
}

export default {
  install(app: App) {
    app.config.globalProperties.$toast = Toast;
    app.config.globalProperties.$dialog = Dialog;
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$config = config;

    app.use(Vant);
    app.use(Components);
  },
};
