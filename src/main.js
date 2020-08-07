/*
 =========================================================
 * Vue Black Dashboard - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
import store from './store'
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";
import '@/plugins/VueMaterial'
import '@/plugins/VuePicker'
import '@/plugins/Vuelidate'
import '@/plugins/DataTables'

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import './registerServiceWorker'
Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record=>record.meta.requiresAuth)){
    if(store.getters['oauth/isLoggedIn']){
      next()
      return 
    }
    next('/auth')
  }else{
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
