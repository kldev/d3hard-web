import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueI18n from 'vue-i18n';

import 'material-design-icons/iconfont/material-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

import './style/theme.scss';
import './style/app.scss';

import { translation as messages  } from '@/i18n/translation.ts';


Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

new Vue({
  store,
  render: (h) => h(App),
  i18n,
}).$mount('#app');
