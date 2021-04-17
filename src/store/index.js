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
    usersData: null,
  },
  getters: {
    getUserName(state) {
      return state.user.displayName;
    },
    getUserBalance(state) {
      return state.userBalance;
    },
    getUsersData(state) {
      console.log(state.usersData);
      return state.usersData;
    },
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setUserBalance(state, val) {
      state.userBalance = val;
    },
    setUsersData(state, val) {
      state.usersData = val;
    },
  },
  actions: {
    async signUpUser({ dispatch, commit }, { email, password, userName }) {
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
        dispatch('fetchUsersData', user.uid);
        router.push('/home');
      } catch (error) {
        console.log(error);
      }
    },
    async loginUser({ dispatch, commit }, { email, password }) {
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
        dispatch('fetchUsersData', user.uid);
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

    async fetchUsersData({ commit }, userId) {
      const database = firebase.database();
      const usersData = [];
      try {
        database
          .ref('users/')
          .orderByChild('userName')
          .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const id = childSnapshot.key;
              if (userId !== id) {
                const childData = childSnapshot.val();
                const data = { id, ...childData };
                usersData.push(data);
              }
            });
            commit('setUsersData', usersData);
          });
      } catch (error) {
        console.log(error);
      }
    },

    async updateUserBalance(
      { getters },
      { receiveUserId, sendNum, receiveUserBalance }
    ) {
      const auth = firebase.auth();
      const myUserId = auth.currentUser.uid;
      const myBalance = getters.getUserBalance;
      const updateMyBalance = myBalance - sendNum;
      const updateReceiveUserBalance = receiveUserBalance + sendNum;
      const updates = {};
      updates['users/' + myUserId + '/' + 'balance'] = updateMyBalance;
      updates[
        'users/' + receiveUserId + '/' + 'balance'
      ] = updateReceiveUserBalance;
      const database = firebase.database();
      return database.ref().update(updates);
    },
  },
});
