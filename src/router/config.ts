export const routes = [
  {
    path: '/',
    name: 'page-index',
    component: () => import('@/pages/index.vue'),
    meta: {
      cache: true,
    },
  },
  {
    path: '/list',
    name: 'page-list',
    component: () => import('@/pages/list.vue'),
  },
];
