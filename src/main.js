import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import vue_axios from 'vue-axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';


const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false,
  useConstraintAttrs: true
};

export const Bus=new Vue();

require('../src/store/modules/subscriber');

Vue.filter('snippet',function(value){
return value.slice(0,10)+'...';
})

import Echo from 'laravel-echo';
window.Pusher=require('pusher-js');
window.Echo =new Echo({
  broadcaster:'pusher',
  key:process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost:process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort:6001,
  forceTLS:false,
  disableStats:true,
  cluster:'mt1',
})


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

Vue.use(axios,vue_axios,config);

Vue.config.productionTip = false;

if(localStorage.getItem('role')=== "admin"){
  store.dispatch('admin_data',localStorage.getItem('token')).then(()=>{
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  })
}else if(localStorage.getItem('role')=== "candidate"){
  store.dispatch('candidate_data',localStorage.getItem('token')).then(()=>{
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  })
}else if(localStorage.getItem('role')=== "voter"){
  store.dispatch('voter_data',localStorage.getItem('token')).then(()=>{
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  })
}
else{
  store.dispatch('attempt',null).then(()=>{
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app');
  })
}


// store.dispatch('admin_data',localStorage.getItem('token')).then(()=>{
//   new Vue({
//     router,
//     store,
//     vuetify,
//     render: h => h(App)
//   }).$mount('#app');
// })
