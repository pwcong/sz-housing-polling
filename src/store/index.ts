import { createStore } from 'vuex';

import user from './modules/user';
import rank from './modules/rank';
import zjj from './modules/zjj';

export * from './types';

const store = createStore({
  modules: {
    user,
    rank,
    zjj,
  },
});

export default store;
