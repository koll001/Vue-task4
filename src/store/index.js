import Vue from 'vue';
import Vuex from 'vuex';
import { firebase } from '../firebase';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    userName: null,
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    serUserName(state, val) {
      state.userName = val;
    },
  },
  actions: {
    signUpUser({ commit }, { email, password, userName }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.updateProfile({
            displayName: userName,
          });
          commit('setUser', user);
          commit('serUserName', userName);
          console.log(user);
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
          console.log(user);
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
