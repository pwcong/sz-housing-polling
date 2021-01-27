<template>
  <van-popup
    :show="visible"
    position="right"
    :teleport="selectionContainer"
    :style="{ width: '100%', height: '100%' }"
  >
    <list-layout :style="{ width: '100%', height: '100%' }">
      <template v-slot:header="{ className }">
        <van-nav-bar
          :class="className"
          title="用户设置"
          left-text="取消"
          left-arrow
          right-text="保存"
          @click-left="onCancel"
          @click-right="handleSubmit"
        >
        </van-nav-bar>
      </template>

      <template v-slot:main="{ className }">
        <div :class="className" style="top: 46px; height: calc(100% - 46px)">
          <van-form ref="form" @submit="onFormSubmit">
            <div class="form-layout-main">
              <item-box>
                <van-field
                  required
                  clickable
                  is-link
                  :modelValue="formatType(tempValue.type)"
                  name="tempValue.type"
                  label="轮候册类别"
                  placeholder="请选择"
                  :rules="[{ required: true, message: '请选择轮候册类别' }]"
                  @click="typeVisible = true"
                />
                <van-field
                  required
                  v-model="tempValue.beian"
                  name="tempValue.beian"
                  label="备案回执号"
                  placeholder="请输入"
                  :rules="[{ required: true, message: '请输入备案回执号' }]"
                />
                <van-field
                  required
                  v-model="tempValue.name"
                  name="tempValue.name"
                  label="申请人(共同申请人)姓名"
                  placeholder="请输入"
                  :rules="[
                    { required: true, message: '请输入申请人(共同申请人)姓名' },
                  ]"
                />
                <van-field
                  required
                  v-model="tempValue.id"
                  name="tempValue.id"
                  label="申请人(共同申请人)身份证号"
                  placeholder="请输入"
                  :rules="[
                    {
                      required: true,
                      message: '请输入申请人(共同申请人)身份证号',
                    },
                  ]"
                />
              </item-box>
            </div>
          </van-form>
        </div>
      </template>
    </list-layout>

    <selection-type
      v-model:visible="typeVisible"
      @update:modelValue="tempValue.type = ($event[0] || {}).value"
    />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { buildSelectionMixin } from '@/mixins';
import { buildSelectionBase } from '@/components';

import indexMixin from './mixin';
import { TYPES } from './data';

const selectionMixin = buildSelectionMixin({
  value: {
    type: Object,
    default: {},
  },
});
const SelectionType = buildSelectionBase('selection-tyoe', {
  getData: () =>
    Promise.resolve({
      data: TYPES,
      totalCount: 0,
    }),
});

export default defineComponent({
  name: 'setting-user',
  mixins: [selectionMixin, indexMixin],
  components: {
    SelectionType,
  },
  data() {
    return {
      typeVisible: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.submit();
    },
    onFormSubmit() {
      this.onOk();
    },
  },
});
</script>
<style lang="scss" scoped></style>
