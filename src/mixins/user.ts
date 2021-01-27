import { mapActions, mapGetters } from 'vuex';
import { USER_ACTIONS_FETCH_USERS, USER_GETTERS_USERS } from '@/store';

export default {
  name: 'user-mixin',
  computed: {
    ...mapGetters({
      users: USER_GETTERS_USERS,
    }),
  },
  methods: {
    ...mapActions({
      fetchUsers: USER_ACTIONS_FETCH_USERS,
    }),
  },
};
