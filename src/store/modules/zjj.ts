import {
  ZJJ_ACTIONS_FETCH_KEY,
  ZJJ_MUTATIONS_SET_KEY,
  ZJJ_GETTERS_KEY,
} from '../types';

import api from '@/api';

let req = null;

export default {
  state: {
    key: null,
  },
  getters: {
    [ZJJ_GETTERS_KEY]: (state) => state.key,
  },
  mutations: {
    [ZJJ_MUTATIONS_SET_KEY]: (state, payload) => {
      state.key = payload;
    },
  },
  actions: {
    [ZJJ_ACTIONS_FETCH_KEY]: ({ commit, state }) =>
      req ||
      (req = new Promise(async (resolve, reject) => {
        if (state.key) {
          resolve(state.key);
          req = null;
          return;
        }

        try {
          const key = await api.zjj.getKey();
          commit(ZJJ_MUTATIONS_SET_KEY, key);
          resolve(key);
        } catch (error) {
          reject(error);
        } finally {
          req = null;
        }
      })),
  },
};
