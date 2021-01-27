<template>
  <list-layout class="page-index">
    <template v-slot:main="{ className }">
      <div :class="className" style="top: 0; height: 100%">
        <div class="tips" v-if="users.length <= 0">
          <van-empty description="暂无用户" />
          <van-button block size="small" type="danger" @click="handleAddUser">
            + 添加用户
          </van-button>
        </div>

        <template v-else>
          <card-list :data="users">
            <template v-slot="{ item, index }">
              <div class="user">
                <div class="row">
                  <div class="col">
                    <div class="label">姓名</div>
                    <div class="value">{{ item.name }}</div>
                  </div>
                  <div class="col">
                    <div class="label">轮候册类型</div>
                    <div class="value">{{ formatType(item.type) }}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="label">轮候排序号</div>
                    <div
                      class="value"
                      v-html="formatRankNumber(item, 'city')"
                    ></div>
                  </div>
                  <div class="col">
                    <div class="label">户籍区排序号</div>
                    <div
                      class="value"
                      v-html="formatRankNumber(item, 'area')"
                    ></div>
                  </div>
                </div>

                <div class="actions">
                  <div
                    class="action"
                    v-for="(action, _index) in actions"
                    :key="_index"
                    @click="handleAction(action, item, index)"
                  >
                    {{ action.name }}
                  </div>
                </div>
              </div>
            </template>
          </card-list>
          <div class="btn" @click="handleAddUser">+ 添加用户</div>
        </template>
      </div>
    </template>

    <setting-user
      v-model="userItem"
      v-model:visible="userVisible"
      @update:modelValue="handleSaveUser"
    />
  </list-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { pageMixin, userMixin, rankMixin } from '@/mixins';
import SettingUser from './setting-user.vue';

import indexMixin from './mixin';
import { ACTIONS, EACTON } from './data';

export default defineComponent({
  name: 'page-index',
  mixins: [pageMixin, userMixin, rankMixin, indexMixin],
  components: {
    SettingUser,
  },
  data() {
    return {
      userVisible: false,
      userIndex: -1,
      userItem: {},
      actionVisible: false,
      actions: ACTIONS,
    };
  },
  methods: {
    handleAddUser() {
      this.userIndex = -1;
      this.userItem = {};
      this.userVisible = true;
    },
    handleSaveUser(value) {
      const newUsers = [...this.users];
      if (this.userIndex > -1) {
        newUsers[this.userIndex] = value;
      } else {
        newUsers.push(value);
      }
      this.fetchUsers(newUsers);
    },
    handleAction(action, item, index) {
      this.userItem = item;
      this.userIndex = index;

      switch (action.key) {
        case EACTON.SET:
          this.userVisible = true;
          break;
        case EACTON.DEL:
          this.$dialog
            .confirm({
              title: '是否确认删除该用户?',
            })
            .then(() => {
              const newUsers = [...this.users];
              newUsers.splice(this.userIndex, 1);
              this.fetchUsers(newUsers);
            })
            .catch(() => {
              // DO NOTHING
            });
          break;
        case EACTON.LIST:
          this.$router.push({
            path: '/list',
            query: item,
          });
          break;
        case EACTON.UPDATE:
          this.fetchList([item]);
          break;
        default:
          break;
      }
    },
    getUserRank(user) {
      const ranks = this.list.filter((d) => d.beian === user.beian);

      const newRank = ranks[ranks.length - 1];
      const oldRank = ranks[ranks.length - 2];

      return {
        newRank,
        oldRank,
      };
    },
    formatRankNumber(user, key) {
      const { newRank, oldRank } = this.getUserRank(user);

      let result = (newRank || {})[key] || '--';

      if (!!oldRank) {
        const t = (newRank[key] || 0) - (oldRank[key] || 0);
        if (t > 0) {
          result += `<span class="tag" style="color: red">↓${Math.abs(
            t
          )}</span>`;
        } else if (t < 0) {
          result += `<span class="tag" style="color: green">↑${Math.abs(
            t
          )}</span>`;
        }
      }

      return result;
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';

.page-index {
  .tips {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
  }

  .user {
    box-shadow: 0 0 12px rgba(100, 101, 102, 0.2);
    user-select: none;
    background-color: white;
    border-radius: 4px;
    overflow: hidden;
    padding: 8px 4px;
    position: relative;
    .actions {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(#000000, 0.75);
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0;
      transition: all 0.2s;

      .action {
        margin: 0 12px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          color: #dddddd;
        }
      }
    }

    &:hover .actions {
      opacity: 1;
    }

    &:hover {
      background-color: #f8f8f8;
    }

    .row {
      display: flex;
    }

    .col {
      flex: 1;
      text-align: center;
      color: #666666;
      font-size: 14px;
      padding: 4px 0;
    }
    .label {
      font-size: 12px;
      margin-bottom: 4px;
    }
    .value {
      display: inline-block;
      color: $theme-color;
      position: relative;
    }
  }
  .btn {
    text-align: center;
    user-select: none;
    margin-top: 8px;
    padding: 4px 0;
    font-size: 12px;
    color: #999999;
    cursor: pointer;
    &:hover {
      color: $theme-color;
    }
  }
}
</style>

<style lang="scss">
.page-index {
  .tag {
    font-size: 10px;
    position: absolute;
    right: -2px;
    top: 0;
    transform: translateX(100%);
  }
}
</style>
