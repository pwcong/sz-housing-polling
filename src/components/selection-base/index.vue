<template>
  <van-popup
    :show="visible"
    :teleport="selectionContainer"
    position="right"
    :style="{ width: '100%', height: '100vh' }"
  >
    <list-layout
      class="selection-base"
      :style="{ width: '100%', height: '100%' }"
    >
      <template v-slot:header="{ className }">
        <van-nav-bar
          :class="className"
          :title="title"
          left-text="取消"
          left-arrow
          @click-left="onCancel"
        >
          <template #right>
            <div style="color: white">
              <span
                v-for="(action, index) in actions"
                :key="index"
                style="margin-right: 10px"
                @click="handleAction(action)"
              >
                {{ action.text }}
              </span>
              <span
                @click="tempValue = []"
                v-if="!!tempValue.length"
                style="margin-right: 10px"
              >
                清空
              </span>
              <span @click="onOk">
                {{ `确定${!!tempValue.length ? `(${tempValue.length})` : ''}` }}
              </span>
            </div>
          </template>
        </van-nav-bar>
      </template>

      <template v-if="searchable" v-slot:toolbar="{ className }">
        <div :class="className" :style="{ top: '46px' }">
          <van-search v-model="params.keyword" placeholder="请输入搜索关键词" />
        </div>
      </template>

      <template v-slot:main="{ className }">
        <van-pull-refresh
          :class="className"
          :modelValue="loading && !loadingMore"
          @refresh="onRefresh"
          :style="{
            top: searchable ? '100px' : '46px',
            height: searchable ? 'calc(100% - 100px)' : 'calc(100% - 46px)',
          }"
        >
          <van-list
            :loading="loadingMore"
            :finished="!hasMore"
            finished-text="没有更多了"
            @load="onLoadMore"
          >
            <div class="list">
              <div
                class="item"
                v-for="(item, index) in list"
                :key="index"
                @click="handleChange(item)"
              >
                <slot
                  name="item"
                  :item="item"
                  :index="index"
                  :checked="isChecked(item)"
                >
                  <div class="item-wrapper">
                    <div class="left">
                      <van-checkbox :modelValue="isChecked(item)" />
                    </div>
                    <div class="right">
                      {{ getText(item) }}
                    </div>
                  </div>
                </slot>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </template>
    </list-layout>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'selection-base',
  props: {
    title: {
      type: String,
      default: '选择',
    },
    searchable: {
      type: Boolean,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    getItem: {
      type: Function,
      default: (_, item) => Promise.resolve(item),
    },
    getText: {
      type: Function,
      default: (item) => item.text,
    },
    actions: {
      type: Array,
      default: () => [
        // {
        //   text: '',
        //   func: (_) => {
        //     // TODO
        //   },
        // },
      ],
    },
  },

  methods: {
    isChecked(item) {
      return this.tempValue.findIndex((d) => d.value === item.value) > -1;
    },
    async handleChange(item) {
      item = await this.getItem(this, item);

      if (this.isChecked(item)) {
        this.tempValue = this.tempValue.filter((d) => d.value !== item.value);
      } else {
        if (this.multiple) {
          this.tempValue = this.tempValue.concat(item);
        } else {
          this.tempValue = [item];
        }
      }
    },
    handleAction(action) {
      !!action.func && action.func(this);
    },
  },
});
</script>
<style lang="scss" scoped>
.selection-base {
  .list {
    padding: 0 14px;
  }

  .item {
    border-bottom: 1px solid #eeeeee;
  }

  .item-wrapper {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .left {
      .van-checkbox {
        margin-right: 12px;
        border-bottom: none;
      }
    }
    .right {
      flex: 1;
      font-size: 14px;
    }
  }
}
</style>
