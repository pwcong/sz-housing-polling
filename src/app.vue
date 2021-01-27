<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cacheList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { userMixin } from './mixins';
import { routes } from './router';
import { getCacheList } from './utils';

export default defineComponent({
  name: 'app',
  mixins: [userMixin],
  data() {
    return {
      cacheList: getCacheList(routes),
    };
  },
  created() {
    // 全局后退方法
    this.$root.goBack = this.goBack;
    // @ts-ignore
    chrome.storage.sync.get(['users'], (result) => {
      const { users = [] } = result;
      this.fetchUsers(users);
    });
  },

  methods: {
    goBack() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss">
html,
body {
  font-family: 'Microsoft YaHei', sans-serif;
  position: relative;
  width: 300px;
  height: 450px;
  color: #333333;
  border: 1px solid #dddddd;
  background-color: white;
}

* {
  -webkit-overflow-scrolling: touch;
}
</style>
