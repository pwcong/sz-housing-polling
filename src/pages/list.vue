<template>
  <list-layout class="page-list">
    <template v-slot:header="{ className }">
      <van-nav-bar
        :class="className"
        title="用户日志"
        left-text="取消"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </template>
    <template v-slot:main="{ className }">
      <div :class="className" style="top: 46px; height: calc(100% - 46px)">
        <card-list :data="userList">
          <template v-slot="{ item }">
            <div class="row">
              <div class="col">
                <div class="label">查询时间</div>
                <div class="value">
                  {{ item.datetime }}
                </div>
              </div>
              <div class="col">
                <div class="label">轮候排序号</div>
                <div class="value">
                  {{ item.city }}
                </div>
              </div>
              <div class="col">
                <div class="label">户籍区排序号</div>
                <div class="value">
                  {{ item.area }}
                </div>
              </div>
            </div>
          </template>
        </card-list>
      </div>
    </template>
  </list-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { pageMixin, userMixin, rankMixin } from '@/mixins';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'page-list',
  mixins: [pageMixin, userMixin, rankMixin],
  computed: {
    userList() {
      const query = this.$route.query;
      return this.list
        .filter((d) => d.beian === query.beian)
        .reverse()
        .map((d) => ({
          ...query,
          ...d,
          datetime: dayjs(d.datetime).format('YYYY-MM-DD HH:mm:ss'),
        }));
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

.page-list {
  .row {
    display: flex;
    color: #666666;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 10px;
  }
  .col {
    flex: 1;
    font-size: 12px;
    text-align: center;
  }

  .label {
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: $theme-color;
  }
}
</style>
