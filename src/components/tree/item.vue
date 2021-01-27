<template>
  <div class="tree-item">
    <div class="tree-item-content" @click="isOpen = !isOpen">
      <div class="tree-item-content-l">
        <div :class="{ 'tree-item-toggle': true, active: isOpen }">
          <van-icon v-show="hasChildren" name="arrow" />
        </div>
      </div>
      <div class="tree-item-content-r">
        <slot name="item" :item="data" :depth="depth" />
      </div>
    </div>
    <div v-show="isOpen" v-if="hasChildren" class="tree-item-children">
      <tree :data="data.children" :depth="depth + 1">
        <template v-slot:item="props">
          <slot name="item" v-bind="props" />
        </template>
      </tree>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'tree-item',
  props: {
    depth: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default: () => ({
        children: [],
      }),
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    hasChildren() {
      return this.data.children && this.data.children.length;
    },
  },
});
</script>

<style lang="scss" scoped>
.tree-item {
  position: relative;

  &-children {
    padding-left: 24px;
  }

  &-content {
    font-size: 14px;
    padding: 5px 0;
    display: flex;

    align-items: center;

    &-r {
      flex: 1;
    }
  }

  &-toggle {
    width: 24px;
    text-align: center;
    &.active {
      transform: rotate(90deg);
    }
  }
}
</style>
