import {
  USER_MUTATIONS_SET_USERS,
  USER_GETTERS_USERS,
  USER_ACTIONS_FETCH_USERS,
  RANK_ACTIONS_FETCH_LIST,
} from '../types';

export enum EUserType {
  ANJUFANG = '1',
  GONGZUFANG = '2',
}

export interface IUser {
  type: EUserType;
  beian: string;
  name: string;
  id: string;
}

export interface IUserInfo {}

export default {
  state: {
    users: [
      // {
      //   type: EUserType.GONGZUFANG,
      //   beian: 'BHR00309058',
      //   name: '彭伟聪',
      //   id: '441523199602017594',
      // },
    ],
  },
  getters: {
    [USER_GETTERS_USERS]: (state) => state.users,
  },
  mutations: {
    [USER_MUTATIONS_SET_USERS]: (state, payload) => {
      state.users = payload;
    },
  },
  actions: {
    [USER_ACTIONS_FETCH_USERS]: ({ commit, dispatch }, payload) => {
      // @ts-ignore
      chrome.storage.sync.set({
        users: payload,
      });
      commit(USER_MUTATIONS_SET_USERS, payload);
      dispatch(RANK_ACTIONS_FETCH_LIST, payload);
    },
  },
};
