<template>
  <div class="tree">
    <tree-item
      v-for="(item, index) in data"
      :key="index"
      :data="item"
      :depth="depth"
    >
      <template v-slot:item="props">
        <slot name="item" v-bind="{ ...props, index }">
          {{ item.text }}
        </slot>
      </template>
    </tree-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TreeItem from './item.vue';

export default defineComponent({
  name: 'tree',
  props: {
    depth: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TreeItem,
  },
});
</script>

<style lang="scss" scoped>
.tree {
}
</style>
