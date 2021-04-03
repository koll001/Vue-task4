import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyBBvuu-gHgYNtoUkdK54QVKkL1LpQtMnp8',
  authDomain: 'menta-vue-task4.firebaseapp.com',
  projectId: 'menta-vue-task4',
  storageBucket: 'menta-vue-task4.appspot.com',
  messagingSenderId: '600167914835',
  appId: '1:600167914835:web:4c793cd284f203a01215a6',
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
