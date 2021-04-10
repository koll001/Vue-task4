import Vue from 'vue';
import Vuex from 'vuex';
import { firebase } from '../firebase';
import 'firebase/auth';
import 'firebase/database';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userBalance: null,
  },
  getterts: {
    getUserName(state) {
      return state.user.displayName;
    },
    getUserBalance(state) {
      return state.userBalance;
    },
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
      console.log(val);
    },
    setUserBalance(state, val) {
      state.userBalance = val;
      console.log(val);
    },
  },
  actions: {
    signUpUser({ commit }, { email, password, userName }) {
      const auth = firebase.auth();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateProfile({
            displayName: userName,
          });
          commit('setUser', user);
          return user;
        })
        .then((user) => {
          const data = firebase.database();
          data
            .ref('users')
            .child(user.uid)
            .set({
              userName: user.displayName,
              email: user.email,
              balance: 1000,
            });
          commit('setUserBalance', 1000);
          router.push('/');
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`${errorCode}:${errorMessage}`);
        });
    },
    loginUser({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          commit('setUser', user);
          router.push('/');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(`${errorCode}:${errorMessage}`);
        });
    },
  },
  modules: {},
});
