import { createApp } from 'vue';
import { install } from 'vue-demi';

import './styles/main.scss';
import App from './App.vue';

install();

createApp(App).mount('#app');
