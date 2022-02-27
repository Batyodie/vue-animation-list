import Vue from 'vue';
import App from './vue-animation-list.vue';
import { install } from 'vue-demi';

install();

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
