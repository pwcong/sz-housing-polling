<template>
  <div
    :class="{
      'filter-trigger': true,
      active: isActive,
    }"
    @click="handleClick"
  >
    <van-icon name="filter-o" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'filter-trigger',
  emits: ['click'],
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isActive() {
      let active = false;
      Object.keys(this.modelValue).forEach((k) => {
        const v = this.modelValue[k];
        if (
          v !== null &&
          v !== undefined &&
          v !== '' &&
          (!Array.isArray(v) || (Array.isArray(v) && v.length > 0))
        ) {
          active = true;
        }
      });
      return active;
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', arguments);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.filter-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 54px;
  height: 54px;
  background-color: white;
  transition: all 0.2s;
  &:active {
    background-color: #f5f5f5;
  }
  .van-icon {
    font-size: 18px;
  }

  &.active .van-icon {
    color: $theme-color;
  }
}
</style>
