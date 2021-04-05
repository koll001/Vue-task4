import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
    password: '',
  },
  mutations: {
    updateUserName(state, val) {
      state.userName = val;
    },
    updateEmail(state, val) {
      state.email = val;
    },
    updatePassword(state, val) {
      state.password = val;
    },
    signUpUser(state) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          let user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(`${errorCode}:${errorMessage}`);
        });
    },
    registUserData(state) {
      firebase
        .database()
        .ref('users' + state.userName)
        .set({
          userName: state.userName,
          email: state.email,
          password: state.password,
        });
    },
  },
  actions: {
    updateUserName({ commit }, val) {
      commit('updateUserName', val);
    },
    updateEmail({ commit }, val) {
      commit('updateEmail', val);
    },
    updatePassword({ commit }, val) {
      commit('updatePassword', val);
    },
    signUpUser({ commit }) {
      commit('signUpUser');
    },
    registUserData({ commit }) {
      commit('registUserData');
    },
  },
  modules: {},
});
