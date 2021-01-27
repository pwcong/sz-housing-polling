import { createRouter, createWebHashHistory } from 'vue-router';

import { routes } from './config';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  next();
});

router.afterEach(function (to) {
  window.scrollTo(0, 0);
});

export { routes };

export default router;
