import { defineComponent } from 'vue';

import { buildSelectionMixin } from '@/mixins';

import View from './index.vue';

export function buildItemDetail<T>(name: string, Component) {
  const selectionMixin = buildSelectionMixin({
    value: {
      type: Object,
      default: {},
    },
  });

  return defineComponent<{
    modelValue?: T;
  }>({
    name,
    mixins: [selectionMixin, View],
    components: {
      Detail: Component,
    },
  });
}
