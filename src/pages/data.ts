import { EUserType } from '@/store/modules/user';

export enum EACTON {
  'SET' = 'SET',
  'DEL' = 'DEL',
  'LIST' = 'LIST',
  'UPDATE' = 'UPDATE',
}

export const ACTIONS_TEXT = {
  [EACTON.SET]: '设置',
  [EACTON.DEL]: '删除',
  [EACTON.LIST]: '日志',
  [EACTON.UPDATE]: '更新',
};

export const ACTIONS = [
  {
    name: ACTIONS_TEXT[EACTON.UPDATE],
    key: EACTON.UPDATE,
  },
  {
    name: ACTIONS_TEXT[EACTON.LIST],
    key: EACTON.LIST,
  },
  {
    name: ACTIONS_TEXT[EACTON.SET],
    key: EACTON.SET,
  },
  {
    name: ACTIONS_TEXT[EACTON.DEL],
    key: EACTON.DEL,
  },
];

export const TYPES_TEXT = {
  [EUserType.ANJUFANG]: '安居型商品房',
  [EUserType.GONGZUFANG]: '公共租赁住房',
};

export const TYPES = [
  {
    text: TYPES_TEXT[EUserType.ANJUFANG],
    value: EUserType.ANJUFANG,
  },
  {
    text: TYPES_TEXT[EUserType.GONGZUFANG],
    value: EUserType.GONGZUFANG,
  },
];
