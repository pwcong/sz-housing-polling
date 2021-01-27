import { ref, computed, watch, reactive } from 'vue';
import _ from 'lodash';
import omit from 'omit.js';

import { IBaseListData } from '@/api';

export type IUseListParams<P> = P & {
  pageNum: number;
  pageCount: number;
};

export type IUseListData<T> = IBaseListData<T>;

export interface IBuildUseListOptions<T, P, PP> {
  getData: (props: PP, params: object) => Promise<IUseListData<T>>;
  getParams?: (props: PP, params: IUseListParams<P>) => object;
}

export function buildUseList<T, P = {}, PP = {}>(
  options: IBuildUseListOptions<T, P, PP>
) {
  const { getParams = (_, params) => params, getData } = options;

  return function useList(props: PP, defaultParams: IUseListParams<P>) {
    const loading = ref<boolean>(false);
    const loadingMore = ref<boolean>(false);
    const list = ref([]);
    const pageNum = ref<number>(defaultParams.pageNum);
    const pageCount = ref<number>(defaultParams.pageCount);
    const totalCount = ref<number>(0);
    const params = reactive<object>(
      omit(defaultParams, ['pageNum', 'pageCount'])
    );

    const hasMore = computed(
      () =>
        pageCount.value * pageNum.value < totalCount.value &&
        list.value.length < totalCount.value
    );

    const onLoad = _.debounce(function (_params) {
      loading.value = true;
      setTimeout(async () => {
        try {
          _params = getParams(
            props,
            Object.assign(
              {
                pageNum: pageNum.value,
                pageCount: pageCount.value,
              },
              _params
            )
          );

          const targetParams = Object.keys(_params).reduce((p, c) => {
            const v = _params[c];
            if (v !== '' && v !== undefined && v !== null) {
              p[c] = v;
            }
            return p;
          }, {});

          const { totalCount: _totalCount, data } = await getData(
            props,
            targetParams
          );

          totalCount.value = _totalCount;

          if (loadingMore.value) {
            list.value = list.value.concat(data);
          } else {
            list.value = data;
          }
        } finally {
          loading.value = false;
          loadingMore.value = false;
        }
      }, 0);
    }, 200);

    const onRefresh = _.debounce(function () {
      if (loading.value) {
        return;
      }
      pageNum.value = 1;
      onLoad(params);
    }, 200);

    const onLoadMore = _.debounce(function () {
      if (loading.value) {
        return;
      }
      loadingMore.value = true;
      pageNum.value++;
      onLoad(params);
    }, 200);

    watch(pageNum, () => {
      onLoad(params);
    });

    watch(pageCount, () => {
      pageNum.value = 1;
      onLoad(params);
    });

    watch(
      params,
      (v) => {
        pageNum.value = 1;
        onLoad(v);
      },
      { immediate: true }
    );

    return {
      loading,
      loadingMore,
      hasMore,
      list,
      totalCount,
      params,
      onLoad,
      onRefresh,
      onLoadMore,
    };
  };
}
