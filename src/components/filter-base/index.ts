import { buildUseList, IBuildUseListOptions } from '@/utils';
import { buildSelectionMixin } from '@/mixins';

import Component from './index.vue';
import FilterTrigger from './trigger.vue';
import {
  buildPropertyWatchMixin,
  IBuildPropertyWatchOptions,
} from '@/mixins/watch';

export enum EFilterType {
  'input' = 'input',
  'number' = 'number',
  'switch' = 'switch',
  'radio' = 'radio',
  'checkbox' = 'checkbox',
  'stepper' = 'stepper',
  'calendar' = 'calendar',
  'picker' = 'picker',
  'selection' = 'selection',
}

export interface IFilterItem {
  key: string;
  type: EFilterType;
  label: string;
  component?: string;
  props?: object;
  getText?: (value: any) => string;
}

// [
//   {
//     type: 'input',
//     key: 'input',
//     label: '输入框',
//   },
//   {
//     type: 'number',
//     key: 'number',
//     label: '数字输入框',
//   },
//   {
//     type: 'switch',
//     key: 'switch',
//     label: '开关',
//   },
//   {
//     type: 'radio',
//     key: 'radio',
//     label: '单选框',
//     props: {
//       options: [
//         {
//           value: '1',
//           text: '1',
//         },
//         {
//           value: '2',
//           text: '2',
//         },
//         {
//           value: '3',
//           text: '3',
//         },
//       ],
//     },
//   },
//   {
//     type: 'checkbox',
//     key: 'checkbox',
//     label: '复选框',
//     props: {
//       options: [
//         {
//           value: '1',
//           text: '1',
//         },
//         {
//           value: '2',
//           text: '2',
//         },
//         {
//           value: '3',
//           text: '3',
//         },
//       ],
//     },
//   },
//   {
//     type: 'stepper',
//     key: 'stepper',
//     label: '步进器',
//     props: {
//       min: -10,
//       max: 10,
//     },
//   },
//   {
//     type: 'calendar',
//     key: 'calendar',
//     label: '日历',
//     getText: (v) => (!!v ? v.toString() : ''),
//   },
//   {
//     type: 'picker',
//     key: 'picker',
//     label: '选择器',
//     component: '',
//     getText: (v) => (v || {}).text,
//     props: {
//       columns: [
//         {
//           value: '1',
//           text: '1',
//         },
//         {
//           value: '2',
//           text: '2',
//         },
//         {
//           value: '3',
//           text: '3',
//         },
//       ],
//     },
//   },
//   {
//     type: 'selection',
//     key: 'selection',
//     label: '选择器',
//     component: '',
//     getText: (v) => (v || []).map((d) => d.text).join(';'),
//     props: {
//       options: [
//         {
//           value: '1',
//           text: '1',
//         },
//         {
//           value: '2',
//           text: '2',
//         },
//         {
//           value: '3',
//           text: '3',
//         },
//       ],
//     },
//   },
// ]

export interface IBuildFilterBaseOptions<T, P>
  extends IBuildUseListOptions<T, {}, P>,
    IBuildPropertyWatchOptions {}

export function buildFilterBase<T extends IFilterItem = IFilterItem, P = {}>(
  name: string,
  options: IBuildUseListOptions<T, {}, P>
) {
  const useList = buildUseList<T, {}, P>(options);

  const selectionMixin = buildSelectionMixin({
    value: {
      type: Object,
      default: {},
    },
  });

  const watchMixin = buildPropertyWatchMixin({
    ...options,
    watchActionName: 'onRefresh',
  });

  return {
    name,
    mixins: [watchMixin, selectionMixin, Component],
    setup(props: P) {
      return useList(props, {
        pageNum: 1,
        pageCount: 20,
      });
    },
  };
}

export { FilterTrigger };
