import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBBvuu-gHgYNtoUkdK54QVKkL1LpQtMnp8',
  authDomain: 'menta-vue-task4.firebaseapp.com',
  projectId: 'menta-vue-task4',
  storageBucket: 'menta-vue-task4.appspot.com',
  messagingSenderId: '600167914835',
  appId: '1:600167914835:web:4c793cd284f203a01215a6',
};

export default {
  init() {
    firebase.initializeApp(firebaseConfig);
  },
};
