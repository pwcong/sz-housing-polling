import { createApp } from 'vue';

import store from './store';
import router from './router';
import lib from './lib';

import App from './app.vue';

function init() {
  createApp(App).use(store).use(router).use(lib).mount('#app');
}

init();
