import api from '@/api';

import {
  RANK_GETTERS_LIST,
  RANK_MUTATIONS_SET_LIST,
  RANK_ACTIONS_FETCH_LIST,
  ZJJ_ACTIONS_FETCH_KEY,
} from '../types';
import { IUser } from './user';

export interface IRank {
  beian: string;
  city: number;
  area: number;
  datetime: number;
}

export default {
  state: {
    list: [],
  },
  getters: {
    [RANK_GETTERS_LIST]: (state) => state.list,
  },
  mutations: {
    [RANK_MUTATIONS_SET_LIST]: (state, payload) => {
      state.list = payload;
    },
  },
  actions: {
    [RANK_ACTIONS_FETCH_LIST]: ({ commit, dispatch }, payload: Array<IUser>) =>
      new Promise(async (resolve) => {
        // @ts-ignore
        chrome.storage.sync.get(['list'], async (result) => {
          let { list = [] } = result;

          const newList = [];

          for (let i = 0, l = payload.length; i < l; i++) {
            const t = payload[i];
            try {
              const key = await dispatch(ZJJ_ACTIONS_FETCH_KEY);
              const rank = await api.zjj.getRank(key, t);

              const userList = list.filter((d) => d.beian === t.beian);
              const oldRank = userList[userList.length - 1];

              if (
                (!!oldRank &&
                  (rank.area !== oldRank.area || rank.city !== oldRank.city)) ||
                !oldRank
              ) {
                newList.push(rank);
              }
            } catch (err) {
              // DO NOTHING
            }
          }

          list = list.concat(newList);

          commit(RANK_MUTATIONS_SET_LIST, list);

          // @ts-ignore
          chrome.storage.sync.set({
            list,
          });

          resolve(list);
        });
      }),
  },
};
