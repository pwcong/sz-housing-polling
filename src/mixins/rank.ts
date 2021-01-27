import { mapActions, mapGetters } from 'vuex';

import { RANK_ACTIONS_FETCH_LIST, RANK_GETTERS_LIST } from '@/store';

export default {
  name: 'zjj-mixin',
  computed: {
    ...mapGetters({
      list: RANK_GETTERS_LIST,
    }),
  },
  methods: {
    ...mapActions({
      fetchList: RANK_ACTIONS_FETCH_LIST,
    }),
  },
};
