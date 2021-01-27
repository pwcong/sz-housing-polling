import { buildSelectionMixin } from '@/mixins';
import {
  buildPropertyWatchMixin,
  IBuildPropertyWatchOptions,
} from '@/mixins/watch';
import { buildUseList, IBuildUseListOptions } from '@/utils';

import View from './index.vue';

export interface ISelectionItem {
  text: string;
  value: string | number;
}

export interface ISelectionParams {
  keyword: string;
}

export interface ISelectionProperties {
  [key: string]: object;
}

export interface IBuildSelectionBaseOptions<T, P>
  extends IBuildUseListOptions<T, ISelectionParams, P>,
    IBuildPropertyWatchOptions {}

export function buildSelectionBase<
  T extends ISelectionItem = ISelectionItem,
  P = {}
>(name: string, options: IBuildSelectionBaseOptions<T, P>) {
  const useList = buildUseList<T, ISelectionParams, P>(options);

  const selectionMixin = buildSelectionMixin({
    value: {
      type: Array,
      default: [],
    },
  });

  const watchMixin = buildPropertyWatchMixin({
    ...options,
    watchActionName: 'onRefresh',
  });

  return {
    name,
    mixins: [watchMixin, selectionMixin, View],
    setup(props) {
      return useList(props, {
        keyword: '',
        pageNum: 1,
        pageCount: 20,
      });
    },
  };
}
