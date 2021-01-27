<template>
  <div class="item-box">
    <div v-if="title || showHead" class="item-head">
      <div class="item-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="item-action">
        <slot name="action" />
      </div>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'item-box',
  props: {
    title: String,
    showHead: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.item-box {
  width: 100%;
  background-color: white;
  .item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 48px;
    background: #f4f4f4;
    padding: 12px;
  }
  .item-title {
    font-size: 14px;
    color: #666666;
    font-weight: bold;
  }
}
</style>
