<template>
  <div class="list-layout">
    <slot name="header" class-name="list-layout-header" />
    <slot name="toolbar" class-name="list-layout-toolbar" />
    <slot name="main" class-name="list-layout-main" />
    <slot name="footer" class-name="list-layout-footer" />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'list-layout',
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

$cls: list-layout;

.#{$cls} {
  :deep(.#{$cls}-header),
  :deep(.#{$cls}-toolbar),
  :deep(.#{$cls}-main),
  :deep(.#{$cls}-footer) {
    position: absolute;
    width: 100%;
    left: 0;
    box-sizing: border-box;
  }

  :deep(.#{$cls}-header),
  :deep(.#{$cls}-toolbar) {
    z-index: 1;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
  }

  :deep(.#{$cls}-footer) {
    bottom: 0;
  }

  :deep(.#{$cls}-main) {
    overflow: auto;
  }
}
</style>
