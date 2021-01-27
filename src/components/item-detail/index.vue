<template>
  <van-popup
    :show="visible"
    :teleport="selectionContainer"
    position="right"
    :style="{ width: '100%', height: '100vh' }"
  >
    <list-layout>
      <template v-slot:header="{ className }">
        <van-nav-bar
          :class="className"
          :title="title"
          left-text="返回"
          left-arrow
          @click-left="onCancel"
        />
      </template>

      <template v-slot:main="{ className }">
        <div :class="className" style="top: 46px; height: calc(100% - 46px)">
          <detail :data="tempValue" />
        </div>
      </template>
    </list-layout>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'item-detail',
  props: {
    title: {
      type: String,
      default: '查看详情',
    },
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/css/common.scss';
</style>
