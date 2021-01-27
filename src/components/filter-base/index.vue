<template>
  <van-popup
    class="filter-base"
    :show="visible"
    position="right"
    @click-overlay="onCancel"
    :style="{ width: '80vw', height: '100vh' }"
    :teleport="selectionContainer"
  >
    <div class="filter-base-wrapper">
      <div class="filter-header">
        <div class="filter-title">{{ title }}</div>
        <div class="filter-close" @click="onCancel">
          <van-icon name="cross" />
        </div>
      </div>
      <div class="filter-list" v-if="list.length > 0">
        <div class="filter-item" v-for="(item, index) in list" :key="index">
          <template v-if="item.type === 'input'">
            <van-field
              placeholder="请输入"
              :label="item.label"
              v-model="tempValue[item.key]"
            />
          </template>
          <template v-else-if="item.type === 'number'">
            <van-field
              :label="item.label"
              type="number"
              v-model="tempValue[item.key]"
              placeholder="请输入"
            />
          </template>
          <template v-else-if="item.type === 'switch'">
            <van-field readonly :label="item.label">
              <template #input>
                <van-switch size="18px" v-model="tempValue[item.key]" />
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'radio'">
            <van-field readonly :label="item.label">
              <template #input>
                <div class="filter-item__radio">
                  <van-radio-group
                    direction="horizontal"
                    v-model="tempValue[item.key]"
                  >
                    <van-radio
                      v-for="(o, i) in getProps(item).options || []"
                      :key="i"
                      :name="o.value"
                    >
                      {{ o.text }}
                    </van-radio>
                  </van-radio-group>
                </div>
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'checkbox'">
            <van-field readonly :label="item.label">
              <template #input>
                <div class="filter-item__checkbox">
                  <van-checkbox-group
                    v-model="tempValue[item.key]"
                    direction="horizontal"
                  >
                    <van-checkbox
                      v-for="(o, i) in getProps(item).options || []"
                      :key="i"
                      :name="o.value"
                      >{{ o.text }}</van-checkbox
                    >
                  </van-checkbox-group>
                </div>
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'stepper'">
            <van-field readonly :label="item.label">
              <template #input>
                <van-stepper
                  v-model="tempValue[item.key]"
                  :min="getProps(item).min"
                  :max="getProps(item).max"
                />
              </template>
            </van-field>
          </template>
          <template v-else-if="item.type === 'calendar'">
            <van-field
              readonly
              clickable
              is-link
              placeholder="请选择"
              :name="item.key"
              :modelValue="item.getText(tempValue[item.key])"
              :label="item.label"
              @click="visibles[item.key] = true"
            />
            <van-calendar
              :default-date="tempValue[item.key]"
              :teleport="selectionContainer"
              :title="`选择${item.label}`"
              :type="getProps(item).type"
              :min-date="getProps(item).minDate"
              :max-date="getProps(item).maxDate"
              v-model:show="visibles[item.key]"
              @confirm="
                (tempValue[item.key] = $event) && (visibles[item.key] = false)
              "
            />
          </template>
          <template v-else-if="item.type === 'picker'">
            <van-field
              readonly
              clickable
              is-link
              placeholder="请选择"
              :name="item.key"
              :modelValue="item.getText(tempValue[item.key])"
              :label="item.label"
              @click="visibles[item.key] = true"
            />
            <van-popup
              :teleport="selectionContainer"
              v-model:show="visibles[item.key]"
              position="bottom"
            >
              <component
                v-bind="getProps(item)"
                :is="item.component || 'van-picker'"
                show-toolbar
                :title="`选择${item.label}`"
                @cancel="visibles[item.key] = false"
                @confirm="
                  (tempValue[item.key] = $event) && (visibles[item.key] = false)
                "
              />
            </van-popup>
          </template>
          <template v-else-if="item.type === 'selection'">
            <van-field
              readonly
              clickable
              is-link
              placeholder="请选择"
              :name="item.key"
              :modelValue="item.getText(tempValue[item.key])"
              :label="item.label"
              @click="visibles[item.key] = true"
            />

            <component
              v-bind="getProps(item)"
              :is="item.component || 'selection-base'"
              :title="`选择${item.label}`"
              v-model="tempValue[item.key]"
              v-model:visible="visibles[item.key]"
            />
          </template>
          <template v-else>
            <div class="filter-tips">
              {{ `暂不支持该类型筛选器(${item.type})` }}
            </div>
          </template>
        </div>
      </div>
      <div v-else class="filter-empty">
        <van-empty image-size="120px" description="暂无筛选项" />
      </div>
      <div class="filter-action" v-if="list.length > 0">
        <div class="filter-btn" @click="onReset">重置</div>
        <div class="filter-btn filter-btn-ok" @click="onOk">确定</div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
export default {
  name: 'filter-base',
  props: {
    title: {
      type: String,
      default: '筛选',
    },
  },
  data() {
    return {
      visibles: {},
    };
  },
  computed: {},
  methods: {
    onReset() {
      this.tempValue = this.list.reduce((p, c) => {
        // 重置日期值
        if (c.type === 'calendar') {
          p[c.key] = [];
        }
        // 重置选择器值
        if (c.type === 'selection') {
          p[c.key] = [];
        }
        return p;
      }, {});
    },
    getProps(item) {
      const { props } = item;

      if (typeof props === 'function') {
        return props(this) || {};
      } else {
        return props || {};
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';

.filter-base {
  &,
  &-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .filter-header {
    position: absolute;
    left: 0;
    font-size: 16px;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.12);
    z-index: 1;
  }

  .filter-close {
    position: absolute;
    width: 50px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 0;
    font-size: 18px;
    color: #666666;
    transition: all 0.2s;

    &:active {
      background-color: #f5f5f5;
    }
  }

  .filter-action {
    display: flex;
    position: absolute;
    bottom: 0;
    box-shadow: 0 -2px 12px rgba(100, 101, 102, 0.12);
    width: 100%;
    background-color: white;
  }

  .filter-btn {
    flex: 2;
    text-align: center;
    height: 50px;
    line-height: 50px;
    position: relative;
    transition: all 0.2s;
    color: #666666;

    &-ok {
      color: $theme-color;
      flex: 3;
    }

    &:active {
      background-color: #f5f5f5;
    }

    &:not(:last-child)::after {
      content: '';
      height: 20px;
      width: 1px;
      position: absolute;
      right: 0;
      top: 50%;
      background-color: rgba(100, 101, 102, 0.12);
      transform: translateY(-50%);
    }
  }

  .filter-tips {
    padding: 14px 0;
    font-size: 12px;
    color: #999999;
  }

  .filter-list {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 50px 12px;
  }

  .filter-item {
    &:not(:last-child) {
      border-bottom: 1px solid #eeeeee;
    }

    .van-cell {
      padding-left: 0;
      padding-right: 0;
    }

    &__radio {
      .van-radio {
        margin-bottom: 6px;
      }
    }
    &__checkbox {
      .van-checkbox {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
