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
  getters: {
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
    },
    setUserBalance(state, val) {
      state.userBalance = val;
    },
  },
  actions: {
    async signUpUser({ commit }, { email, password, userName }) {
      const auth = firebase.auth();
      try {
        const result = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        const user = result.user;
        await user.updateProfile({
          displayName: userName,
        });
        commit('setUser', user);
        const database = firebase.database();
        await database
          .ref('users')
          .child(user.uid)
          .set({
            userName: user.displayName,
            email: user.email,
            balance: 1000,
          });
        commit('setUserBalance', 1000);
        router.push('/home');
      } catch (error) {
        console.log(error);
      }
    },
    async loginUser({ commit }, { email, password }) {
      const auth = firebase.auth();
      try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        const user = result.user;
        commit('setUser', user);
        const database = firebase.database();
        database
          .ref('users')
          .child(user.uid)
          .on('value', (snapshot) => {
            const data = snapshot.val();
            const userBalance = data.balance;
            commit('setUserBalance', userBalance);
          });
        router.push('/home');
      } catch (error) {
        console.log(error);
      }
    },

    async signOutUser() {
      const auth = firebase.auth();
      try {
        await auth.signOut();
        router.push('/signin').catch((error) => {
          if (
            error.name !== 'NavigationDuplicated' &&
            !error.message.includes(
              'Avoided redundant navigation to current location'
            )
          ) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
